import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { Children, useCallback, useRef, useState } from 'react';

import { setPageTitle } from '../../utils/PageUtils';
import { AnimationDirection, animationDirections, pageTimelineId } from '../../utils/ParallaxUtils';
import ScrollPromptContext from '../ScrollPrompt/ScrollPromptContext';
import ScrollPrompt from '../ScrollPrompt';
import PageContext from './PageContext';

import styled from 'styled-components';
import { animationDurations } from '../../utils/ParallaxUtils';
import { flattenLabels, getSortedLabels } from '../../utils/AnimationUtils';

const ParallaxPageWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const Page = ({ titleSuffix, shouldHaveScrollPrompt, children }: {
  titleSuffix: string,
  shouldHaveScrollPrompt: boolean,
  children: React.ReactNode
}) => {
  const pageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [sceneRefs, setSceneRefs] = useState<React.MutableRefObject<HTMLDivElement>[]>([]);
  const [sceneTimelines, setSceneTimelines] = useState<gsap.core.Timeline[]>([]);
  const [isScrollPromptEnabled, setIsScrollPromptEnabled] = useState<boolean>(true);

  gsap.registerPlugin(Observer);

  useGSAP((): void => {
    const sceneCount: number = Children.count(children);

    // Skip processing if the scene refs/timelines have not been registered
    if (sceneRefs.length === 0 || sceneRefs.length !== sceneCount || sceneTimelines.length !== sceneCount) {
      return;
    }

    const totalDuration = sceneTimelines.reduce((prev: number, sceneTimeline: gsap.core.Timeline) => {
      return prev + sceneTimeline.totalDuration();
    }, 0);

    // Skip processing if the timeline children have not been registered
    if (totalDuration === 0) {
      return;
    }

    // Create master timeline
    const timeline = gsap.timeline({
      id: pageTimelineId,
      paused: true,
      data: {
        isAnimationPlaying: false,
        sortedLabels: [],
        currentLabelIndex: 0,
      }
    });

    // Stitch the timelines
    for (let i = 0; i < sceneTimelines.length; i++) {
      const nextSceneRef: React.MutableRefObject<HTMLDivElement> = sceneRefs[i + 1];
      const sceneTimeline: gsap.core.Timeline = sceneTimelines[i];

      timeline.add(sceneTimeline);

      // Add transition animations between scenes
      // Note: skip the last scene as it does not require parallax effects
      if (i + 1 < sceneTimelines.length) {
        // We can ignore the linting issue as data is typed as any
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (sceneTimelines[i + 1].data?.isCustomTransition) {
          timeline.set(nextSceneRef.current, {
            data: { name: `scene-${i}-transition-custom` },
            transform: 'translate3d(0, -100vh, 0)',
          });
        }
        else {
          timeline.add(gsap.to(nextSceneRef.current, {
            data: { name: `scene-${i}-transition` }, 
            transform: 'translate3d(0, -100vh, 0)',
            duration: animationDurations.XSLOW,
          }));
        }
        timeline.addLabel(`scene-${i + 1}-transition`);
      }
    }

    // Process labels
    flattenLabels(timeline);
    // We can ignore the linting error as we set this member
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    timeline.data.sortedLabels = getSortedLabels(timeline);

    const playAnimation = (direction: AnimationDirection): void => {
      // We can ignore the linting error as we set these members
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { isAnimationPlaying, sortedLabels, currentLabelIndex } = timeline.data as {
        isAnimationPlaying: boolean;
        sortedLabels: string[];
        currentLabelIndex: number;
      };
      
      if (isAnimationPlaying) {
        return;
      }
  
      if (direction === animationDirections.FORWARD && currentLabelIndex === sortedLabels.length - 1) {
        return;
      }
      else if (direction === animationDirections.REVERSE && currentLabelIndex === 0) {
        return;
      }

      // We can ignore the linting error as we set this member
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      timeline.data.isAnimationPlaying = true;

      let targetLabel = '';
      
      if (direction === animationDirections.FORWARD) {
        targetLabel = sortedLabels[currentLabelIndex + 1];
        
        // Check if we should progress a label further
        if (targetLabel.endsWith('transition')) {
          const furtherLabel: string = sortedLabels[currentLabelIndex + 2];

          if (furtherLabel.endsWith('intro')) {
            targetLabel = furtherLabel;
          }
        }
      }
      else {
        targetLabel = sortedLabels[currentLabelIndex - 1];

        // Check if we should progress a label further
        if (targetLabel.endsWith('transition')) {
          const furtherLabel: string = sortedLabels[currentLabelIndex - 2];

          if (!furtherLabel.endsWith('transition')) {
            targetLabel = furtherLabel;
          }
        }
      }
      
      timeline.tweenTo(timeline.labels[targetLabel], {
        onComplete: (): void => {
          timeline.pause();
  
          // We can ignore the linting error as we set these members
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          timeline.data.isAnimationPlaying = false;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          timeline.data.currentLabelIndex = sortedLabels.indexOf(targetLabel);
        }
      });
    }

    // Create scroll observer
    Observer.create({
      id: 'page-observer',
      wheelSpeed: -1,
      onDown: (): void => {
        playAnimation(animationDirections.REVERSE);
      },
      onUp: (): void => {
        playAnimation(animationDirections.FORWARD);
      },
      tolerance: 10,
      preventDefault: true
    });
  }, [children, sceneRefs, sceneTimelines]);
 
  const registerScene = useCallback((index: number, ref: React.MutableRefObject<HTMLDivElement>,
    timeline: gsap.core.Timeline): void => {
    setSceneRefs((prevSceneRefs: React.MutableRefObject<HTMLDivElement>[]) => {
      const newSceneRefs: React.MutableRefObject<HTMLDivElement>[] = prevSceneRefs.slice();
      newSceneRefs[index] = ref;
      return newSceneRefs;
    });

    setSceneTimelines((prevSceneTimelines: gsap.core.Timeline[]) => {
      const newSceneTimelines: gsap.core.Timeline[] = prevSceneTimelines.slice();
      newSceneTimelines[index] = timeline;
      return newSceneTimelines;
    });
  }, []);

  setPageTitle(titleSuffix);

  return (
    <PageContext.Provider value={{ titleSuffix, registerScene }}>
      <ScrollPromptContext.Provider value={{
          isEnabled: isScrollPromptEnabled,
          setIsEnabled: setIsScrollPromptEnabled
        }}>
        <ParallaxPageWrapper ref={pageRef}>
          {children}
          {shouldHaveScrollPrompt && <ScrollPrompt pageRef={pageRef} />}
        </ParallaxPageWrapper>
      </ScrollPromptContext.Provider>
    </PageContext.Provider>
  );
};

export default Page;
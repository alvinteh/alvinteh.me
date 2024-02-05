import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { Children, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import LayoutContext from '../../components/Layout/LayoutContext';
import {
  AnimationDirection,
  animationDirections,
  animationDurations,
  pageTimelineId,
} from '../../utils/AnimationUtils';
import { flattenLabels, getSortedLabels } from '../../utils/GSAPUtils';
import { setPageTitle } from '../../utils/PageUtils';
import ScrollPromptContext from '../ScrollPrompt/ScrollPromptContext';
import ScrollPrompt from '../ScrollPrompt';
import { SiteHeader } from '../static';
import PageContext from './PageContext';

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
  const [sceneTitles, setSceneTitles] = useState<string[]>([]);
  const [isScrollPromptEnabled, setIsScrollPromptEnabled] = useState<boolean>(true);
  const [pageObserverName, setPageObserverName] = useState<string>('');
  const { isDialogToggled } = useContext(LayoutContext);

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

      const updatePageTitle = (): void => {
        const currentLabel: string = sortedLabels[currentLabelIndex];
        const currentSceneIndex: number = Number.parseInt(currentLabel.split('-')[1], 10);
        const targetSceneIndex: number = Number.parseInt(targetLabel.split('-')[1], 10);

        if (currentSceneIndex !== targetSceneIndex) {
          const targetSceneTitle = sceneTitles[targetSceneIndex];
          setPageTitle(targetSceneTitle ? `${targetSceneTitle} | ${titleSuffix}` : titleSuffix);
        }
      };
      
      timeline.tweenTo(timeline.labels[targetLabel], {
        onStart: (): void => {
          if (direction === animationDirections.FORWARD) {
            updatePageTitle();
          }
        },
        onComplete: (): void => {
          timeline.pause();
  
          // We can ignore the linting error as we set these members
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          timeline.data.isAnimationPlaying = false;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          timeline.data.currentLabelIndex = sortedLabels.indexOf(targetLabel);

          if (direction === animationDirections.REVERSE) {
            updatePageTitle();
          }

          // We can ignore the linting error as we set these members
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (timeline.data.currentLabelIndex === sortedLabels.length - 1) {
            setIsScrollPromptEnabled(false);
          }
          else {
            setIsScrollPromptEnabled(true);
          }
        }
      });
    }

    // Kill previous observers if any
    Observer.getAll().forEach((o: Observer): void => { o.kill() });

    // Create scroll observer
    const pageObserverName: string = uuid();
    Observer.create({
      id: pageObserverName,
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

    setPageObserverName(pageObserverName);
    setPageTitle(titleSuffix);
  }, [children, sceneRefs, sceneTimelines]);
 
  const registerScene = useCallback((
    index: number,
    ref: React.MutableRefObject<HTMLDivElement>,
    timeline: gsap.core.Timeline,
    title?: string
  ): void => {
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

    setSceneTitles((prevSceneTitles: string[]) => {
      const newSceneTitles: string[] = prevSceneTitles.slice();
      newSceneTitles[index] = title ?? '';
      return newSceneTitles;
    });
  }, []);

  useEffect((): void => {
    // Toggle the page observer depending on whether the dialog is toggled
    if (isDialogToggled && pageObserverName) {
      Observer.getById(pageObserverName)?.disable();
    }
    else if (pageObserverName) {
      Observer.getById(pageObserverName)?.enable();
    }
  }, [isDialogToggled, pageObserverName]);

  return (
    <PageContext.Provider value={{ titleSuffix, pageObserverName, registerScene }}>
      <ScrollPromptContext.Provider value={{
          isEnabled: isScrollPromptEnabled,
          setIsEnabled: setIsScrollPromptEnabled,
          pageObserverName,
        }}>
        <SiteHeader><Link to="/" state={{ isForcedHomeNavigation: true }}>Alvin Teh</Link></SiteHeader>
        <ParallaxPageWrapper ref={pageRef}>
          {children}
          {shouldHaveScrollPrompt && <ScrollPrompt />}
        </ParallaxPageWrapper>
      </ScrollPromptContext.Provider>
    </PageContext.Provider>
  );
};

export default Page;
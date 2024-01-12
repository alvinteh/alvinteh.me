import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Children, useCallback, useEffect, useRef, useState } from 'react';

import { setPageTitle } from '../../utils/PageUtils';
import { parallaxUnit } from '../../utils/ParallaxUtils';
import ScrollPromptContext from '../ScrollPrompt/ScrollPromptContext';
import ScrollPrompt from '../ScrollPrompt';
import PageContext from './PageContext';

import styled from 'styled-components';
import { animationDurations } from '../../utils/ParallaxUtils';

// Note: this is intentionally unstyled as GSAP automatically applies styles
const ParallaxSpacer = styled.div``;

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
  const pinSpacerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const pageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [pageTimeline, setPageTimeline] = useState<gsap.core.Timeline>(gsap.timeline({}));
  const [sceneRefs, setSceneRefs] = useState<React.MutableRefObject<HTMLDivElement>[]>([]);
  const [sceneTimelines, setSceneTimelines] = useState<gsap.core.Timeline[]>([]);
  const [isScrollPromptEnabled, setIsScrollPromptEnabled] = useState<boolean>(true);

  gsap.registerPlugin(ScrollTrigger);

  useEffect((): void => {
    setPageTitle(titleSuffix);
  });

  useGSAP((): void => {
    const sceneCount: number = Children.count(children);

    // Skip processing if the scene refs/timelines have not been registered
    if (sceneRefs.length === 0 || sceneRefs.length !== sceneCount || sceneTimelines.length !== sceneCount) {
      return;
    }

    const { totalDuration, totalChildren } = sceneTimelines.reduce(
      (prev: { totalDuration: number, totalChildren: number }, sceneTimeline: gsap.core.Timeline) => {
      return {
        totalDuration: prev.totalDuration + sceneTimeline.totalDuration(),
        totalChildren: prev.totalChildren + sceneTimeline.getChildren().length,
      };
    }, { totalDuration: 0, totalChildren: 0 });

    // Skip processing if the timeline children have not been registered
    if (totalChildren === 0) {
      return;
    }

    // Create master timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: pageRef.current,
        pin: true,
        pinSpacer: pinSpacerRef.current,
        scrub: true,
        start: 'top top',
        end: `+=${(totalDuration + sceneCount - 1) * parallaxUnit}`,
      }
    });

    // Stitch the timelines
    for (let i = 0; i < sceneTimelines.length; i++) {
      const nextSceneRef: React.MutableRefObject<HTMLDivElement> = sceneRefs[i + 1];
      const sceneTimeline: gsap.core.Timeline = sceneTimelines[i];

      timeline.addLabel(`scene-${i}`, '>');
      timeline.add(sceneTimeline);

      // Add transition animations between scenes
      // Note: skip the last scene as it does not require parallax effects
      if (i < sceneTimelines.length - 1) {
        timeline.add(gsap.to(nextSceneRef.current, {
          transform: 'translate3d(0, -100vh, 0)',
          // We can ignore the linting issue as data is typed as any
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          duration: sceneTimeline.data?.isCustomTransition ? animationDurations.XFAST : animationDurations.XSLOW,
        }));
      }
    }

    setPageTimeline(timeline);
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

  // Note that the extra <div> is needed to prevent React errors arising when navigating away from the page
  // see https://gsap.com/community/forums/topic/28327-scrolltrigger-breaks-react-router/
  return (
    <ParallaxSpacer ref={pinSpacerRef}>
      <PageContext.Provider value={{ titleSuffix, pageTimeline, registerScene }}>
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
    </ParallaxSpacer>
  );
};

export default Page;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Children, useCallback, useEffect, useRef, useState } from 'react';

import { cubicBezier, fadeInAnimation, pageTransitionDuration } from '../../components/static';
import PageContext from '../../utils/PageContext';
import { setPageTitle } from '../../utils/PageUtils';
import { parallaxUnit } from '../../utils/ParallaxUtils';
import ScrollPrompt from '../ScrollPrompt';

import styled from 'styled-components';
import { animationDurations } from '../../utils/ParallaxUtils';

const ParallaxPageWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  animation: ${fadeInAnimation} 1ms ${cubicBezier} ${pageTransitionDuration}ms 1 backwards;
`;

const PageBase = ({ titleSuffix, shouldHaveScrollPrompt, children }: {
  titleSuffix: string,
  shouldHaveScrollPrompt: boolean,
  children: React.ReactNode
}) => {
  const pageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [sceneRefs, setSceneRefs] = useState<React.MutableRefObject<HTMLDivElement>[]>([]);
  const [sceneTimelines, setSceneTimelines] = useState<gsap.core.Timeline[]>([]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect((): void => {
    setPageTitle(titleSuffix);
  });

  useGSAP((): void => {
    const sceneCount: number = Children.count(children);

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

    if (totalChildren === 0) {
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: pageRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: `+=${(totalDuration + sceneCount - 1) * parallaxUnit}`,
      }
    });

    // Note: skip the last scene as it does not require parallax effects
    for (let i = 0; i < sceneTimelines.length; i++) {
      const nextSceneRef: React.MutableRefObject<HTMLDivElement> = sceneRefs[i + 1];
      const sceneTimeline: gsap.core.Timeline = sceneTimelines[i];

      timeline.add(sceneTimeline);

      if (i < sceneTimelines.length - 1) {
        timeline.add(gsap.to(nextSceneRef.current, {
          transform: 'translate3d(0, -100vh, 0)',
          duration: animationDurations.XSLOW,
        }));
      }
    }
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
    <div>
      <PageContext.Provider value={{ titleSuffix, registerScene }}>
        <ParallaxPageWrapper ref={pageRef}>
          {children}
          {shouldHaveScrollPrompt && <ScrollPrompt pageRef={pageRef} />}
        </ParallaxPageWrapper>
      </PageContext.Provider>
    </div>
  );
};

export default PageBase;
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';

import ScreenBackground from './images/screen-background.jpg';
import Subscreen1Background from './images/subscreen-1.jpg';
import Subscreen2Background from './images/subscreen-2.jpg';
import Subscreen3Background from './images/subscreen-3.jpg';
import Subscreen4Background from './images/subscreen-4.jpg';
import Subscreen5Background from './images/subscreen-5.jpg';
import Subscreen6Background from './images/subscreen-6.jpg';
import Subscreen7Background from './images/subscreen-7.jpg';

interface SubscreenAttrs {
  $backgroundImage: string;
  $backgroundPosition?: string;
}

const Subscreen = styled.div.attrs<SubscreenAttrs>(({ $backgroundImage, $backgroundPosition}) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
    backgroundPosition: $backgroundPosition ?? 'center',
  }
}))`
  position: absolute;
  top: 100vh;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const HeaderBase = styled.h2`
  position: absolute;
  top: 47vh;
  margin: 0;
  height: 3rem;
  color: #ffffff;
  font-family: Inter, sans-serif;
  font-size: 3rem;
  line-height: 3rem;
  text-align: center;
`;

const StartHeader = styled(HeaderBase)`
  top: calc(45vh - 6rem);
  left: calc(50% - 30rem);
  width: 60rem;
  height: 12rem;
  text-align: center;

  & > span {
    display: block;
    position: relative;
    margin-bottom: 1rem;
  }
`;

// Note: we shift left by 2 rem to compensate for shorter words
const Header = styled(HeaderBase)`
  display: flex;  
  position: absolute;
  top: 47vh;
  left: calc(50% - 18rem + 2rem);
  width: 36rem;
`;

const HeaderStart = styled.div`
  width: 19rem;
  height: 3rem;
  text-align: right;
`;

const HeaderAttributes = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 17rem;
  text-align: left;
`;

const HeaderAttribute = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  &::after {
    content: ".";
  }
`;

const EndHeader = styled(HeaderBase)`
  margin-top: -5rem;
  left: calc(50% - 30rem);
  width: 60rem;
`;

const WorldScene = ({ sceneIndex }: { sceneIndex: number }) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const startHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const headerStartRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerAttributeRefs: React.MutableRefObject<HTMLSpanElement[]> = useRef<HTMLSpanElement[]>([]);
  const endHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const subscreenRefs: React.MutableRefObject<HTMLDivElement[]> = useRef<HTMLDivElement[]>([]);

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({});

    // Intro

    // Note we need this meaningless tween as GSAP doesn't respect the from values in the next tween
    timeline.fromTo(startHeaderRef.current, { z: '1px' }, { z: 0 });
    
    for (let i = 0, startHeaderSpanCount = startHeaderRef.current.children.length; i < startHeaderSpanCount; i++) {
      timeline.from(startHeaderRef.current.children[i], {
        filter: 'blur(0.5rem)',
        opacity: 0,
        y: '+=30px',
        ease: 'power1.inOut',
        duration: animationDurations.FAST,
      }, i == 0 ? '>' : undefined);
    }

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    // Subscreens
    for (let i = 0, subscreenCount = subscreenRefs.current.length; i < subscreenCount; i++) {
      const subscreenElement: HTMLDivElement = subscreenRefs.current[i];
      const headerAttributeElement: HTMLSpanElement = headerAttributeRefs.current[i];

      timeline.to(subscreenElement, {
        y: '-=100vh',
        duration: animationDurations.XSLOW,
      });

      if (i === 0) {
        timeline.from([headerStartRef.current, headerAttributeElement], {
          filter: 'blur(0.5rem)',
          opacity: 0,
          duration: animationDurations.MEDIUM,
        }, `<+=${animationDurations.MEDIUM}`);
      }
      else {
        if (i < subscreenCount) {
          timeline.to(headerAttributeRefs.current[i - 1], {
            filter: 'blur(0.5rem)',
            opacity: 0,
            duration: animationDurations.FAST,
          }, '<');
        }

        timeline.from(headerAttributeElement, {
          filter: 'blur(0.5rem)',
          opacity: 0,
          duration: animationDurations.MEDIUM,
        }, `>+=${animationDurations.FAST}`);
      }
      
      if (i < subscreenCount - 1) {
        timeline.addLabel(`scene-${sceneIndex}-subscreen-${i}`);
      }
    }

    // Outro
    timeline.to(headerRef.current, {
      // Do nothing to simulate a pause
      duration: animationDurations.FAST,
    });

    timeline.to(headerRef.current, {
      y: '-=10rem',
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
    });

    timeline.from(endHeaderRef.current, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      y: '+=30px',
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
    });

    timeline.addLabel(`scene-${sceneIndex}-outro`);

    registerScene(sceneIndex, screenRef, timeline, 'Photos from around the World');
  }, []);

  const setSubscreenRef = (element: HTMLDivElement): HTMLDivElement => {
    subscreenRefs.current[subscreenRefs.current.length] = element;
    return element;
  };

  const setHeaderAttributeRef = (element: HTMLDivElement): HTMLDivElement => {
    headerAttributeRefs.current[headerAttributeRefs.current.length] = element;
    return element;
  };

  return (
    <Screen innerRef={screenRef} backgroundImage={ScreenBackground}>
      <StartHeader ref={startHeaderRef}>
        <span>What is this world to you?</span>
        <span>This world we live in.</span>
        <span>Our world.</span>
      </StartHeader>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen1Background} $backgroundPosition="25% center" />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen2Background} $backgroundPosition="20% top" />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen3Background} />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen4Background} $backgroundPosition="70% bottom" />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen5Background} $backgroundPosition="left bottom" />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen6Background} />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen7Background} $backgroundPosition="center bottom" />
      <Header ref={headerRef}>
        <HeaderStart ref={headerStartRef}>Our world is&nbsp;</HeaderStart>
        <HeaderAttributes>
          <HeaderAttribute ref={setHeaderAttributeRef}>majestic</HeaderAttribute>
          <HeaderAttribute ref={setHeaderAttributeRef}>tranquil</HeaderAttribute>
          <HeaderAttribute ref={setHeaderAttributeRef}>diverse</HeaderAttribute>
          <HeaderAttribute ref={setHeaderAttributeRef}>harmonious</HeaderAttribute>
          <HeaderAttribute ref={setHeaderAttributeRef}>personal</HeaderAttribute>
          <HeaderAttribute ref={setHeaderAttributeRef}>collective</HeaderAttribute>
          <HeaderAttribute ref={setHeaderAttributeRef}>magical</HeaderAttribute>
        </HeaderAttributes>
      </Header>
      <EndHeader ref={endHeaderRef}>How much of it have you explored?</EndHeader>
    </Screen>
  );
};

export default WorldScene;
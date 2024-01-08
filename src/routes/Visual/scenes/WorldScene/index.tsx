import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import ParallaxScreen from '../../../../components/ParallaxScreen';
import PageContext from '../../../../utils/PageContext';
import { animationDurations } from '../../../../utils/ParallaxUtils';

import ScreenBackground from './images/screen-background.jpg';
import Subscreen1Background from './images/subscreen-1.jpg';
import Subscreen2Background from './images/subscreen-2.jpg';
import Subscreen3Background from './images/subscreen-3.jpg';
import Subscreen4Background from './images/subscreen-4.jpg';
import Subscreen5Background from './images/subscreen-5.jpg';
import Subscreen6Background from './images/subscreen-6.jpg';
import Subscreen7Background from './images/subscreen-7.jpg';

const Subscreen = styled.div<{ $backgroundImage: string, $backgroundPosition?: string }>`
  position: absolute;
  top: 100vh;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-image: ${(props) => { return `url(${props.$backgroundImage})`; }};
  background-position: ${(props) => { return props.$backgroundPosition ?? 'center'; }};
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

    for (let i = 0, startHeaderSpanCount = startHeaderRef.current.children.length; i < startHeaderSpanCount; i++) {
      timeline.from(startHeaderRef.current.children[i], {
        filter: 'blur(0.5rem)',
        opacity: 0,
        top: '+=30px',
        ease: 'power1.easeInOut',
        duration: animationDurations.FAST,
      });
    }

    for (let i = 0, subscreenCount = subscreenRefs.current.length; i < subscreenCount; i++) {
      const subscreenElement: HTMLDivElement = subscreenRefs.current[i];
      const headerAttributeElement: HTMLSpanElement = headerAttributeRefs.current[i];

      timeline.to(subscreenElement, {
        top: '-=100vh',
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
      
      timeline.to(subscreenElement, {
        // Do nothing to simulate a pause
        duration: animationDurations.FAST,
      });
    }

    timeline.to(headerRef.current, {
      // Do nothing to simulate a pause
      duration: animationDurations.FAST,
    });

    timeline.to(headerRef.current, {
      top: '-=10rem',
      ease: 'power1.easeInOut',
      duration: animationDurations.MEDIUM,
    });

    timeline.from(endHeaderRef.current, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      top: '+=30px',
      ease: 'power1.easeInOut',
      duration: animationDurations.MEDIUM,
    });

    registerScene(sceneIndex, screenRef, timeline);
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
    <ParallaxScreen innerRef={screenRef} backgroundImage={ScreenBackground} title="Photos from around the World">
      <StartHeader ref={startHeaderRef}>
        <span>What is this world to you?</span>
        <span>This world we live in.</span>
        <span>Our world.</span>
      </StartHeader>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen1Background} $backgroundPosition="center left" />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen2Background} $backgroundPosition="top left" />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen3Background} />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen4Background} $backgroundPosition="bottom right" />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen5Background} />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen6Background} />
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen7Background} $backgroundPosition="bottom center" />
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
    </ParallaxScreen>
  );
};

export default WorldScene;
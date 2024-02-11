import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import { Link as LinkRR } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';

import {
  PageTitle,
  PaddedPageWrapper,
  
  fadeInAnimation,
  pageTransitionDuration
} from '../../../../components/static';
import Screen from '../../../../components/Screen';
import { aspectRatios, screenSizes } from '../../../../utils/ResponsiveUtils';

import HeroMask from './images/hero-mask.png';

const moveUpAnimation = keyframes`
  0% {
    color: rgba(255, 255, 255, 0);
    transform: translate3d(0, 30px, 0);
  }
  
  100% {
    color: rgba(255, 255, 255, 0.5);
    transform: translate3d(0, 0, 0);
  }
`;

const changeTextColorAnimation = keyframes`
  0% {
    color: rgba(255, 255, 255, 0);
  }

  100% {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const HeroTitle = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 27.5dvh 0 0;
  width:  84vw;
  height: 100dvh;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;

  @media ${screenSizes.phone} {
    width: 100vw;
    font-size: 4.3rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 16rem;
  }

  @media ${aspectRatios.a21x9} {
    padding-top: 18.5dvh;
  }

  &::after {
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(${HeroMask});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    pointer-events: none;
    z-index: 6;
    animation: ${fadeInAnimation} 1600ms ease-in-out ${pageTransitionDuration + 400}ms 1 backwards,
      ${changeTextColorAnimation} 1600ms ease-in-out ${pageTransitionDuration + 400}ms 1 backwards;
  }
`;

const AnimatedText = styled.span`
  display: block;
  animation: ${moveUpAnimation} 1600ms ease-in-out ${pageTransitionDuration + 400}ms 1 backwards,
  ${changeTextColorAnimation} 1600ms ease-in-out ${pageTransitionDuration + 400}ms 1 backwards;
`;

const Writeup = styled.div`
  position: absolute;
  top: 52%;
  left: 10%;
  right: 10%;
  margin: 0 auto;
  width: 80%;
  max-width: 75rem;
  font-family: 'Crimson Text', serif;
  font-size: 1.8rem;
  text-align: center;
  z-index: 99;
  mix-blend-mode: difference;
  animation: ${fadeInAnimation} 1600ms ease-in-out ${pageTransitionDuration + 2000}ms 1 backwards,
    ${moveUpAnimation} 1600ms ease-in-out ${pageTransitionDuration + 2000}ms 1 backwards;
  
  @media ${screenSizes.phone} {
    top: 48%;
    left: 20px;
    right: 20px;
    width: calc(100% - 40px);
    font-size: 1.4rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 2.4rem;
  }
`;

const PromptText = styled.span`
  display: block;
  margin: 2rem 0 0;
  font-size: 1.4rem;
`;

const Activities = styled.ul`
  display: flex;
  position: absolute;
  bottom: 20%;
  left: 10%;
  right: 10%;
  margin: 30px 0 0;
  padding: 0;
  justify-content: center;
  list-style: none;
  z-index: 99;
  animation: ${fadeInAnimation} 1200ms ease-in-out ${pageTransitionDuration + 3600}ms 1 backwards,
    ${moveUpAnimation} 1200ms ease-in-out ${pageTransitionDuration + 3600}ms 1 backwards;

  @media ${screenSizes.phone} {
    bottom: 12%;
  }

  @media ${screenSizes.desktopS} {
    bottom: 15%;
  }

  @media ${screenSizes.desktopM} {
    bottom: 20%;
  }
`;

const Activity = styled.li`
  display: block;
  margin: 0;
  flex: 1;
  text-align: center;

  @media ${screenSizes.tablet} {
    margin-right: 1rem;
  }

  @media ${screenSizes.desktopS} {
    &:nth-child(2) {
      margin-right: 30%;
    }
  }
`;

const Link = styled(LinkRR)`
  display: inline-block;
  position: relative;
  color: #aaffff;
  font-family: 'Barlow Condensed', serif;
  font-size: 2.2rem;
  text-transform: uppercase;
  transition: all 250ms ease-out;

  &:visited {
    color: #aaffff;
  }

  &::after {
    display: block;
    position: absolute;
    bottom: -10px;
    left: 0;
    content: "";
    width: 100%;
    height: 3px;
    background: #aaffff;
    transform: scale3d(0, 1, 0);
    transition: all 250ms ease-out;
  }

  &:hover {
    transform: translate3d(0, -0.1rem, 0);

    &::after {
      transform: scale3d(1, 1, 1);
    }
  }

  @media ${screenSizes.phone} {
    font-size: 1.3rem;
  }
`;

const MainScene = ({ sceneIndex }: { sceneIndex: number }) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  
  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({});

    // Add an empty tween as Page expects a non-empty timeline
    timeline.to(screenRef.current, {});

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    registerScene(sceneIndex, screenRef, timeline);
  }, []);

  return (
    <Screen innerRef={screenRef}>
      <PaddedPageWrapper>
        <PageTitle>About</PageTitle>
        <HeroTitle><AnimatedText>Alvin Teh</AnimatedText></HeroTitle>
        <Writeup>
          A Renaissance man enthusiastic about topics including tech, fashion, food, poetry, games, photography,
          hiking, philosophy and music. While I am based in Singapore, I can often be found in other parts of the world engaging in my hinterland of hobbies.
          <br />
          <PromptText>Learn more in each section.</PromptText>
        </Writeup>
        <Activities>
          <Activity><Link to="/culinary">Food</Link></Activity>
          <Activity><Link to="/visual">Photography</Link></Activity>
          <Activity><Link to="/literary">Philosophy</Link></Activity>
          <Activity><Link to="/technology">Tech</Link></Activity>
        </Activities>
      </PaddedPageWrapper>
    </Screen>
  );
};

export default MainScene;
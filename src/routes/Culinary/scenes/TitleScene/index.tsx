import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import ParallaxScreen from '../../../../components/ParallaxScreen';
import { PageTitle, PaddedPageWrapper, pageTransitionDuration } from '../../../../components/static';
import { screenSizes } from '../../../../utils/StyleUtils';

const revealAnimation = keyframes`
  0% {
    filter: blur(0.5rem);
    opacity: 0;
    transform: scale(0.95);
  }
  
  100% {
    filter: blur(0);
    opacity: 1;
    transform: scale(1);
  }
`;

const changeTextColorAnimation = keyframes`
  0% {
    color: rgba(255, 255, 255, 0);
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0);
  }

  100% {
    color: rgba(255, 255, 255, 1);
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
`;

const Quote = styled.blockquote`
  position: relative;
  top: 20vh;
  margin: 0 5% 0 auto;
  max-width: 60rem;
  text-align: right;

  @media ${screenSizes.desktopM} {
    top: 25vh;
  }

  @media ${screenSizes.desktopL} {
    top: 30vh;
    max-width: 70rem;
  }
`;

const QuoteText = styled.div`
  margin: 0 0 1rem;
  font-family: 'Crimson Text', serif;
  font-size: 5.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

  @media ${screenSizes.desktopL} {
    font-size: 6.5rem;
  }

  &::before {
    content: open-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 0}ms both;
  }

  &::after {
    position: absolute;
    content: close-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 7}ms both;
  }

  & span:nth-child(1) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 0}ms both;
  }

  & span:nth-child(2) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 1}ms both;
  }

  & span:nth-child(3) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 2}ms both;
  }

  & span:nth-child(4) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 3}ms both;
  }

  & span:nth-child(5) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 4}ms both;
  }

  & span:nth-child(6) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 5}ms both;
  }

  & span:nth-child(7) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 6}ms both;
  }

  & span:nth-child(8) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 7}ms both;
  }
`;

const QuoteAuthor = styled.div`
  font-family: Lato, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 2500}ms 1 backwards,
  ${changeTextColorAnimation} 1200ms ease-in-out ${pageTransitionDuration + 2500}ms 1 backwards;
`;

const TitleScene = ({ sceneIndex }: { sceneIndex: number }) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({});

    registerScene(sceneIndex, screenRef, timeline);
  }, []);

  return (
    <ParallaxScreen
      innerRef={screenRef}
      title=""
    >
      <PaddedPageWrapper>
        <PageTitle>Culinary</PageTitle>
        <Quote>
          <QuoteText>
            <span>Food, </span>
            <span>for </span> 
            <span>me, </span> 
            <span>has </span>
            <span>always </span>
            <span>been </span>
            <span>an </span>
            <span>adventure.</span>
          </QuoteText>
          <QuoteAuthor>Anthony Bourdain</QuoteAuthor>
        </Quote>
      </PaddedPageWrapper>
    </ParallaxScreen>
  );
};

export default TitleScene;
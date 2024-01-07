import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import ParallaxScreen from '../../../../components/ParallaxScreen';
import { PageTitle, PaddedPageWrapper, pageTransitionDuration } from '../../../../components/static';
import PageContext from '../../../../utils/PageContext';
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
  top: 25vh;
  margin: 0 5% 0 auto;
  max-width: 70rem;
  text-align: right;
`;

const QuoteText = styled.div`
  margin: 0 0 1rem;
  font-family: 'Crimson Text', serif;
  font-size: 5rem;
  font-weight: 600;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

  &::before {
    content: open-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 0}ms both;
  }

  &::after {
    position: absolute;
    content: close-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 17}ms both;
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

  & span:nth-child(9) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 8}ms both;
  }

  & span:nth-child(10) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 9}ms both;
  }

  & span:nth-child(11) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 10}ms both;
  }

  & span:nth-child(12) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 11}ms both;
  }

  & span:nth-child(13) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 12}ms both;
  }

  & span:nth-child(14) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 13}ms both;
  }

  & span:nth-child(15) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 14}ms both;
  }

  & span:nth-child(16) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 15}ms both;
  }

  & span:nth-child(17) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 16}ms both;
  }

  & span:nth-child(18) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 17}ms both;
  }
`;

const QuoteAuthor = styled.div`
  font-family: Lato, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 5000}ms 1 backwards,
  ${changeTextColorAnimation} 1200ms ease-in-out ${pageTransitionDuration + 5000}ms 1 backwards;
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
        <PageTitle>Visual</PageTitle>
        <Quote>
          <QuoteText>
            <span>My </span>
            <span>life </span> 
            <span>is </span> 
            <span>shaped </span>
            <span>by </span>
            <span>the </span>
            <span>urgent </span>
            <span>need </span>
            <span>to </span>
            <span>wander </span>
            <span>and </span>
            <span>observe, </span>
            <span>and </span>
            <span>my </span>
            <span>camera </span>
            <span>is </span>
            <span>my </span>
            <span>passport.</span>
          </QuoteText>
          <QuoteAuthor>Steve McCurry</QuoteAuthor>
        </Quote>
      </PaddedPageWrapper>
    </ParallaxScreen>
  );
};

export default TitleScene;
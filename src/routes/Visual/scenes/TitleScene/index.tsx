import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { PageTitle, PaddedPageWrapper, pageTransitionDuration } from '../../../../components/static';
import { screenSizes } from '../../../../utils/ResponsiveUtils';

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
  max-width: 65rem;
  text-align: right;

  @media ${screenSizes.tablet} {
    top: 25vh;
  }

  @media ${screenSizes.phone} {
    top: 10vh;
  }

  @media ${screenSizes.desktopM} {
    top: 25vh;
  }
`;

const QuoteText = styled.div`
  margin: 0 0 1rem;
  font-family: 'Crimson Text', serif;
  font-size: 4rem;
  font-weight: 600;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

  @media ${screenSizes.phone}, ${screenSizes.tablet} {
    font-size: 3rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 5rem;
  }

  @media ${screenSizes.desktopL} {
    font-size: 6.5rem;
    max-width: 70rem;
  }

  &::before {
    content: open-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 0}ms both;
  }

  &::after {
    position: absolute;
    content: close-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 17}ms both;
  }

  ${[...Array(18).keys()].map((i: number) => {
    return css`& span:nth-child(${i + 1}) {
      animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * i}ms both;
    }`;
  })}
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

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    registerScene(sceneIndex, screenRef, timeline);
  }, []);

  return (
    <Screen innerRef={screenRef}>
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
    </Screen>
  );
};

export default TitleScene;
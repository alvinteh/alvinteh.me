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
  top: 20dvh;
  margin: 0 auto;
  max-width: 65rem;
  text-align: center;

  @media ${screenSizes.tablet} {
    top: 28dvh;
  }

  @media ${screenSizes.phone} {
    top: 12dvh;
  }

  @media ${screenSizes.desktopM} {
    top: 20dvh;
  }

  @media ${screenSizes.desktopL} {
    top: 25dvh;
    max-width: 80rem;
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
  }

  &::before {
    content: open-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 0}ms both;
  }

  &::after {
    position: absolute;
    content: close-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 15}ms both;
  }

  ${[...Array(15).keys()].map((i: number) => {
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
  animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 15 * 200}ms 1 backwards,
  ${changeTextColorAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 15 * 200}ms 1 backwards;
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
        <PageTitle>Literary</PageTitle>
        <Quote>
          <QuoteText>
            <span>Literature </span>
            <span>always </span>
            <span>anticipates </span>
            <span>life. </span>
            <span>It </span>
            <span>does </span>
            <span>not </span>
            <span>copy </span>
            <span>it </span>
            <span>but </span>
            <span>molds </span>
            <span>it </span>
            <span>to </span>
            <span>its </span>
            <span>purpose. </span>
          </QuoteText>
          <QuoteAuthor>Oscar Wilde</QuoteAuthor>
        </Quote>
      </PaddedPageWrapper>
    </Screen>
  );
};

export default TitleScene;
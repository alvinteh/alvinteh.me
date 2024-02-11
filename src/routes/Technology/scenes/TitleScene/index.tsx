import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { PageTitle, PaddedPageWrapper, pageTransitionDuration } from '../../../../components/static';
import { aspectRatios, screenSizes } from '../../../../utils/ResponsiveUtils';

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
  margin: 0 auto;
  max-width: 60rem;
  text-align: center;

  @media ${screenSizes.tablet} {
    top: 30vh;
  }

  @media ${screenSizes.phone} {
    top: 20vh;
  }

  @media ${screenSizes.desktopL} {
    top: 30vh;
    max-width: 80rem;
  }

  @media ${screenSizes.desktopXL} {
    top: 35vh;
  }

  @media ${aspectRatios.a21x9} {
    top: 30vh;
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
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 10}ms both;
  }

  ${[...Array(10).keys()].map((i: number) => {
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
  animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 3400}ms 1 backwards,
  ${changeTextColorAnimation} 1200ms ease-in-out ${pageTransitionDuration + 3400}ms 1 backwards;
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
        <PageTitle>Technology</PageTitle>
        <Quote>
          <QuoteText>
            <span>The </span>
            <span>future </span>
            <span>is </span>
            <span>still </span>
            <span>so </span>
            <span>much </span>
            <span>bigger </span>
            <span>than </span>
            <span>the </span>
            <span>past.</span>
          </QuoteText>
          <QuoteAuthor>Tim Berners-Lee</QuoteAuthor>
        </Quote>
      </PaddedPageWrapper>
    </Screen>
  );
};

export default TitleScene;
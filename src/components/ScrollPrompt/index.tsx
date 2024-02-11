import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useCallback, useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import { screenSizes } from '../../utils/ResponsiveUtils';
import ScrollPromptContext from './ScrollPromptContext';

const scrollPromptLeftAnimation = keyframes`
  0% {
    opacity: 1;
    transform: skewY(25deg);
  }
  
  50% {
    opacity: 0.85;
    transform: skewY(25deg) scale(0.96) translate3d(2px, -4px, 0);
  }

  100% {
    opacity: 1;
    transform: skewY(25deg);
  }
`;

const scrollPromptRightAnimation = keyframes`
  0% {
    opacity: 1;
    transform: skewY(-25deg);
  }
  
  50% {
    opacity: 0.85;
    transform: skewY(-25deg) scale(0.96) translate3d(-2px, -4px, 0);
  }

  100% {
    opacity: 1;
    transform: skewY(-25deg);
  }
`;

const ScrollPromptTextAnimation = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;

const ScrollPromptText = styled.span`
  display: block;
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -4rem;
  width: 8rem;
  font-weight: 600;
  opacity: 0;
  text-align: center;
  text-transform: uppercase;
  transition: all 200ms ease-in-out;
  user-select: none;
`;

const ScrollPromptWrapper = styled.span<{ $isVisible: boolean, $isMobileReady: boolean }>`
  display: block;
  position: fixed;
  bottom: 10px;
  left: 50%;
  margin-left: -45px;
  width: 90px;
  height: 60px;
  opacity: ${(props) => { return props.$isVisible ? 1 : 0; }};
  cursor: pointer;
  mix-blend-mode: difference;
  transition: opacity 200ms ease-in-out;

  &::before, &&::after {
    display: block;
    position: absolute;
    top: 25px;
    width: 45px;
		height: 10px;
    background: #ffffff;
    content: '';
  }

  &::before {
    transform-origin: 0% 100%;
    transform: skewY(25deg);
  }

  &::after {
    transform-origin: 100% 100%;
    transform: skewY(-25deg);
    right: 0;
  }
  
  &:hover {
    &::before {
      animation: ${scrollPromptLeftAnimation} 2s ease-out infinite;
    }
  
    &::after {
      animation: ${scrollPromptRightAnimation} 2s ease-out infinite;
    }

    ${ScrollPromptText} {
      animation: ${ScrollPromptTextAnimation} 2s 400ms ease-out infinite;
      opacity: 1;
    }
  }

  @media ${screenSizes.phone} {
    display: ${(props) => { return props.$isMobileReady ? 'block': 'none'; }};
  }
`;

const MobileNotice = styled.div<{ $isMobileReady: boolean }>`
  display: none;

  @media ${screenSizes.phone} {
    display: ${(props) => { return props.$isMobileReady ? 'none': 'block'; }};
    position: fixed;
    bottom: 10px;
    left: 20px;
    right: 20px;
    border-radius: 8px;
    padding: 10px;
    height: fit-content;
    background: #ffffff;
    color: #202020;
    font-family: Lato, sans-serif;
    font-size: 1rem;
    line-height: 1.3rem;
    text-align: center;
  }
`;

const ScrollPrompt = () => {
  const { isEnabled, pageObserverName, isMobileReady } = useContext(ScrollPromptContext);

  gsap.registerPlugin(Observer);

  const handleClick = useCallback((): void => {
    const observer: Observer = Observer.getById(pageObserverName) as Observer;
    observer.vars.onUp?.(observer);
  }, [pageObserverName]);

  return (
    <div>
      <MobileNotice $isMobileReady={!!isMobileReady}>
        Sorry, this page is currently unavailable on mobile devices.
        Please visit again on your tablet or computer.
      </MobileNotice>
      <ScrollPromptWrapper
        onClick={handleClick}
        $isVisible={isEnabled}
        $isMobileReady={!!isMobileReady}
      >
        <ScrollPromptText>Scroll Down</ScrollPromptText>
      </ScrollPromptWrapper>
    </div>
  );
};

export default ScrollPrompt;
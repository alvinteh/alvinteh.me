import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { navItemData, NavItemData } from '../Layout/NavItemData';

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

const ScrollPromptWrapper = styled.span<{ $positionAdjFactor: number, $isVisible: boolean }>`
  display: block;
  position: fixed;
  bottom: 10px;
  left: ${(props) => { return 42 + props.$positionAdjFactor * 4; }}%;
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
`;

const ScrollPrompt = ({ pageRef }: { pageRef: React.MutableRefObject<HTMLDivElement> }) => {
  const location = useLocation();

  const currentSlug: string = location.pathname.substring(1);
  const currentSlugIndex: number = navItemData.findIndex((navItemData: NavItemData) => {
    return navItemData.slug === currentSlug;
  });
  const [isVisible, setVisible] = useState(false);

  const handleClick = (): void => {
    if (isVisible) {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const handleScroll = (): void => {    
    if (window.innerHeight + window.scrollY >= pageRef.current.parentElement.scrollHeight) {
      setVisible(false);
    }
    else {
      setVisible(true);
    }
  };

  useEffect((): () => void => {
    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  return (
    <ScrollPromptWrapper
      onClick={handleClick}
      $positionAdjFactor={currentSlugIndex}
      $isVisible={isVisible}
    >
      <ScrollPromptText>Scroll Down</ScrollPromptText>
    </ScrollPromptWrapper>
  );
};

export default ScrollPrompt;
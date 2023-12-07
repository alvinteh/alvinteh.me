import styled, { keyframes } from 'styled-components';

const scrollPromptLeftAnimation = keyframes`
  0% {
    opacity: 1;
    transform: skewY(25deg);
  }
  
  50% {
    width: 38px;
		height: 9px;
    opacity: 0.8;
    transform: skewY(25deg)  translate3d(7px, -5px, 0);
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
    width: 38px;
		height: 9px;
    opacity: 0.8;
    transform: skewY(-25deg) translate3d(-7px, -5px, 0);
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

const ScrollPromptWrapper = styled.span`
  display: block;
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -45px;
  width: 90px;
  height: 60px;

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

const ScrollPrompt = () => {
  return <ScrollPromptWrapper><ScrollPromptText>Scroll Down</ScrollPromptText></ScrollPromptWrapper>;
};

export default ScrollPrompt;
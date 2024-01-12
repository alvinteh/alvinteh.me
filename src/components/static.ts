import keyMirror from 'keymirror';
import styled, { keyframes } from 'styled-components';

import { screenSizes } from '../utils/ResponsiveUtils';

type OverlayType = 'NORMAL' | 'STRONG';

const OverlayTypes: Record<OverlayType, OverlayType> = keyMirror({
  NORMAL: null,
  STRONG: null,
});

const cubicBezier = 'cubic-bezier(0.525, 0.06, 0.11, 0.995)';
const pageTransitionDuration = 400;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const wipeInAnimation = keyframes`
  0% {
    max-width: 0;
  }
  100% {
    max-width: 100%;
  }
`;

const FullPageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const PageWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 0;
  min-height: 100vh;
`;

const PaddedPageWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 50px 40px 0;
  min-height: 100vh;
  animation: ${fadeInAnimation} 1ms ${cubicBezier} ${pageTransitionDuration}ms 1 backwards;
`;

const PageTitle = styled.h1`
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 3rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  opacity: 0.85;
  overflow: hidden;
  text-transform: uppercase;
  animation: ${wipeInAnimation} 1600ms ${cubicBezier} ${pageTransitionDuration}ms 1 backwards;

  @media ${screenSizes.desktopM} {
    font-size: 5rem;
  }
`;

const Overlay = styled.div<{ $isToggled?: boolean, $type?: OverlayType }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, ${(props) => { return props.$type === OverlayTypes.STRONG ? 0.95 : 0.5; }});
  opacity: ${(props) => { return props.$isToggled === false ? 0 : 1; }};
  pointer-events: ${(props) => { return props.$isToggled ? 'auto' : 'none'; }};
  transition: opacity ${cubicBezier} 800ms;
  z-index: 999;
`;

export type { OverlayType };
export {
  cubicBezier,
  fadeInAnimation,
  pageTransitionDuration,

  FullPageWrapper,
  PaddedPageWrapper,
  PageWrapper,
  PageTitle,

  Overlay,
  OverlayTypes,
};
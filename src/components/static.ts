import styled from 'styled-components';

const cubicBezier = 'cubic-bezier(0.525, 0.06, 0.11, 0.995)';

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
`;

export {
  cubicBezier,
  FullPageWrapper,
  PageWrapper
};
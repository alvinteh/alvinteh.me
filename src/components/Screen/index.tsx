import styled from 'styled-components';

import ScreenBase from '../ScreenBase';

const ScreenWrapper = styled.div`
  position: relative;
  padding: 0;
  height: 100vh;
  overflow: hidden;
`;

const Screen = ({ innerRef, children, title }: {
  innerRef?: React.MutableRefObject<HTMLDivElement>
  children?: React.ReactNode,
  title: string
}) => {
  return (
    <ScreenBase title={title}>
      <ScreenWrapper ref={innerRef}>
          {children}
      </ScreenWrapper>
    </ScreenBase>
  );
};

export default Screen;
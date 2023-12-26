import styled from 'styled-components';
import ScreenBase from '../ScreenBase';

const ParallaxScreenWrapper = styled.div<{ $backgroundImage?: string }>`
  position: relative;
  box-sizing: border-box;
  padding: 50px 40px 0;
  height: 100vh;
  background-image: ${(props) => { return props.$backgroundImage ? `url(${props.$backgroundImage})` : 'none'; }};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const ParallaxScreen = ({ innerRef, children, backgroundImage, title }: {
  innerRef?: React.MutableRefObject<HTMLDivElement>
  children?: React.ReactNode,
  backgroundImage?: string, 
  title: string
}) => {
  return (
    <ScreenBase title={title}>
      <ParallaxScreenWrapper ref={innerRef} $backgroundImage={backgroundImage}>
          {children}
      </ParallaxScreenWrapper>
    </ScreenBase>
  );
};

export default ParallaxScreen;
import styled from 'styled-components';
import ScreenBase from '../ScreenBase';

const ParallaxScreenWrapper = styled.div<{ $backgroundImage?: string }>`
  position: relative;
  height: 100vh;
  background-image: ${(props) => { return props.$backgroundImage ? `url(${props.$backgroundImage})` : 'none'; }};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const ParallaxScreen = ({ innerRef, className, children, backgroundImage, title }: {
  innerRef?: React.MutableRefObject<HTMLDivElement>,
  className?: string,
  children?: React.ReactNode,
  backgroundImage?: string, 
  title: string
}) => {
  return (
    <ScreenBase title={title}>
      <ParallaxScreenWrapper
        ref={innerRef}
        className={className ?? ''}
        $backgroundImage={backgroundImage}
        >
          {children}
      </ParallaxScreenWrapper>
    </ScreenBase>
  );
};

export default ParallaxScreen;
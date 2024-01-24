import styled from 'styled-components';

interface ScreenElementAttrs {
  $backgroundImage?: string;
}

const ScreenElement = styled.div.attrs<ScreenElementAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: $backgroundImage ? `url(${$backgroundImage})` : 'none'
  }
}))`
  position: absolute;
  top: 100vh;
  left: 0;
  right: 0;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  &:first-child {
    top: 0;
  }
`;

const Screen = ({ innerRef, className, children, backgroundImage }: {
  innerRef?: React.MutableRefObject<HTMLDivElement>,
  className?: string,
  children?: React.ReactNode,
  backgroundImage?: string,
}) => {
  return (
    <ScreenElement ref={innerRef} className={className ?? ''} $backgroundImage={backgroundImage}>
      {children}
    </ScreenElement>
  );
};

export default Screen;
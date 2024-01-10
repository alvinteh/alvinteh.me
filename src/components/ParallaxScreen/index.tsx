import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../utils/PageContext';
import { setPageTitle } from '../../utils/PageUtils';

interface ParallaxScreenElementAttrs {
  $backgroundImage?: string;
}

const ParallaxScreenElement = styled.div.attrs<ParallaxScreenElementAttrs>(({ $backgroundImage }) => ({
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

const ScrollTracker = styled.div`
  position: relative;
`;

const ParallaxScreen = ({ innerRef, className, children, backgroundImage, title }: {
  innerRef?: React.MutableRefObject<HTMLDivElement>,
  className?: string,
  children?: React.ReactNode,
  backgroundImage?: string, 
  title: string
}) => {
  const { titleSuffix } = useContext(PageContext);
  const scrollRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const handleScroll = (): void => {  
    const element: HTMLElement = scrollRef.current;
    const bounds: DOMRect = element.getBoundingClientRect();

    if (bounds.top >= 0 && bounds.top <= 0.5 * window.innerHeight) {
      setPageTitle(title ? `${title} | ${titleSuffix}` : titleSuffix);
    }
  };

  useEffect((): () => void => {
    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  return (
    <ParallaxScreenElement ref={innerRef} className={className ?? ''} $backgroundImage={backgroundImage}>
      <ScrollTracker ref={scrollRef}>
        {children}
      </ScrollTracker>
    </ParallaxScreenElement>
  );
};

export default ParallaxScreen;
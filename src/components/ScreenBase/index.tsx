import { useContext, useEffect, useRef } from 'react';
import PageContext from '../../utils/PageContext';
import { setPageTitle } from '../../utils/PageUtils';

const ScreenBase = ({ children, title }: { children?: React.ReactNode, title: string }) => {
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
    <div ref={scrollRef}>
      {children}
    </div>
  );
};

export default ScreenBase;
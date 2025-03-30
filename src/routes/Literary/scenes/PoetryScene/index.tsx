import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import MarkdownIt from 'markdown-it';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';
import { cubicBezier, PaddedPageWrapper } from '../../../../components/static';
import rawWorks from './data/work-data.json';
import type { Work } from './types';

import SceneBackground from './images/scene-background.jpg';

interface WorksAttrs {
  $scrollPosition: number;
}

interface WorkAttrs {
  $backgroundImage: string;
}

const StyledPaddedPageWrapper = styled(PaddedPageWrapper)`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Header = styled.h2`
  position: relative;
  margin: 0 0 2rem;
  font-family: 'Crimson Text', serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2rem;
  overflow: hidden;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  white-space: nowrap;
  
  &>span {
    display: block;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media ${screenSizes.phone} {
    font-size: 1.4rem;
    line-height: 1.4rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 3.25rem;
    line-height: 3.25rem;
    margin-top: 10dvh;
  }
`;

const WriteupWrapper = styled.div<{ $isVisible: boolean }>`
  display: grid;
  margin: 0 0 ${(props) => { return props.$isVisible ? 4 : 0; }}rem;
  max-width: 50rem;
  grid-template-rows: ${(props) => { return props.$isVisible ? 1 : 0; }}fr;
  opacity: ${(props) => { return props.$isVisible ? 1 : 0; }};
  transition: opacity ${animationDurations.FAST}s ${cubicBezier},
    margin-bottom ${animationDurations.MEDIUM}s ${cubicBezier} ${animationDurations.FAST}s,
    grid-template-rows ${animationDurations.MEDIUM}s ${cubicBezier} ${animationDurations.FAST}s;

  @media ${screenSizes.phone} {
    margin-bottom: ${(props) => { return props.$isVisible ? 2 : 0; }}rem;
  }
`;

const Writeup = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.8rem;
  overflow: hidden;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);

  @media ${screenSizes.phone} {
    font-size: 1.1rem;
    line-height: 1.3rem;
  }
`;

const WorksWrapper = styled.div`
  position: relative;
  max-width: 50rem;
`;

const WorksSlider = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.5);
  border-bottom: solid 1px rgba(255, 255, 255, 0.5);
  padding: 25px 0;
  overflow: hidden;
`;

const Work = styled.li.attrs<WorkAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))<{ $state: string }>`
  margin: 0;
  padding: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0);
  cursor: pointer;
  filter: brightness(${(props) => { return props.$state === 'active' ? 1 : 0.9 }});
  opacity: ${(props) => { return props.$state === 'dulled' ? 0.5 : 1 }};
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  transition: all ${animationDurations.FAST}s ${cubicBezier};

  &:hover {
    filter: brightness(1) !important;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    opacity: 1;
    transform: scale3d(1.05, 1.05, 1.05);
  }
`;

// Note: we use this constant as we need to refer to styles in JS later
const WorkLayoutSettings: Record<string, Record<string, Record<string, number>>> = {
  columnGap: {
    desktop: {
      normal: 45,
      collapsed: 15,
    },
    mobile: {
      normal: 15,
      collapsed: 15,
    },
  },
  workWidth: {
    desktop: {
      normal: 165,
      collapsed: 55,
    },
    mobile: {
      normal: 110,
      collapsed: 55,
    },
  },
  workHeight: {
    desktop: {
      normal: 255,
      collapsed: 85,
    },
    mobile: {
      normal: 170,
      collapsed: 85,
    },
  },
};

const Works = styled.ul.attrs<WorksAttrs>(({ $scrollPosition }) => ({
  style: {
    transform: `translate3d(${$scrollPosition}px, 0, 0)`,
  }
}))<{ $isCollapsed: boolean }>`
  display: grid;
  margin: 0;
  padding: 0;
  column-gap: ${(props) => { return WorkLayoutSettings.columnGap.desktop[props.$isCollapsed ? 'collapsed' : 'normal']; }}px;
  grid-auto-flow: column;
  list-style: none;
  transition: all ${animationDurations.MEDIUM}s ${cubicBezier};

  @media ${screenSizes.phone} {
    column-gap: ${(props) => { return WorkLayoutSettings.columnGap.mobile[props.$isCollapsed ? 'collapsed' : 'normal']; }}px;
  }

  & > ${Work} {
    width: ${(props) => { return WorkLayoutSettings.workWidth.desktop[props.$isCollapsed ? 'collapsed' : 'normal']; }}px;
    height: ${(props) => { return WorkLayoutSettings.workHeight.desktop[props.$isCollapsed ? 'collapsed' : 'normal']; }}px;

    @media ${screenSizes.phone} {
      width: ${(props) => { return WorkLayoutSettings.workWidth.mobile[props.$isCollapsed ? 'collapsed' : 'normal']; }}px;
      height: ${(props) => { return WorkLayoutSettings.workHeight.mobile[props.$isCollapsed ? 'collapsed' : 'normal']; }}px;
    }
  }
`;

const ReaderWrapper = styled.div<{ $isActive: boolean}>`
  display: grid;  
  flex: 1;
  grid-template-rows: ${(props) => { return props.$isActive ? 1 : 0; }}fr;
  max-width: 50rem;
  overflow: hidden;
  transition: all ${animationDurations.FAST}s ${cubicBezier};
`;

const Reader = styled.div`  
  box-sizing: border-box;
  padding: 25px 20px;
  height: 100%;
  font-family: 'Crimson Text', serif;
  font-size: 1.6rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);

  @media ${screenSizes.phone} {
    padding: 20px 0;
    font-size: 1.4rem;
  }

  p {
    margin-bottom: 2rem;
  }
`;

const ButtonBase = styled.a<{ $isEnabled: boolean }>`
  display: block;
  position: absolute;
  top: 50%;
  border-top: 16px solid transparent;
  border-bottom: 16px solid transparent;
  width: 0; 
  height: 0;
  cursor: pointer;
  opacity: ${(props) => { return props.$isEnabled ? 1 : '0 !important'; }};
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  transform: translate3d(0, -50%, 0);
  transition: all ${animationDurations.FAST}s;
`;

const PrevButton = styled(ButtonBase)`
  left: -20px;
  border-right: 10px solid rgba(255, 255, 255, 0.75);

  &:hover {
   border-right-color: rgba(255, 255, 255, 1); 
  }

  @media ${screenSizes.phone} {
    left: -15px;
  }
`;

const NextButton = styled(ButtonBase)`
  right: -20px;
  border-left: 10px solid rgba(255, 255, 255, 0.75); 

  &:hover {
    border-left-color: rgba(255, 255, 255, 1); 
  }

  @media ${screenSizes.phone} {
    right: -15px;
  }
`;

const extWorks: Work[] = (rawWorks as unknown) as Work[];

extWorks.forEach((work: Work) => {
  work.coverSrc = `/data/works/images/${work.coverSrc}`;
});

const PoetryScene = ({ sceneIndex }: { sceneIndex: number }) => {
  const { pageObserverName, registerScene } = useContext(PageContext);
  const [works] = useState<Work[]>(extWorks);
  const [worksScrollPosition, setWorksScrollPosition] = useState<number>(0);
  const [isPrevButtonEnabled, setIsPrevButtonEnabled] = useState<boolean>(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState<boolean>(true);
  const [isReaderActive, setIsReaderActive] = useState<boolean>(false);
  const [currentWork, setCurrentWork] = useState<Work>();

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const writeupWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const writeupRef = useRef<HTMLParagraphElement>() as React.MutableRefObject<HTMLParagraphElement>;
  const worksSliderRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const worksRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const workRefs = useRef<HTMLLIElement[]>([]);
  const prevButtonRef = useRef<HTMLAnchorElement>() as React.MutableRefObject<HTMLAnchorElement>;
  const nextButtonRef = useRef<HTMLAnchorElement>() as React.MutableRefObject<HTMLAnchorElement>;
  const readerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  gsap.registerPlugin(SplitText);

  const handlePrevButtonClick = (event: React.MouseEvent): void => {
    const worksElement: HTMLUListElement = worksRef.current;
    const scrollLimit = 0;

    if (worksScrollPosition < scrollLimit) {
      const newScrollPosition: number = Math.min(worksScrollPosition + worksElement.clientWidth, scrollLimit);

      // Remove inline opacity set by GSAP
      nextButtonRef.current.style.removeProperty('opacity');

      setWorksScrollPosition(newScrollPosition);
      setIsNextButtonEnabled(true);

      if (newScrollPosition === scrollLimit) {
        setIsPrevButtonEnabled(false);
      }
    }

    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  const handleNextButtonClick = (event: React.MouseEvent): void => {
    const worksElement: HTMLUListElement = worksRef.current;
    const scrollLimit: number = worksElement.clientWidth - worksElement.scrollWidth;

    if (worksScrollPosition > scrollLimit) {
      const newScrollPosition: number = Math.max(worksScrollPosition - worksElement.clientWidth, scrollLimit);

      // Remove inline opacity set by GSAP
      prevButtonRef.current.style.removeProperty('opacity');

      setWorksScrollPosition(newScrollPosition);
      setIsPrevButtonEnabled(true);

      if (newScrollPosition === scrollLimit) {
        setIsNextButtonEnabled(false);
      }
    }

    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  useEffect((): void => {
    const workLayoutSettingsState: string = currentWork ? 'collapsed' : 'normal';
    const device: string = window.innerWidth > 576 ? 'desktop' : 'mobile'; 
    // Update scroll position if it is past the limit due to element resizing.
    const worksElement: HTMLUListElement = worksRef.current;
    // Note: we need to manually calculate the scroll width as the styles are not applied till
    // after the transition is over
    const scrollWidth: number = works.length * WorkLayoutSettings.workWidth[device][workLayoutSettingsState]
      + (works.length - 1) * WorkLayoutSettings.columnGap[device][workLayoutSettingsState];
    const scrollLimit: number = worksElement.clientWidth - scrollWidth;
    let updatedWorksScrollPosition: number = worksScrollPosition;

    if (worksScrollPosition <= scrollLimit) {
      updatedWorksScrollPosition = scrollLimit;
      setWorksScrollPosition(scrollLimit);
      setIsNextButtonEnabled(false);
    }

    if (!currentWork) {
      return;
    }

    // Update scroll position if current work is not visible
    const currentWorkIndex: number = workRefs.current.findIndex((element: HTMLLIElement): boolean => {
      return element.dataset.id === currentWork.id.toString();
    });
    const currentWorkPosition: number = currentWorkIndex * WorkLayoutSettings.workWidth[device][workLayoutSettingsState]
    + currentWorkIndex * WorkLayoutSettings.columnGap[device][workLayoutSettingsState];

    if (currentWorkPosition < -1 * updatedWorksScrollPosition) {
      setWorksScrollPosition(-1 * currentWorkPosition);
    }
    else if (currentWorkPosition + WorkLayoutSettings.workWidth[device][workLayoutSettingsState]
      < updatedWorksScrollPosition) {
      setWorksScrollPosition(currentWorkPosition + WorkLayoutSettings.workWidth[device][workLayoutSettingsState]);
    }

  // We can ignore this linting error as we do *not* want to run this effect if scroll position changes
  // (typically from interaction with the prev/next buttons)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [works, currentWork]);

  useEffect((): void => {
    setIsReaderActive(!!currentWork);

    if (!currentWork) {
      readerRef.current.innerHTML = '';
      return;
    }

    void (async (): Promise<void> => {
      try {
        const workMd: string = await (await fetch(`/data/works/docs/${currentWork.dataSrc}`)).text();
        const md = new MarkdownIt();
        const renderedWorkMd: string = md.render(workMd);
  
        readerRef.current.innerHTML = renderedWorkMd;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catch (e) {
        readerRef.current.innerHTML = 'Sorry, an error occured retrieving this work.';
      }
    })();
  }, [worksScrollPosition, currentWork]);

  useEffect((): void => {
    const observer: Observer | undefined = Observer.getById(pageObserverName);

    if (!observer) {
      return;
    }

    if (isReaderActive) {
      observer.disable();
    }
    else {
      observer.enable();
    }
  }, [pageObserverName, isReaderActive]);

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({});

    timeline.fromTo(headerRef.current, {
      maxWidth: 0,
    }, {
      maxWidth: '100%',
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
    });
    
    // Note we need this line as GSAP doesn't respect maxWidth 0 in the previous line
    timeline.set(headerRef.current, { maxWidth: 0 }, '<');

    const splitWriteup: SplitText = new SplitText(writeupRef.current, { type: 'lines' });
    
    // Skip blanks
    const writeupWordElements: Element[] = splitWriteup.lines.filter((element: Element): boolean => {
      return element.innerHTML !== '&nbsp;'
    });

    timeline.from(writeupWordElements, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      y: 10,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
      stagger: animationDurations.XXFAST,
    });

    timeline.from(worksSliderRef.current, {
      opacity: 0,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    });

    timeline.from(worksSliderRef.current, {
      padding: 0,
      height: 0,
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
      onComplete: (): void => {
        // Remove inline style added by GSAP
        worksSliderRef.current.style.removeProperty('height');
      }
    });

    const workElements: HTMLLIElement[] = workRefs.current;
    const xLimit: number = worksRef.current.getBoundingClientRect().right;

    const initialWorkElements: HTMLLIElement[] = [].slice.call(workElements)
      .filter((workElement: HTMLLIElement): boolean => {
        return workElement.getBoundingClientRect().left < xLimit;
      });

    timeline.fromTo(initialWorkElements, {
      filter: 'brightness(0)',
      opacity: 0,
    },
    {
      filter: 'brightness(0.9)',
      opacity: 1,
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
      stagger: animationDurations.XFAST,
      onComplete: (): void => {
        for (const element of initialWorkElements) {
          element.style.removeProperty('filter');
          element.style.removeProperty('opacity');
        }
      }
    });

    timeline.fromTo([prevButtonRef.current, nextButtonRef.current], {
      opacity: 0,
    },
    {
      opacity: 1,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    });

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    registerScene(sceneIndex, screenRef, timeline, 'Expressions of Life');
  }, [registerScene, sceneIndex, works]);

  const setWorkRef = (element: HTMLLIElement): HTMLLIElement => {
    workRefs.current[workRefs.current.length] = element;
    return element;
  };

  const workElements: React.JSX.Element[] = useMemo((): React.JSX.Element[] => {
    return works.map((work: Work): React.JSX.Element => {
      const state: string = currentWork ? (currentWork.id === work.id ? 'active' : 'dulled') : 'default';

      return (
        <Work
          ref={setWorkRef}
          key={work.id}
          data-id={work.id}
          $backgroundImage={work.coverSrc}
          $state={state}
          onClick={(event: React.MouseEvent): void => {
            setCurrentWork(work);

            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
          }}
        >
          {work.title}
        </Work>
      );
    })
  }, [currentWork, works]);

  return (
    <Screen innerRef={screenRef} backgroundImage={SceneBackground}>
      <StyledPaddedPageWrapper>
        <Header ref={headerRef}>Painting Life with Words</Header>
        <WriteupWrapper ref={writeupWrapperRef} $isVisible={!isReaderActive}>
          <Writeup ref={writeupRef}>
          As someone predisposed towards rumination, I often indulge in intellectual musings and pen my thoughts for later
          reflection. Literature is my preferred medium of expression, and poetry is my song.
          <br />
          <br />
          Below is a curated list of my writing.
          </Writeup>
        </WriteupWrapper>
        <WorksWrapper>
          <WorksSlider ref={worksSliderRef} onClick={(): void => { setCurrentWork(undefined); }}>
            <Works ref={worksRef} $scrollPosition={worksScrollPosition} $isCollapsed={isReaderActive} >
              {workElements}
            </Works>
            <PrevButton
              ref={prevButtonRef}
              $isEnabled={isPrevButtonEnabled}
              onClick={handlePrevButtonClick}
            >
              Prev
            </PrevButton>
            <NextButton
              ref={nextButtonRef}
              $isEnabled={isNextButtonEnabled}
              onClick={handleNextButtonClick}
            >
              Next
            </NextButton>
          </WorksSlider>
        </WorksWrapper>
        <ReaderWrapper $isActive={isReaderActive}>
          <Reader ref={readerRef} />
        </ReaderWrapper>
      </StyledPaddedPageWrapper>
    </Screen>
  );
};

export default PoetryScene;
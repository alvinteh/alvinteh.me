import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';
import { cubicBezier, PaddedPageWrapper } from '../../../../components/static';
import rawWorks from './data/work-data.json';
import { Work } from './types';

import SceneBackground from './images/scene-background.jpg';

interface WorksAttrs {
  $scrollPosition: number;
}

interface WorkAttrs {
  $backgroundImage: string;
}

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

  @media ${screenSizes.desktopM} {
    font-size: 3.25rem;
    line-height: 3.25rem;
    margin-top: 10vh;
  }
`;

const WriteupWrapper = styled.div<{ $isVisible: boolean }>`
  display: grid;
  margin: 0 0 4rem;
  max-width: 50rem;
  grid-template-rows: ${(props) => { return props.$isVisible ? 1 : 0; }}fr;
  opacity: ${(props) => { return props.$isVisible ? 1 : 0; }};
  transition: opacity ${animationDurations.FAST}s ${cubicBezier},
    margin-bottom ${animationDurations.MEDIUM}s ${cubicBezier} ${animationDurations.FAST}s;
    grid-template-rows ${animationDurations.MEDIUM}s ${cubicBezier} ${animationDurations.FAST}s;
`;

const Writeup = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.8rem;
  overflow: hidden;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const WorksSlider = styled.div`
  position: relative;
  max-width: 50rem;
`;

const WorksWrapper = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.5);
  border-bottom: solid 1px rgba(255, 255, 255, 0.5);
  padding: 25px 0;
  height: 255px;
  overflow: hidden;
`;

const Works = styled.ul.attrs<WorksAttrs>(({ $scrollPosition }) => ({
  style: {
    transform: `translate3d(${$scrollPosition}px, 0, 0)`,
  }
}))<{ $isVisible: boolean }>`
  display: grid;
  margin: 0;
  padding: 0;
  column-gap: 45px;
  grid-auto-flow: column;
  list-style: none;
  transition: transform ${animationDurations.MEDIUM}s ${cubicBezier};
`;

const Work = styled.li.attrs<WorkAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))`
  margin: 0;
  padding: 0;
  width: 165px;
  height: 255px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0);
  cursor: pointer;
  filter: brightness(0.9);
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  transition: all ${animationDurations.FAST}s ${cubicBezier};

  &:hover {
    filter: brightness(1) !important;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    transform: scale3d(1.05, 1.05, 1.05);
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
`;

const NextButton = styled(ButtonBase)`
  right: -20px;
  border-left: 10px solid rgba(255, 255, 255, 0.75); 

  &:hover {
    border-left-color: rgba(255, 255, 255, 1); 
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
  const [isDetailViewActive, setIsDetailViewActive] = useState<boolean>(false);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const writeupWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const writeupRef = useRef<HTMLParagraphElement>() as React.MutableRefObject<HTMLParagraphElement>;
  const worksWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const worksRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const workRefs = useRef<HTMLLIElement[]>([]);
  const prevButtonRef = useRef<HTMLAnchorElement>() as React.MutableRefObject<HTMLAnchorElement>;
  const nextButtonRef = useRef<HTMLAnchorElement>() as React.MutableRefObject<HTMLAnchorElement>;

  gsap.registerPlugin(SplitText);

  const handlePrevButtonClick = (): void => {
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
  };

  const handleNextButtonClick = (): void => {
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
  };

  const handleWorkClick = (work: Work): void => {
    // DONE: Hide <Writeup>
    // DONE: Shift <WorksWrapper> up

    // Hide <Works>
    // Expand <WorkView>

    setIsDetailViewActive(true);

    // TO-DO: Load and render markdown
    console.log(work);

    // TO-DO: Reset changes when leaving detail view or scene (setIsDetailViewActive = false)
  };

  useEffect((): void => {
    const observer: Observer | undefined = Observer.getById(pageObserverName);

    if (!observer) {
      return;
    }

    if (isDetailViewActive) {
      observer.disable();
    }
    else {
      observer.enable();
    }
  }, [pageObserverName, isDetailViewActive]);

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

    timeline.from(worksWrapperRef.current, {
      opacity: 0,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    });

    timeline.from(worksWrapperRef.current, {
      padding: 0,
      height: 0,
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
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
    });

    timeline.from([prevButtonRef.current, nextButtonRef.current], {
      opacity: 0,
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

  const workElements: JSX.Element[] = useMemo((): JSX.Element[] => {
    return works.map((work: Work): JSX.Element => {
      return (
        <Work
          ref={setWorkRef}
          key={uuid()}
          $backgroundImage={work.coverSrc}
          onClick={(): void => { handleWorkClick(work); }}
        >
          {work.title}
        </Work>
      );
    })
  }, [works]);

  return (
    <Screen innerRef={screenRef} backgroundImage={SceneBackground}>
      <PaddedPageWrapper>
        <Header ref={headerRef}>Painting Life with Words</Header>
        <WriteupWrapper ref={writeupWrapperRef} $isVisible={!isDetailViewActive}>
          <Writeup ref={writeupRef}>
          As someone predisposed towards rumination, I often indulge in intellectual musings and pen my thoughts for later
          reflection. Literature is my preferred medium of expression, and poetry is my song.
          <br />
          <br />
          Below is a curated list of my writing.
          </Writeup>
        </WriteupWrapper>
        <WorksSlider>
          <WorksWrapper ref={worksWrapperRef}>
            <Works ref={worksRef} $scrollPosition={worksScrollPosition} $isVisible={!isDetailViewActive}>
              {workElements}
            </Works>
            <PrevButton ref={prevButtonRef} $isEnabled={isPrevButtonEnabled} onClick={handlePrevButtonClick}>Prev</PrevButton>
            <NextButton ref={nextButtonRef} $isEnabled={isNextButtonEnabled} onClick={handleNextButtonClick}>Next</NextButton>
          </WorksWrapper>
        </WorksSlider>
      </PaddedPageWrapper>
    </Screen>
  );
};

export default PoetryScene;
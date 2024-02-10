import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useContext, useMemo, useRef, useState } from 'react';
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

const Writeup = styled.p`
  margin: 0 0 5rem;
  font-family: 'Crimson Text', serif;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.8rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  max-width: 50rem;
`;

const WorksWrapper = styled.div`
  max-width: 50rem;
`;

const Works = styled.ul`
  display: grid;
  margin: 0;
  box-sizing: border-box;
  border-top: solid 1px rgba(255, 255, 255, 0.5);
  border-bottom: solid 1px rgba(255, 255, 255, 0.5);
  padding: 20px 0;
  max-height: 297px;
  list-style: none;
  grid-template-columns: repeat(auto-fill, 165px);
  justify-content: space-between;
  overflow-y: hidden;
  scrollbar-gutter: stable;
`;

const Work = styled.li.attrs<WorkAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))`
  margin: 0 0 20px;
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
  transition: box-shadow ${animationDurations.XFAST}s ${cubicBezier};

  &:hover {
    filter: brightness(1) !important;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7); 
  }
`;

const ViewMoreButton = styled.a`
  display: block;
  margin-top: 5px;
  color: #ffffff;
  content: "Scroll for More";
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  user-select: none;
`;

const extWorks: Work[] = (rawWorks as unknown) as Work[];

extWorks.forEach((work: Work) => {
  work.coverSrc = `/poetry-cover-images/${work.coverSrc}`;
});

const PoetryScene = ({ sceneIndex }: { sceneIndex: number }) => {
  const { registerScene } = useContext(PageContext);
  const [works] = useState<Work[]>(extWorks);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const writeupRef = useRef<HTMLParagraphElement>() as React.MutableRefObject<HTMLParagraphElement>;
  const worksRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const workRefs = useRef<HTMLLIElement[]>([]);
  const viewMoreButtonRef = useRef<HTMLAnchorElement>() as React.MutableRefObject<HTMLAnchorElement>;

  gsap.registerPlugin(SplitText);

  const handleWorkClick = (work: Work): void => {
    // WIP
  };

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

    const worksElement: HTMLUListElement = worksRef.current;

    timeline.from(worksElement, {
      opacity: 0,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    });

    timeline.from(worksElement, {
      padding: 0,
      maxHeight: 0,
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
    });

    const workElements: HTMLLIElement[] = workRefs.current;
    const firstLineY: number = workElements[0].getBoundingClientRect().y;

    const firstLineWorkElements: HTMLLIElement[] = [].slice.call(workElements)
      .filter((workElement: HTMLLIElement): boolean => {
        return workElement.getBoundingClientRect().y === firstLineY;
      });

    timeline.fromTo(firstLineWorkElements, {
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

    timeline.from(viewMoreButtonRef.current, {
      opacity: 0,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    });

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    timeline.to(viewMoreButtonRef.current, {
      autoAlpha: 0,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    });

    timeline.to(writeupRef.current.children, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
    });

    const yDifference: number = writeupRef.current.getBoundingClientRect().top -
      worksElement.getBoundingClientRect().top;
    // Note, we deduct 50px to accommodate for the bottom padding
    // We can ignore the linting issue as the parent element (PaddedPageWrapper) always exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newHeight: number = worksElement.parentElement!.parentElement!.getBoundingClientRect().bottom
      - writeupRef.current.getBoundingClientRect().top - 50;

    timeline.to(worksElement.parentElement, {
      y: yDifference,
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    });

    timeline.to(worksElement, {
      maxHeight: `${newHeight}px`,
      ease: 'power1.inOut',
      duration: animationDurations.SLOW,
    }, '<');

    const remainingWorkElements: HTMLLIElement[] = [].slice.call(workElements)
      .filter((workElement: HTMLLIElement): boolean => {
        const y: number = workElement.getBoundingClientRect().y;
        return y > firstLineY && y < worksElement.clientHeight;
      });

    timeline.fromTo(remainingWorkElements, {
      filter: 'brightness(0)',
      opacity: 0,
    },
    {
      filter: 'brightness(0.9)',
      opacity: 1,
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
      stagger: animationDurations.XFAST,
    }, `<+=${animationDurations.XFAST}`);

    timeline.set(worksElement, { overflowY: 'auto' });

    timeline.addLabel(`scene-${sceneIndex}-outro`);

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
        <Writeup ref={writeupRef}>
        As someone predisposed towards rumination, I often indulge in intellectual musings and pen my thoughts for later
        reflection. Literature is my preferred medium of expression, and poetry is my song.
        <br />
        <br />
        Below is a curated list of my writing.
        </Writeup>
        <WorksWrapper>
          <Works ref={worksRef}>
            {workElements}
          </Works>
          <ViewMoreButton ref={viewMoreButtonRef}>Scroll for More</ViewMoreButton>
        </WorksWrapper>
      </PaddedPageWrapper>
    </Screen>
  );
};

export default PoetryScene;
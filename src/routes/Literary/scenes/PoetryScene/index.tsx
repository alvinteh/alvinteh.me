import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';
import { PaddedPageWrapper } from '../../../../components/static';

import SceneBackground from './images/scene-background.jpg';

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
  font-family: 'Crimson Text', serif;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.8rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);

  max-width: 50rem;
`;

const PoetryScene = ({ sceneIndex }: { sceneIndex: number }) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const writeupRef = useRef<HTMLParagraphElement>() as React.MutableRefObject<HTMLParagraphElement>;

  gsap.registerPlugin(SplitText);

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

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    registerScene(sceneIndex, screenRef, timeline, 'Expressions of Life');
  }, []);

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
      </PaddedPageWrapper>
    </Screen>
  );
};

export default PoetryScene;
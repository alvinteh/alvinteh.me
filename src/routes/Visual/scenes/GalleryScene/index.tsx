import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { Overlay } from '../../../../components/static';
import { animationDurations } from '../../../../utils/ParallaxUtils';
import { SceneProps } from '../../../../utils/SceneUtils';
import Gallery from './components/Gallery';
import images from './data/image-data';

const Header = styled.h2`
  position: absolute;
  top: 45vh;
  left: 0;
  margin: 0;
  width: 100%;
  height: 3rem;
  color: #ffffff;
  font-family: Inter, sans-serif;
  font-size: 3rem;
  line-height: 3rem;
  pointer-events: none;
  text-align: center;
  user-select: none;
`;

const GalleryWrapper = styled.div`
  position: relative;
  height: 100vh;
  background: #202020;
`;

const GalleryScene = ({ sceneIndex }: SceneProps) => {
  const { pageTimeline, registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const galleryWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const startOverlayRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const startHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  const [scrollTop, setScrollTop] = useState<number>(0);
  const [isGalleryInteractive, setIsGalleryInteractive] = useState<boolean>(false);

  const itemHeight = 270;
  const galleryReadyLabel = 'gallery-ready';

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({ data: { isCustomTransition: true }});

    const galleryWrapperElement: HTMLDivElement = galleryWrapperRef.current
    const startOverlayElement: HTMLDivElement = startOverlayRef.current;
    const startHeaderElement: HTMLHeadingElement = startHeaderRef.current;
    
    timeline.fromTo(galleryWrapperElement, {
      opacity: 0,
      y: `-=${itemHeight * 1}px`,
      scale: 2,
    },
    {
      opacity: 1,
      scale: 1,
      y: `${itemHeight * 1}px`,
      duration: animationDurations.XSLOW,
    });

    timeline.fromTo(screenRef.current, {
      background: 'rgba(20, 20, 20, 0)',
    },
    {
      background: 'rgba(20, 20, 20, 1)',
      duration: animationDurations.XSLOW,
    }, '<');

    timeline.to(galleryWrapperElement, {
      y: 0,
      height: `100vh`,
      duration: animationDurations.MEDIUM,
    });

    timeline.fromTo(startOverlayElement, {
      opacity: 0,
    }, {
      opacity: 1,
      ease: 'power1.easeInOut',
      duration: animationDurations.FAST,
    });

    timeline.from(startHeaderElement, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      top: '+=30px',
      ease: 'power1.easeInOut',
      duration: animationDurations.FAST,
    }, '<');

    timeline.to(startHeaderElement, {
      // Do nothing to simulate a pause
      duration: animationDurations.MEDIUM,
    });

    timeline.to(startHeaderElement, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      duration: animationDurations.FAST,
    });

    timeline.to(startOverlayElement, {
      opacity: 0,
      duration: animationDurations.FAST,
      onReverseComplete:(): void => {
        setIsGalleryInteractive(false);
      },
      onComplete: (): void => {
        setIsGalleryInteractive(true);
      },
    }, '<');

    timeline.addLabel(galleryReadyLabel, '>');

    timeline.to(screenRef.current, {
      // Do nothing to simulate a pause
      duration: animationDurations.MEDIUM,
    });

    registerScene(sceneIndex, screenRef, timeline);
  }, []);

  useEffect((): void => {
    if (!pageTimeline.scrollTrigger) {
      return;
    }

    setScrollTop(pageTimeline.scrollTrigger.labelToScroll(galleryReadyLabel));
  }, [pageTimeline]);

  return (
    <Screen innerRef={screenRef} title="Photo Gallery">
      <Overlay ref={startOverlayRef}>
        <Header ref={startHeaderRef}>Witness more moments of magic.</Header>
      </Overlay>
      <GalleryWrapper ref={galleryWrapperRef}>
        <Gallery
          images={images}
          itemHeight={itemHeight}
          scrollTop={scrollTop}
          isInteractive={isGalleryInteractive}
        />
      </GalleryWrapper>
    </Screen>
  );
};

export default GalleryScene;
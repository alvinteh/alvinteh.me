import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { Overlay } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { SceneProps } from '../../../../utils/SceneUtils';
import Gallery from './components/Gallery';
import rawImages from './data/image-data.json';
import { Image } from './types';

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

const images: Image[] = rawImages as unknown as Image[];

images.forEach((image: Image) => {
  image.src = `/gallery-images/${image.src}`;
});

const GalleryScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const galleryWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const startOverlayRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const startHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  const [isGalleryInteractive, setIsGalleryInteractive] = useState<boolean>(false);

  const itemHeight = 270;

  // Screen animation
  useGSAP((): void => {
    const timeline: gsap.core.Timeline = gsap.timeline({ data: { isCustomTransition: true }});

    const galleryWrapperElement: HTMLDivElement = galleryWrapperRef.current
    const startOverlayElement: HTMLDivElement = startOverlayRef.current;
    const startHeaderElement: HTMLHeadingElement = startHeaderRef.current;

    timeline.fromTo(galleryWrapperElement, {
      opacity: 0,
      scale: 2,
      y: `${itemHeight * 1}px`,
    },
    {
      opacity: 1,
      scale: 1,
      y: `${itemHeight * 1}px`,
      ease: 'power1.out',
      duration: animationDurations.XSLOW,
    });

    timeline.fromTo(screenRef.current, {
      background: 'rgba(20, 20, 20, 0)',
    },
    {
      background: 'rgba(20, 20, 20, 1)',
      ease: 'power1.out',
      duration: animationDurations.XSLOW,
    }, '<');

    timeline.to(galleryWrapperElement, {
      y: 0,
      ease: 'power1.inOut',
      duration: animationDurations.XSLOW,
    });

    timeline.fromTo(startOverlayElement, {
      opacity: 0,
    }, {
      opacity: 1,
      ease: 'power1.inOut',
      duration: animationDurations.MEDIUM,
    }, '<');

    timeline.from(startHeaderElement, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      top: '+=30px',
      ease: 'power1.inOut',
      duration: animationDurations.FAST,
    }, `<+=${animationDurations.FAST}`);

    timeline.to(startHeaderElement, {
      // Do nothing to simulate a pause
      duration: animationDurations.XFAST,
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

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    // Note this pause is needed to ensure the gallery can be interacted with
    timeline.to(startOverlayElement, {
      // Do nothing to simulate a pause
      duration: animationDurations.XFAST,
    });

    registerScene(sceneIndex, screenRef, timeline, 'Photo Gallery');
  }, []);

  return (
    <Screen innerRef={screenRef}>
      <Overlay ref={startOverlayRef}>
        <Header ref={startHeaderRef}>Witness more moments of magic.</Header>
      </Overlay>
      <GalleryWrapper ref={galleryWrapperRef}>
        <Gallery
          images={images}
          itemHeight={itemHeight}
          isInteractive={isGalleryInteractive}
        />
      </GalleryWrapper>
    </Screen>
  );
};

export default GalleryScene;
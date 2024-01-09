import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import ParallaxScreen from '../../../../components/ParallaxScreen';
import PageContext from '../../../../utils/PageContext';
import { animationDurations } from '../../../../utils/ParallaxUtils';
import { SceneProps } from '../../../../utils/SceneUtils';
import Gallery from './components/Gallery';
import images from './data/image-data';

const GalleryWrapper = styled.div`
  position: relative;
  height: 100vh;
  background: #202020;
`;

const GalleryScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({});

    timeline.to(screenRef.current, {
      // Do nothing to simulate a pause
      duration: animationDurations.MEDIUM,
    });

    registerScene(sceneIndex, screenRef, timeline);
  }, []); 

  return (
    <ParallaxScreen innerRef={screenRef} title="Photo Gallery">
      <GalleryWrapper>
        <Gallery images={images} itemHeight={270} />
      </GalleryWrapper>
    </ParallaxScreen>
  );
};

export default GalleryScene;
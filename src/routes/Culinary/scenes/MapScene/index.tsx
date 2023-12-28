import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { APIProvider } from '@vis.gl/react-google-maps';

import ParallaxScreen from '../../../../components/ParallaxScreen';
import PlaceMap from './components/PlaceMap';
import PlaceMapContext from './components/PlaceMapContext';
import PlacePanel from './components/PlacePanel';
import rawPlaces from './data/map-data.json';
import { Place } from './types';

import SceneBackground from './images/screen-map.jpg';

const Subscreen = styled.div<{ $zIndex?: number }>`
  position: absolute;
  top: 100vh;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: ${(props) => { return Number.isNaN(props.$zIndex) ? 'auto' : props.$zIndex; }};

  &:nth-child(1) {
    top: 0;
  }
`;

const Overlay = styled.div`
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const SubscreenHeader = styled.h3`
  position: relative;
  margin: 0;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  text-align: center;
  text-transform: uppercase;
`;

const Subscreen1Header = styled(SubscreenHeader)`
  top: 40vh;
`;

const Subscreen1HeaderS1 = styled.span`
  display: block;
  font-size: 3rem;
`;

const Subscreen1HeaderS2 = styled.span`
  display: block;
  font-size: 5rem;
`;

const Subscreen3Header = styled(SubscreenHeader)`
  top: 40vh;
`;

const Subscreen3HeaderS1 = styled.span`
  display: block;
  font-size: 3rem;
`;

const Subscreen3HeaderS2 = styled.span`
  display: block;
  font-size: 4rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  min-height: 100%;
`;

const ContentPanel = styled.div`
  box-sizing: border-box;
  padding: 50px 20px;
  width: 25%;
  max-width: 30rem;
  min-height: 100%;
  background: #202020;
`;

const MapPanel = styled.div`
  width: 75%;
  min-height: 100%;
  background: #ff0000;
`;

const MapSubscreenHeader = styled.h3`
  color: #ffffff;
  font-family: 'Barlow Condensed', serif;
  font-size: 2.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const places: Place[] = (rawPlaces as unknown) as Place[];
places.forEach((place: Place) => { place.id = uuid(); })
places.sort((a: Place, b: Place): number => { return (a.name < b.name ? -1 : 1); })

const MapScene = () => {
  const [activePlaceId, setActivePlaceId] = useState('');

  // Screen refs and nodes
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen1Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen1HeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const subscreen2Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen3Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen3HeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  // Screen data
  // (None)

  gsap.registerPlugin(ScrollTrigger);

    // Screen animation
    useGSAP((): void => {      
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: screenRef.current,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${5 * 300}`,
        }
      });

      timeline.from(subscreen1HeaderRef.current.children, {
        filter: 'blur(4rem)',
        opacity: 0,
        transform: 'scale(0.95) translate3d(0, 75px, 0)',
        ease: 'power1.out',
        duration: 1,
        stagger: 0.25,
      });

      timeline.to(subscreen2Ref.current, {
        top: '-=100vh',
        duration: 2,
      });

      // Do nothing to simulate a pause
      timeline.to(subscreen2Ref.current, {
        duration: 1,
      });

      timeline.to(subscreen1Ref.current, {
        top: '-=100vh',
        duration: 2,
      });

      timeline.to(subscreen2Ref.current, {
        top: '-=200vh',
        duration: 2,
      }, '<');

      timeline.to(subscreen3Ref.current, {
        top: '-=100vh',
        duration: 2,
      }, '<');

      timeline.from(subscreen3HeaderRef.current.children, {
        filter: 'blur(4rem)',
        opacity: 0,
        transform: 'scale(0.95) translate3d(0, 75px, 0)',
        ease: 'power1.out',
        duration: 1,
        stagger: 0.25,
      });
  });

  return (
    <ParallaxScreen
      innerRef={screenRef}
      title="Food & Drink Experiences"
      backgroundImage={SceneBackground}
    >
      <Subscreen ref={subscreen1Ref}>
        <Overlay>
          <Subscreen1Header ref={subscreen1HeaderRef}>
            <Subscreen1HeaderS1>Begin your own</Subscreen1HeaderS1>
            <Subscreen1HeaderS2>Culinary Journey</Subscreen1HeaderS2>
          </Subscreen1Header>
        </Overlay>
      </Subscreen>
      <Subscreen ref={subscreen2Ref} $zIndex={9992}>
        <PlaceMapContext.Provider value={{ activePlaceId, setActivePlaceId }}>
          <FlexWrapper>
            <ContentPanel>
              <MapSubscreenHeader>Explore Culinary Points of Interest</MapSubscreenHeader>
              <PlacePanel places={places} />
            </ContentPanel>
            <MapPanel>
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
                <PlaceMap places={places} />
              </APIProvider>
            </MapPanel>
          </FlexWrapper>
        </PlaceMapContext.Provider>
      </Subscreen>
      <Subscreen ref={subscreen3Ref} $zIndex={9993}>
        <Overlay>
            <Subscreen3Header ref={subscreen3HeaderRef}>
              <Subscreen3HeaderS1>All of this food and drink</Subscreen3HeaderS1>
              <Subscreen3HeaderS2>Do you ever cook anything yourself?</Subscreen3HeaderS2>
            </Subscreen3Header>
          </Overlay>
      </Subscreen>
    </ParallaxScreen>
  );
};

export default MapScene;
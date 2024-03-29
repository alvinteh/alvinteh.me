import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { APIProvider } from '@vis.gl/react-google-maps';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';
import { SceneProps } from '../../../../utils/SceneUtils';
import PlaceMap from './components/PlaceMap';
import PlaceMapContext from './components/PlaceMapContext';
import PlacePanel from './components/PlacePanel';
import rawPlaces from './data/map-data.json';
import { Place } from './types';

import SceneBackground from './images/screen-map.jpg';

const Subscreen = styled.div`
  position: absolute;
  top: 100dvh;
  padding: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;

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
  height: 100dvh;
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
  top: 40dvh;
`;

const Subscreen1HeaderS1 = styled.span`
  display: block;
  font-size: 3rem;

  @media ${screenSizes.phone} {
    font-size: 2rem;
  }
`;

const Subscreen1HeaderS2 = styled.span`
  display: block;
  font-size: 5rem;

  @media ${screenSizes.phone} {
    font-size: 3rem;
  }
`;

const Subscreen3Header = styled(SubscreenHeader)`
  top: 40dvh;
`;

const Subscreen3HeaderS1 = styled.span`
  display: block;
  font-size: 3rem;

  @media ${screenSizes.phone} {
    font-size: 2rem;
  }
`;

const Subscreen3HeaderS2 = styled.span`
  display: block;
  font-size: 4rem;

  @media ${screenSizes.phone} {
    font-size: 3rem;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  min-height: 100%;

  @media ${screenSizes.phone} {
    flex-direction: column;
  }
`;

const ContentPanel = styled.div`
  box-sizing: border-box;
  padding: 50px 20px;
  width: clamp(18rem, 25%, 30rem);
  min-height: 100%;
  background: #202020;

  @media ${screenSizes.phone} {
    padding: 70px 20px 30px;
    width: 100%;
    height: 35dvh;
    min-height: auto;
  }
`;

const MapPanel = styled.div`
  flex-grow: 1;
  width: 75%;
  min-height: 100%;

  @media ${screenSizes.phone} {
    flex-grow: 1;
    width: 100%;
    height: 65dvh;
    min-height: auto;
  }
`;

const MapSubscreenHeader = styled.h3`
  margin-bottom: 4rem;
  color: #ffffff;
  font-family: 'Barlow Condensed', serif;
  font-size: 1.75rem;
  font-weight: 600;
  text-transform: uppercase;

  @media ${screenSizes.phone} {
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 2.5rem;
  }

  @media ${screenSizes.desktopL} {
    font-size: 3rem;
  }
`;

const places: Place[] = (rawPlaces as unknown) as Place[];
places.forEach((place: Place) => { place.id = uuid(); })
places.sort((a: Place, b: Place): number => { return (a.name < b.name ? -1 : 1); })

const MapScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);
  const [activePlaceId, setActivePlaceId] = useState('');

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen1Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen1HeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const subscreen2Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen3Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreen3HeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  // Screen animation
  useGSAP((): void => {      
    const timeline = gsap.timeline({});

    // Note we need this meaningless tween as GSAP doesn't respect the from values in the next tween
    timeline.fromTo(subscreen1HeaderRef.current.children, {
      z: '1px'
    },
    {
      z: 0
    });

    timeline.fromTo(subscreen1HeaderRef.current.children, {
      filter: 'blur(4rem)',
      opacity: 0,
      scale: 0.05,
      y: '75px',
    },
    {
      filter: 'blur(0rem)',
      opacity: 1,
      scale: 1,
      y: 0,
      ease: 'power1.out',
      duration: animationDurations.FAST,
      stagger: 0.25,
    });

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    timeline.to(subscreen2Ref.current, {
      y: '-=100dvh',
      duration: animationDurations.XSLOW,
    });

    timeline.addLabel(`scene-${sceneIndex}-map`);

    timeline.to(subscreen1Ref.current, {
      y: '-=100dvh',
      duration: animationDurations.XSLOW,
    });

    timeline.to(subscreen2Ref.current, {
      y: '-=200dvh',
      duration: animationDurations.XSLOW,
    }, '<');

    timeline.to(subscreen3Ref.current, {
      y: '-=100dvh',
      duration: animationDurations.XSLOW,
    }, '<');

    timeline.from(subscreen3HeaderRef.current.children, {
      filter: 'blur(4rem)',
      opacity: 0,
      transform: 'scale(0.05) translate3d(0, 75px, 0)',
      ease: 'power1.out',
      duration: animationDurations.FAST,
      stagger: 0.25,
    });

    timeline.addLabel(`scene-${sceneIndex}-outro`);

    registerScene(sceneIndex, screenRef, timeline, 'Food & Drink Experience Map');
  }, [sceneIndex, registerScene]);

  return (
    <Screen
      innerRef={screenRef}
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
      <Subscreen ref={subscreen2Ref}>
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
      <Subscreen ref={subscreen3Ref}>
        <Overlay>
            <Subscreen3Header ref={subscreen3HeaderRef}>
              <Subscreen3HeaderS1>All of this food and drink</Subscreen3HeaderS1>
              <Subscreen3HeaderS2>Do you ever cook anything yourself?</Subscreen3HeaderS2>
            </Subscreen3Header>
          </Overlay>
      </Subscreen>
    </Screen>
  );
};

export default MapScene;
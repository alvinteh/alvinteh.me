import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { APIProvider, Map, AdvancedMarker, useMapsLibrary } from '@vis.gl/react-google-maps';

import { Screen } from '../../../components/static';
import cuisineMarkerStyleMap, { MarkerStyle } from './map-icon-data';
import rawPlaces from './map-data.json';

interface Place {
  name: string;
  cuisine: string;
  cost: number;
  position: google.maps.LatLngLiteral;
}

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

const Header = styled.h3`
  color: #ffffff;
  font-family: 'Barlow Condensed', serif;
  font-size: 3rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const MapMarker = styled.div<{ $backgroundColor: string }>`
  border-radius: 50%;
  padding: 0.3rem;
  background: ${(props) => { return props.$backgroundColor; }};
  color: #ffffff;
`;

const places: Place[] = (rawPlaces as unknown) as Place[];
// Points to L'Antica Pizzeria de Michele in Napoli, roughly in the middle of the map
const MAP_CENTER = { lat: 40.8497563, lng: 14.2633002 };

const InteractiveMap = () => {
  const coreLibrary = useMapsLibrary('core');
  const [placeElements, setPlaceElements] = useState<React.ReactNode[]>([]);

  useEffect((): void => {
    if (!coreLibrary) {
      return;
    }

    setPlaceElements(places.map((place: Place): React.ReactNode => {
      const markerStyle: MarkerStyle = cuisineMarkerStyleMap[place.cuisine];

      return (
        <AdvancedMarker
          key={uuid()}
          position={place.position}
          title={place.name}
        >
          <MapMarker $backgroundColor={markerStyle.backgroundColor}>
            <FontAwesomeIcon icon={markerStyle.icon} fixedWidth />
          </MapMarker>
        </AdvancedMarker>
      );
    }));

    new google.maps.Marker
  }, [coreLibrary]);

  return (
    <Map
      mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string}
      center={MAP_CENTER}
      disableDefaultUI={true}
      keyboardShortcuts={false}
      zoom={2.5}
      zoomControl={true}
    >
      {placeElements}
    </Map>
  );
};

const MapScreen = () => {
  return (
    <Screen>
      <FlexWrapper>
        <ContentPanel>
          <Header>Where can I try them?</Header>

        </ContentPanel>
        <MapPanel>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
            <InteractiveMap />
          </APIProvider>
        </MapPanel>
      </FlexWrapper>
    </Screen>
  );
};

export default MapScreen;
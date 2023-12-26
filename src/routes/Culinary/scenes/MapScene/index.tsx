import styled from 'styled-components';
import { APIProvider } from '@vis.gl/react-google-maps';

import Screen from '../../../../components/Screen';
import PlaceMap from './components/PlaceMap';
import rawPlaces from './data/map-data.json';
import { Place } from './types';

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

const places: Place[] = (rawPlaces as unknown) as Place[];

const MapScene = () => {
  return (
    <Screen title="Food & Drink Experiences">
      <FlexWrapper>
        <ContentPanel>
          <Header>Explore Places</Header>
        </ContentPanel>
        <MapPanel>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
            <PlaceMap places={places} />
          </APIProvider>
        </MapPanel>
      </FlexWrapper>
    </Screen>
  );
};

export default MapScene;
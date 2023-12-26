import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

import { Place } from '../types';
import cuisineMarkerStyleMap, { MarkerStyle } from '../data/map-icon-data';
import PlaceMapContext from './PlaceMapContext';

const MarkerBackground = styled.div<{ $backgroundColor: string }>`
  border-radius: 50%;
  padding: 0.3rem;
  background: ${(props) => { return props.$backgroundColor; }};
  color: #ffffff;
`;

const InfoDetails = styled.div`
  color: #202020;
`;

const PlaceMarker = ({ place }: { place: Place }) => {
  const { activePlaceMarkerId, setActivePlaceMarkerId } = useContext(PlaceMapContext);
  const [placeMarkerId] = useState(uuid());
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [markerRef, markerElement] = useAdvancedMarkerRef();

  const markerStyle: MarkerStyle = cuisineMarkerStyleMap[place.cuisine];

  const handleClick = (shouldOpenWindow: boolean): void => {
    setIsInfoWindowOpen(shouldOpenWindow);

    if (shouldOpenWindow) {
      setActivePlaceMarkerId(placeMarkerId);
    }
  }

  useEffect((): void => {
    if (activePlaceMarkerId !== placeMarkerId) {
      setIsInfoWindowOpen(false);
    }
  }, [activePlaceMarkerId, placeMarkerId]);

  return (
    <AdvancedMarker
      key={placeMarkerId}
      ref={markerRef}
      position={place.position}
      title={place.name}
      onClick={(): void => { handleClick(true); }}
    >
      <MarkerBackground $backgroundColor={markerStyle.backgroundColor}>
        <FontAwesomeIcon icon={markerStyle.icon} fixedWidth />
      </MarkerBackground>
      {isInfoWindowOpen && (
        <InfoWindow
          anchor={markerElement}
          maxWidth={150}
          onCloseClick={(): void => { handleClick(false); }}
        >
          <InfoDetails>
            Cuisine: {place.cuisine}
            <br />
            Cost: {place.price}
          </InfoDetails>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default PlaceMarker;
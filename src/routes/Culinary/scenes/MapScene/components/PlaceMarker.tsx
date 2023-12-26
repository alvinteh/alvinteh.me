import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
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
  padding: 0.2rem;
  color: #202020;
  font-family: Lato, sans-serif;
`;

const PlaceName = styled.h4`
  margin: 0 0 0.1rem;
  font-size: 1rem;
  font-weight: 600;
`;

const InfoCuisine = styled.span`
  margin-right: 0.25rem;

  &::after {
    position: relative;
    top: -0.1rem;
    content: "•";
    padding-left: 0.3rem;
    font-size: 0.5rem;
  }
`;

const InfoPrice = styled.span`
  color: #303030;
`;

const InfoLink = styled.a`
  display: inline-block;
  margin: 1.5rem 0 0;
  border: solid 1px #5080c0;
  padding: 0.3rem 0.5rem;
  color: #5080b0;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  text-transform: uppercase;

  &:hover {
    background: #5080c0;
    color: #ffffff;    
  }
`;

const PlaceMarker = ({ place }: { place: Place }) => {
  const { activePlaceId, setActivePlaceId } = useContext(PlaceMapContext);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [markerRef, markerElement] = useAdvancedMarkerRef();

  const markerStyle: MarkerStyle = cuisineMarkerStyleMap[place.cuisine];
  const googleMapsUrl = `https://www.google.com/maps/search/${place.name}/` 
    + `@${place.position.lat},${place.position.lng},15z`;

  const handleClick = (shouldOpenWindow: boolean): void => {
    setIsInfoWindowOpen(shouldOpenWindow);

    if (shouldOpenWindow) {
      // We can ignore linting errors as we populate place IDs before use
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setActivePlaceId(place.id!);
    }
  }

  useEffect((): void => {
    if (activePlaceId !== place.id) {
      setIsInfoWindowOpen(false);
    }
    else if (activePlaceId === place.id) {
      setIsInfoWindowOpen(true);
    }
  }, [activePlaceId, place.id]);

  return (
    <AdvancedMarker
      key={place.id}
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
          maxWidth={250}
          onCloseClick={(): void => { handleClick(false); }}
        >
          <InfoDetails>
            <PlaceName>{place.name}</PlaceName>
            <InfoCuisine>{place.cuisine}</InfoCuisine>
            <InfoPrice>{'$'.repeat(place.price)}</InfoPrice>
            <br />
            <InfoLink href={googleMapsUrl} rel="external" target="_blank">View in Google Maps</InfoLink>
          </InfoDetails>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default PlaceMarker;
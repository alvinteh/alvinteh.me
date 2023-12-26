import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import cuisineMarkerStyleMap, { MarkerStyle } from '../data/map-icon-data';
import { Place } from '../types';
import PlaceMapContext from './PlaceMapContext';

const Places = styled.ul`
  margin: 4rem 0 0;
  border-top: solid 1px #ffffff;
  border-bottom: solid 1px #ffffff;
  padding: 1rem 0;
  height: 55vh;
  list-style: none;
  overflow: scroll;
`;

const Place = styled.li`
  display: flex;
  margin: 0;
  padding: 0.5rem 0.3rem;
  cursor: pointer;
  line-height: 1.3rem;
  overflow: hidden;

  &:hover {
    background: #404040;
  }
`;

const PlaceIcon = styled.span`
  display: block;
  width: 1.2rem;
  font-size: 1rem;
  text-align: center;
`;

const PlaceName = styled.span`
  display: block;
  flex-grow: 1;
  padding-left: 0.5rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaceCuisine = styled.span`
  display: span;
  font-family: Lato, sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const PlacePrice = styled.span`
  width: 3rem;
  font-size: 0.8rem;
  text-align: right;
`;

const PlacePanel = ({ places }: { places: Place[] }) => {
  const { setActivePlaceId } = useContext(PlaceMapContext);

  const handleClick = (placeId: string): void => {
    setActivePlaceId(placeId);
  }

  const placeElements: React.ReactNode[] = places.map((place: Place): React.ReactNode => {
    const markerStyle: MarkerStyle = cuisineMarkerStyleMap[place.cuisine];

    return (
      // We can ignore linting errors as we populate place IDs before use
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      <Place key={uuid()} onClick={():void => { handleClick(place.id!); }}>
        <PlaceIcon><FontAwesomeIcon icon={markerStyle.icon} fixedWidth /></PlaceIcon>
        <PlaceName>{place.name} <PlaceCuisine>{place.cuisine}</PlaceCuisine></PlaceName> 
        <PlacePrice>{'$'.repeat(place.price)}</PlacePrice>
      </Place>
    );
  });

  return (
    <Places>
      {placeElements}
    </Places>
  );
};

export default PlacePanel;
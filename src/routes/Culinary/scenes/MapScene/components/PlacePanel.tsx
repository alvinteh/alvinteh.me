import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import Select from '../../../../../components/Select';
import { Option } from '../../../../../components/Select/types';
import cuisineMarkerStyleMap, { MarkerStyle } from '../data/map-icon-data';
import { Place } from '../types';
import PlaceMapContext from './PlaceMapContext';

const PlaceFilters = styled.div`
  display: flex;
  margin: 4rem 0 0.5rem;
  padding: 0.3rem;
`;

const StyledSelect = styled(Select)`
  border: none;
  color: #ffffff;
  font-size: 0.75rem;
  text-transform: uppercase;
`;

const CuisineSelect = styled(StyledSelect)`
  margin-left: 1.7rem;
  flex-grow: 1;
`;

const PriceSelect = styled(StyledSelect)`
  width: 3rem;
`;

const Places = styled.div`
  margin: 0;
  border-top: solid 1px #ffffff;
  border-bottom: solid 1px #ffffff;
  padding: 1rem 0;
  height: 55vh;
`;

const Place = styled.div<{ $isActive: boolean }>`
  display: flex;
  margin: 0;
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  background: ${(props) => { return props.$isActive ? '#404040' : 'none'; }};
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
  font-size: 0.9rem;
  text-align: center;
`;

const PlaceName = styled.span`
  display: block;
  flex-grow: 1;
  padding-left: 0.5rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaceCuisine = styled.span`
  font-family: Lato, sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
`;

const PlacePrice = styled.span`
  width: 3rem;
  font-size: 0.75rem;
  text-align: right;
`;

const PlaceCount = styled.div`
  margin: 0.5rem 0 0;
  font-family: Lato, sans-serif;
  font-size: 0.8rem;
  font-style: italic;
  text-align: right;
`;

const cuisineOptions: Option[] = Object.keys(cuisineMarkerStyleMap).map((cuisine: string): Option => {
  return {
    label: cuisine,
    value: cuisine,
  };
});

const priceOptions: Option[] = [1, 2, 3, 4, 5].map((value: number): Option => {
  return {
    label: '$'.repeat(value), 
    value,
  }
});

const PlaceItem = ({ place, style }: { place: Place, style: React.CSSProperties }) => {
  const { activePlaceId, setActivePlaceId } = useContext(PlaceMapContext);
  const [isActive, setIsActive] = useState(false);
  const placeRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const handleClick = (): void => {
    // We can ignore linting errors as we populate place IDs before use
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion  
    setActivePlaceId(place.id!);
  };

  useEffect((): void => {
    if (activePlaceId === place.id) {
      placeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setIsActive(true);
    }
    else {
      setIsActive(false);
    }
  }, [activePlaceId, place.id]);

  const markerStyle: MarkerStyle = cuisineMarkerStyleMap[place.cuisine];

  return (
    <Place ref={placeRef} $isActive={isActive} style={style} onClick={():void => { handleClick(); }}>
      <PlaceIcon><FontAwesomeIcon icon={markerStyle.icon} fixedWidth /></PlaceIcon>
      <PlaceName>{place.name} <PlaceCuisine>{place.cuisine}</PlaceCuisine></PlaceName> 
      <PlacePrice>{'$'.repeat(place.price)}</PlacePrice>
    </Place>
  )
};

const PlacePanel = memo(function PlacePanel({ places }: { places: Place[] }) {
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(-1);
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  const placeElements: React.ReactNode[] = useMemo((): React.ReactNode[] => {
    return filteredPlaces.map((place: Place): React.ReactNode => {
      return <PlaceItem key={place.id} place={place} />;
    });
  }, [filteredPlaces]);

  const handleCuisineFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCuisineFilter(e.target.value);
  };

  const handlePriceFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPriceFilter(Number.parseInt(e.target.value, 10));
  };

  useEffect((): void => {
    const newPlaces: Place[] = places.filter((place: Place): boolean => {
      if (cuisineFilter !== '' && cuisineFilter !== place.cuisine) {
        return false;
      }

      if (priceFilter !== -1 && priceFilter !== place.price) {
        return false;
      }

      return true;
    });

    setFilteredPlaces(newPlaces);
  }, [cuisineFilter, priceFilter, places]);

  return (
    <>
      <PlaceFilters>
        <CuisineSelect
          name="filter-cuisine"
          defaultOptionLabel="All Cuisines"
          options={cuisineOptions}
          onChange={handleCuisineFilterChange}
        />
        <PriceSelect
          name="filter-price"
          defaultOptionLabel="All"
          defaultOptionValue={-1}
          options={priceOptions}
          onChange={handlePriceFilterChange}
        />
      </PlaceFilters>
      <Places>
        <AutoSizer>
          {({ width, height }: { width: number, height: number }) => (
          <FixedSizeList
              itemCount={placeElements.length}
              itemSize={40}
              height={height}
              width={width}
            >
              {({ index, style }: { index: number, style: React.CSSProperties }) => {
                const place: Place = places[index];
                return <PlaceItem key={place.id} place={place} style={style} />;
              }}
            </FixedSizeList> 
          )}
        </AutoSizer>
      </Places>
      <PlaceCount>
        Displaying {filteredPlaces.length} point{filteredPlaces.length === 1 ? '' : 's'} of interest
      </PlaceCount>
    </>
  );
});

export default PlacePanel;
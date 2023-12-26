import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Map, useMapsLibrary } from '@vis.gl/react-google-maps';

import { Place } from '../types';
import PlaceMapContext from './PlaceMapContext';
import PlaceMarker from './PlaceMarker';

// Points to L'Antica Pizzeria de Michele in Napoli, roughly in the middle of the map
const MAP_CENTER = { lat: 40.8497563, lng: 14.2633002 };

const PlaceMap = ({ places }: { places: Place[] }) => {
  const coreLibrary = useMapsLibrary('core');
  const [activePlaceMarkerId, setActivePlaceMarkerId] = useState('');
  const [placeMarkerElements, setPlaceMarkerElements] = useState<React.ReactNode[]>([]);

  useEffect((): void => {
    if (!coreLibrary) {
      return;
    }

    setPlaceMarkerElements(places.map((place: Place): React.ReactNode => {
      return <PlaceMarker key={uuid()} place={place} />;
    }));
  }, [coreLibrary]);

  return (
    <PlaceMapContext.Provider value={{ activePlaceMarkerId, setActivePlaceMarkerId }}>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string}
        center={MAP_CENTER}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        restriction={{
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
          strictBounds: true,
        }}
        zoom={2.5}
        zoomControl={true}
      >
        {placeMarkerElements}
      </Map>
    </PlaceMapContext.Provider>
  );
};

export default PlaceMap;
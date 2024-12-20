import { Map } from '@vis.gl/react-google-maps';
import { memo } from 'react';

import { Place } from '../types';
import PlaceMarker from './PlaceMarker';

// Points to L'Antica Pizzeria de Michele in Napoli, roughly in the middle of the map
const MAP_CENTER = { lat: 40.8497563, lng: 14.2633002 };

const PlaceMap = memo(function PlaceMap({ places }: { places: Place[] }) {
  const placeMarkerElements: React.JSX.Element[] = places.map((place: Place): React.JSX.Element => {
    return <PlaceMarker key={place.id} place={place} />;
  });

  return (
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
  );
});

export default PlaceMap;
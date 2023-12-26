import { createContext } from 'react';

interface PlaceMapContext {
  activePlaceMarkerId: string,
  setActivePlaceMarkerId: (placeMarkerId: string) => void,
}

const PlaceMapContext = createContext<PlaceMapContext>({
  activePlaceMarkerId: '',
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setActivePlaceMarkerId: (): void => {},
});

export type { PlaceMapContext };
export default PlaceMapContext;
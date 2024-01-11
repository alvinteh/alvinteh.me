import { createContext } from 'react';

interface PlaceMapContext {
  activePlaceId: string;
  setActivePlaceId: (placeId: string) => void;
}

const PlaceMapContext = createContext<PlaceMapContext>({
  activePlaceId: '',
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setActivePlaceId: (): void => {},
});

export type { PlaceMapContext };
export default PlaceMapContext;
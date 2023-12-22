import keyMirror from 'keymirror';

type Continent = 'ASIA' | 'AFRICA_MID_EAST' | 'NORTH_AMERICA' | 'SOUTH_AMERICA' | 'EUROPE';

const Continents: Record<string, Continent> = keyMirror({
  ASIA: null,
  AFRICA_MID_EAST: null,
  NORTH_AMERICA: null,
  SOUTH_AMERICA: null,
  EUROPE: null,
});

interface Dish {
  name: string,
  restaurant: string,
  image: string,
  imageAspectRatio: number,
  dishRef?: React.MutableRefObject<HTMLLIElement | HTMLDivElement>;
  dishInfoRef?: React.MutableRefObject<HTMLDivElement>;
}

export type { Continent, Dish, };
export { Continents, };
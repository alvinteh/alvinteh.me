import keyMirror from 'keymirror';

type Continent = 'ASIA' | 'AFRICA_MID_EAST' | 'NORTH_AMERICA' | 'SOUTH_AMERICA' | 'EUROPE';

const Continents: Record<Continent, Continent> = keyMirror({
  ASIA: null,
  AFRICA_MID_EAST: null,
  NORTH_AMERICA: null,
  SOUTH_AMERICA: null,
  EUROPE: null,
});

interface Dish {
  name: string;
  restaurant: string;
  image: string;
  imageAspectRatio: number;
}

export type { Continent, Dish, };
export { Continents, };
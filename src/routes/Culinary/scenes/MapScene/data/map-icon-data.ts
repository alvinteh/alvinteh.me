import {
  IconDefinition,
  faBagel,
  faBowlChopsticks,
  faBowlChopsticksNoodles,
  faBowlHot,
  faBowlScoops,
  faBurger,
  faCake,
  faCakeSlice,
  faCheeseSwiss,
  faCoffeePot,
  faCookie,
  faCupcake,
  faDrumstick,
  faFalafel,
  faFish,
  faForkKnife,
  faHotdog,
  faIceCream,
  faMartiniGlass,
  faMeat,
  faPancakes,
  faPizzaSlice,
  faPotFood,
  faSandwich,
  faSteak,
  faSushi,
  faTaco,
} from '@fortawesome/pro-solid-svg-icons';

interface MarkerStyle {
  backgroundColor: string;
  icon: IconDefinition;
}

const cuisineMarkerStyleMap: Record<string, MarkerStyle> = {
  'American': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'American Breakfast': {
    backgroundColor: '',
    icon: faCoffeePot,
  },
  'Asian Innovative': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Assorted': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Australian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'BBQ': {
    backgroundColor: '',
    icon: faMeat,
  },
  'Bagels': {
    backgroundColor: '',
    icon: faBagel,
  },
  'Bar': {
    backgroundColor: '',
    icon: faMartiniGlass,
  },
  'Beef Omakase': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'British': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Brunch': {
    backgroundColor: '',
    icon: faCoffeePot,
  },
  'Burger': {
    backgroundColor: '',
    icon: faBurger,
  },
  'Cafe': {
    backgroundColor: '',
    icon: faCake,
  },
  'Cake': {
    backgroundColor: '',
    icon: faCakeSlice,
  },
  'Cape Malay': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Cheese': {
    backgroundColor: '',
    icon: faCheeseSwiss,
  },
  'Chinese': {
    backgroundColor: '',
    icon: faBowlChopsticks,
  },
  'Chops': {
    backgroundColor: '',
    icon: faSteak,
  },
  'Confectionary': {
    backgroundColor: '',
    icon: faCupcake,
  },
  'Cookie': {
    backgroundColor: '',
    icon: faCookie,
  },
  'Dessert': {
    backgroundColor: '',
    icon: faBowlScoops,
  },
  'Eastern European': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'European': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Falafel': {
    backgroundColor: '',
    icon: faFalafel,
  },
  'Fish & Chips': {
    backgroundColor: '',
    icon: faFish,
  },
  'French': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Fried Chicken': {
    backgroundColor: '',
    icon: faDrumstick,
  },
  'Fusion': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'German': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Gyoza': {
    backgroundColor: '',
    icon: faBowlChopsticks,
  },
  'Hot Dog': {
    backgroundColor: '',
    icon: faHotdog,
  },
  'Hungarian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Ice Cream': {
    backgroundColor: '',
    icon: faIceCream,
  },
  'Indian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Indonesian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Innovative': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Italian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Japanese': {
    backgroundColor: '',
    icon: faBowlChopsticks,
  },
  'Japanese Curry': {
    backgroundColor: '',
    icon: faBowlChopsticks,
  },
  'Karaage': {
    backgroundColor: '',
    icon: faBowlChopsticks,
  },
  'Korean': {
    backgroundColor: '',
    icon: faBowlChopsticks,
  },
  'Korean Fusion': {
    backgroundColor: '',
    icon: faBowlChopsticks,
  },
  'Malaysian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Meatballs': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Mexican': {
    backgroundColor: '',
    icon: faTaco,
  },
  'Middle Eastern': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Moroccan': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Nasi Kandar': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Nikkei': {
    backgroundColor: '',
    icon: faSushi,
  },
  'Nordic': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Omurice': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Pad Kra Pow': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Pancakes': {
    backgroundColor: '',
    icon: faPancakes,
  },
  'Pastrami': {
    backgroundColor: '',
    icon: faSandwich,
  },
  'Pizza': {
    backgroundColor: '',
    icon: faPizzaSlice,
  },
  'Ramen': {
    backgroundColor: '',
    icon: faBowlChopsticksNoodles,
  },
  'Schnitzel': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Shabu Shabu/Sukiyaki': {
    backgroundColor: '',
    icon: faBowlHot,
  },
  'Slovakian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Soba': {
    backgroundColor: '',
    icon: faBowlChopsticksNoodles,
  },
  'South African': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'South American': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Southeast Asian': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Spanish': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Steak': {
    backgroundColor: '',
    icon: faSteak,
  },
  'Sukiyaki': {
    backgroundColor: '',
    icon: faPotFood,
  },
  'Sushi': {
    backgroundColor: '',
    icon: faSushi,
  },
  'Swedish': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Taffelspitz': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Tapas': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Thai': {
    backgroundColor: '',
    icon: faForkKnife,
  },
  'Tom Yum Kung': {
    backgroundColor: '',
    icon: faBowlHot,
  },
  'Tonkatsu': {
    backgroundColor: '',
    icon: faMeat,
  },
  'Udon': {
    backgroundColor: '',
    icon: faBowlChopsticksNoodles,
  },
  'Yakiniku': {
    backgroundColor: '',
    icon: faMeat,
  },
  'Yakitori': {
    backgroundColor: '',
    icon: faMeat,
  },
};

(() => {
  const colors: string[] = [
    '#ea5545',
    '#f46a9b',
    '#ef9b20',
    '#edbf33',
    '#ede15b',
    '#bdcf32',
    '#87bc45',
    '#27aeef',
    '#b33dc6',
    '#505050',
  ];

  let i = 0;

  for (const cuisine in cuisineMarkerStyleMap) {
    cuisineMarkerStyleMap[cuisine].backgroundColor = colors[i++];

    if (i === colors.length) {
      i = 0;
    }
  }
})();

export type { MarkerStyle };
export default cuisineMarkerStyleMap;
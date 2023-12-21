import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import keyMirror from 'keymirror';
import { useLayoutEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { PageTitle, ParallaxPageWrapper, ParallaxScreen, pageTransitionDuration } from '../../components/static';
import ScrollPrompt from '../../components/ScrollPrompt';

import FineDiningScreenBackground from './images/screen-finedining.jpg'
import FDDish1Background from './images/finedining-dish-1.png';
import FDDish2Background from './images/finedining-dish-2.png';
import FDDish3Background from './images/finedining-dish-3.png';
import FDDish4Background from './images/finedining-dish-4.png';
import FDDish5Background from './images/finedining-dish-5.png';
import FDDish6Background from './images/finedining-dish-6.png';
import FDDish7Background from './images/finedining-dish-7.png';
import FDDish8Background from './images/finedining-dish-8.png';
import FDDish9Background from './images/finedining-dish-9.png';
import FDDish10Background from './images/finedining-dish-10.png';
import CasualDiningScreenBackground from './images/screen-casualdining.jpg'
import CDDish1Background from './images/casualdining-dish-1.jpg';
import CDDish2Background from './images/casualdining-dish-2.jpg';
import CDDish3Background from './images/casualdining-dish-3.jpg';
import CDDish4Background from './images/casualdining-dish-4.jpg';
import CDDish5Background from './images/casualdining-dish-5.jpg';
import CDDish6Background from './images/casualdining-dish-6.jpg';
import CDDish7Background from './images/casualdining-dish-7.jpg';
import CDDish8Background from './images/casualdining-dish-8.jpg';
import CDDish9Background from './images/casualdining-dish-9.jpg';
import CDDish10Background from './images/casualdining-dish-10.jpg';
import CDDish11Background from './images/casualdining-dish-11.jpg';
import CDDish12Background from './images/casualdining-dish-12.jpg';
import CDDish13Background from './images/casualdining-dish-13.jpg';
import CDDish14Background from './images/casualdining-dish-14.jpg';
import CDDish15Background from './images/casualdining-dish-15.jpg';
import CDDish16Background from './images/casualdining-dish-16.jpg';
import CDDish17Background from './images/casualdining-dish-17.jpg';
import CDDish18Background from './images/casualdining-dish-18.jpg';
import CDDish19Background from './images/casualdining-dish-19.jpg';
import CDDish20Background from './images/casualdining-dish-20.jpg';
import DrinksScreenBackground from './images/screen-drinks.jpg'
import CookScreenBackground from './images/screen-cook.jpg'
import CookDishesBackground from './images/cook-note.png';
import CookDish1Background from './images/cook-dish-1.png';
import CookDish2Background from './images/cook-dish-2.png';
import CookDish3Background from './images/cook-dish-3.png';
import CookDish4Background from './images/cook-dish-4.png';
import CookDish5Background from './images/cook-dish-5.png';
import CookDish6Background from './images/cook-dish-6.png';
import CookDish7Background from './images/cook-dish-7.png';
import CookDish8Background from './images/cook-dish-8.png';
import CookDish9Background from './images/cook-dish-9.png';
import CookDish10Background from './images/cook-dish-10.png';
import CookDish11Background from './images/cook-dish-11.png';
import CookDish12Background from './images/cook-dish-12.png';
import CookDish13Background from './images/cook-dish-13.png';
import CookDish14Background from './images/cook-dish-14.png';

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

const revealAnimation = keyframes`
  0% {
    filter: blur(0.5rem);
    opacity: 0;
    transform: scale(0.95);
  }
  
  100% {
    filter: blur(0);
    opacity: 1;
    transform: scale(1);
  }
`;

const changeTextColorAnimation = keyframes`
  0% {
    color: rgba(255, 255, 255, 0);
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0);
  }

  100% {
    color: rgba(255, 255, 255, 1);
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
`;

const Quote = styled.blockquote`
  position: relative;
  top: 25vh;
  margin: 0 5% 0 auto;
  max-width: 60rem;
  text-align: right;
`;

const QuoteText = styled.div`
  margin: 0 0 1rem;
  font-family: 'Crimson Text', serif;
  font-size: 5.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

  &::before {
    content: open-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 0}ms both;
  }

  &::after {
    position: absolute;
    content: close-quote;
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 7}ms both;
  }

  & span:nth-child(1) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 0}ms both;
  }

  & span:nth-child(2) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 1}ms both;
  }

  & span:nth-child(3) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 2}ms both;
  }

  & span:nth-child(4) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 3}ms both;
  }

  & span:nth-child(5) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 4}ms both;
  }

  & span:nth-child(6) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 5}ms both;
  }

  & span:nth-child(7) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 6}ms both;
  }

  & span:nth-child(8) {
    animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 400 + 200 * 7}ms both;
  }
`;

const QuoteAuthor = styled.div`
  font-family: Lato, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  animation: ${revealAnimation} 1200ms ease-in-out ${pageTransitionDuration + 2500}ms 1 backwards,
  ${changeTextColorAnimation} 1200ms ease-in-out ${pageTransitionDuration + 2500}ms 1 backwards;
`;

const FDHeader = styled.h3`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  color: #404040;
  font-family: 'Crimson Text', serif;
  font-size: 3rem;
  font-weight: 600;
  opacity: 1;
  text-align: center;

  & > span {
    display: block;
  }
`;

const FDDish = styled.li<{ $backgroundImage: string }>`
  position: absolute;
  bottom: -45vh;
  left: 50%;
  margin-top: -22.5vh;
  margin-left: -22.5vh;
  width: 45vh;
  height: 45vh;
  background-image: url(${(props) => { return props.$backgroundImage; }});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const FDDishInfo = styled.div`
  position: relative;
  top: 100%;
  margin: 50px auto 0;
  font-family: 'Crimson Text', serif;
  font-size: 1.4rem;
  text-align: center;
  text-transform: lowercase;
  opacity: 1;
`;

const FDDishName = styled.p`
  color: #606060;
  font-style: italic;
`;

const FDDishRestaurant = styled.h4`
  margin: 0;
  color: #303030;
  font-weight: 600;
`;

const fdDishesFull: Record<string, Dish[]> = {
  [Continents.ASIA]: [
    {
      name: 'Tender coconut kushiyaki, smoked Nilgiri spices, yuzu rasam',
      restaurant: 'Tresind Studio',
      image: FDDish5Background,
      imageAspectRatio: 1,
    },
    {
      name: 'River Prawn with pork belly jam, shrimp paste and organic rice',
      restaurant: 'Le Du',
      image: FDDish10Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.AFRICA_MID_EAST]: [
    {
      name: 'Tuna la colombe',
      restaurant: 'La Colombe',
      image: FDDish2Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Shish barak a la gyoza',
      restaurant: 'Orfali Bros Bistro',
      image: FDDish7Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.NORTH_AMERICA]: [
    {
      name: '(Unknown dish name)',
      restaurant: 'Eleven Madison Park',
      image: FDDish4Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Hokkaido uni toast with black truffle',
      restaurant: 'Chef\'s Table at Brooklyn Fare',
      image: FDDish8Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.SOUTH_AMERICA]: [
    {
      name: 'Lamb olluco sheep\'s milk',
      restaurant: 'Central',
      image: FDDish3Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Beetroot leaves wilted on murra miso and duck aged on bees wax',
      restaurant: 'Borago',
      image: FDDish9Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.EUROPE]: [
    {
      name: 'Fried marigold flowers with egg yolk and whisky sauce',
      restaurant: 'Noma',
      image: FDDish1Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Candele macaroni with black truffle, artichoke and duck foie gras, rocket juice and Parmesan cheese',
      restaurant: 'Epicure',
      image: FDDish6Background,
      imageAspectRatio: 1,
    },
  ],
};

const CasualDiningHeader = styled.h3`
  position: relative;
  top: 30vh;
  color: #ffffff;
  opacity: 1;
  text-align: center;

  & > span {
    display: block;
  }
`;

const CasualDiningHeaderS1 = styled.span`
  margin: 0 0 0.25rem;
  font-family: Lato, sans-serif;
  font-size: 8rem;
  font-weight: 900;
  line-height: 8rem;
  text-transform: uppercase;
`;

const CasualDiningHeaderS2 = styled.span`
  margin: 0 0 0.25rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 2.5rem;
`;

const CasualDiningHeaderS3 = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  font-weight: 600;
  line-height: 4rem;
`;

const CDDishes = styled.ul`
  display: flex;
  position: relative;
  margin: calc(-50px - 9vw) 0 0;
  padding: 0;
  flex-wrap: wrap;
  width: calc(72vw + 80px);
  height: 54vw;
  list-style: none;
`;

const CDDish = styled.li<{ $backgroundImage: string, $aspectRatio: number, $jitterY: number, $rotation: number }>`
  position: relative;
  top: ${(props) => { return props.$jitterY; }}rem;
  margin: -80px 0 0;
  border: solid 10px #ffffff;
  border-bottom-width: 50px;
  padding: 0;
  width: 18vw;
  height: ${(props) => { return Math.round(props.$aspectRatio * 18); }}vw;
  background-image: url(${(props) => { return props.$backgroundImage; }});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 3px 3px 3px #303030;
  transform: rotate(${(props) => { return props.$rotation; }}deg);
`;

const CDDishInfo = styled.div`
  position: relative;
  top: 100%;
  margin: 5px auto 0;
  font-size: 1.1rem;
  text-align: center;
  opacity: 1;
`;

const CDDishName = styled.p`
  font-family: Caveat, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: #303030;
`;

const CDDishRestaurant = styled.h4`
  margin: 0;
  color: #404040;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CasualDiningEndHeader = styled.h3`
  position: relative;
  top: 35vh;
  color: #ffffff;
  opacity: 1;
  text-align: center;
  font-family: Lato, sans-serif;
  font-size: 8rem;
  font-weight: 900;
  line-height: 8rem;
  text-transform: uppercase;
`;

const cdDishesFull: Record<string, Dish[]> = {
  [Continents.ASIA]: [
    {
      name: 'Tom Yum Goong',
      restaurant: 'Jeh O Chula',
      image: CDDish1Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Egg and plain parantha',
      restaurant: 'Moolchand Parantha',
      image: CDDish2Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Tantanmen',
      restaurant: 'Nakiryu',
      image: CDDish3Background,
      imageAspectRatio: 1.33,
    },
    {
      name: 'Nasi Kandar',
      restaurant: 'Nasi Kandar Pelita',
      image: CDDish4Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Assorted Tempura & Udon',
      restaurant: 'Shin Udon',
      image: CDDish5Background,
      imageAspectRatio: 1.33,
    }
  ],
  [Continents.NORTH_AMERICA]: [
    {
      name: 'Ribs, Pulled Pork and Brisket',
      restaurant: 'Dinosaur Bar-B-Que',
      image: CDDish6Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Emmy Burger',
      restaurant: 'Emily Pizza',
      image: CDDish7Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Sage Fried Chicken  Waffles',
      restaurant: 'Hash House A Go-Go',
      image: CDDish8Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Nashville Hot Chicken',
      restaurant: 'Hattie B\'s',
      image: CDDish9Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Everything Bagel w/ Lox',
      restaurant: 'Russ & Daughters',
      image: CDDish10Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.SOUTH_AMERICA]: [
    {
      name: 'Sopa Criolla',
      restaurant: 'Morena',
      image: CDDish11Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Milanesa de Ternera con Fritas',
      restaurant: 'Pietro\'s Cafe',
      image: CDDish12Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Lomo Saltado',
      restaurant: 'The Coffee Maker',
      image: CDDish13Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Cordero Classico',
      restaurant: 'Isabel Cocina al Disco',
      image: CDDish14Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Ceviche de Pescado',
      restaurant: 'Osso San Isidro',
      image: CDDish15Background,
      imageAspectRatio: 0.75,
    }, 
  ],
  [Continents.EUROPE]: [
    {
      name: 'Kaiserschmarren',
      restaurant: 'Heindls Schmarren & Palatschinkenkuchl',
      image: CDDish16Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Scheinshaxe',
      restaurant: 'Hofbrau Haus',
      image: CDDish17Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Magherita',
      restaurant: ' L\'Antica Pizzeria Da Michele',
      image: CDDish18Background,
      imageAspectRatio: 1.33,
    },
    {
      name: 'Steak Frites',
      restaurant: 'Le Relais de l\'Entrecôte',
      image: CDDish19Background,
      imageAspectRatio: 1,
    },
    {
      name: '(Unknown tapas)',
      restaurant: 'Sala de Despiece',
      image: CDDish20Background,
      imageAspectRatio: 1.33,
    },
  ],
};

const CookHeader1 = styled.svg`
  position: absolute;
  top: 40vh;
  left: 50%;
  margin-left: -15vw;
  width: 30vw;
`;

const CookHeader2 = styled.svg`
  position: absolute;
  top: 40vh;
  left: 50%;
  margin-left: -30vw;
  width: 60vw;
`;

const CookDishes = styled.ul`
  position: absolute;
  top: 38vh;
  right: 1.5vw;
  margin: 0;
  padding: 5vw 2vw 1vw;
  width: 16vw;
  height: 15vw;
  background: url(${CookDishesBackground}) center/cover no-repeat;
  list-style: none;
`;

const CookDish = styled.li`
  height: 1.8rem;

  &:nth-child(1) {
    margin-left: 0.2rem;
  }

  &:nth-child(2) {
    margin-left: 0.4rem;
  }

  &:nth-child(3) {
    margin-left: 0.6rem;
  }

  &:nth-child(4) {
    margin-left: 0.8rem;
  }

  &:nth-child(5) {
    margin-left: 1rem;
  }
`;

const CookDishName = styled.div`
  display: inline-block;
  position: relative;
  color: #202020;
  font-family: Caveat, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4rem;
  transform: rotate(-7deg);

  &::before {
    content: "- ";
  }

  &::after {
    display: block;
    position: absolute;
    top: 50%;
    left: 1rem;
    width: calc(100% - 1rem);
    height: 2px;
    background: #202020;
    content: "";
    transform: scale(var(--lineScale, 0));
    transform-origin: 0 0;
  }
`;

const CookDishImage = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  top: 50%;
  left: -100%;
  margin-top: -34vh;
  margin-left: -31vh;
  width: 62vh;
  height: 62vh;
  background-image: url(${(props) => { return props.$backgroundImage; }});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const cookDishesFull: Dish[] = [
    {
      name: 'Steak w/ Roast Potatoes',
      restaurant: '',
      image: CookDish1Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Pappardelle Bolognese',
      restaurant: '',
      image: CookDish2Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Garlic Butter Tortellini',
      restaurant: '',
      image: CookDish3Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Tortellini en Brodo',
      restaurant: '',
      image: CookDish4Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Carbonara',
      restaurant: '',
      image: CookDish5Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Pasta all\'Arrabbiata',
      restaurant: '',
      image: CookDish6Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Gyro over Rice',
      restaurant: '',
      image: CookDish7Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Ayam Pelalah',
      restaurant: '',
      image: CookDish8Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Lasagna',
      restaurant: '',
      image: CookDish9Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Pad Kra Pao',
      restaurant: '',
      image: CookDish10Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Chicken Curry',
      restaurant: '',
      image: CookDish11Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Omu Rice',
      restaurant: '',
      image: CookDish12Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Tonkotsu',
      restaurant: '',
      image: CookDish13Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Gyudon',
      restaurant: '',
      image: CookDish14Background,
      imageAspectRatio: 1,
    },
];

const randomize = (): number => {
  return Math.random() > 0.5 ? 1 : -1;
};

// We can ignore the linting errors as this is meant to take a generic array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRandomElements = (array: any[], number: number): any[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = new Array(number);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taken: any[] = new Array(number);
  let length: number = array.length;

  for (let i = 0; i < number; i++) {
      const x: number = Math.floor(Math.random() * length);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      result[i] = array[x in taken ? taken[x] : x];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      taken[x] = --length in taken ? taken[length] : length;
  }

  return result;
};

const Culinary = () => {
  // Screen refs
  const screen1Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const screen2Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const screen3Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const screen5Ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  // Fine dining screen refs and nodes
  const fdExploreTextRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const fdClosureTextRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  let fdDishElements: React.ReactNode[];

  // Casual dining screen refs and nodes
  const cdHeaderS1Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const cdHeaderS2Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const cdHeadS3Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const cdEndOverlayRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const cdEndHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  let cdDishElements: React.ReactNode[];

  // Drink screen refs and nodes
  // (WIP)

  // Cook screen refs and nodes
  const cookHeader1Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const cookHeader2Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const cookDishesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  let cookDishElements: React.ReactNode[];

  // Generic code
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

  // Fine dining screen code
  const screen1Animation = ((): () => void => {
    // Fine dining screen data
    const fdDishes: Dish[] = [];

    for (const continent of Object.keys(fdDishesFull)) {
      const continentDishes: Dish[] = fdDishesFull[continent];
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fdDishes.push(...getRandomElements(continentDishes, 1));
    }

    for (const fdDish of fdDishes) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fdDish.dishRef = useRef<HTMLLIElement>() as React.MutableRefObject<HTMLLIElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fdDish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }

    fdDishes.sort(randomize);

    // Fine dining screen React nodes
    fdDishElements = fdDishes.map((dish: Dish): React.ReactNode => {
      return (
        <FDDish
          ref={dish.dishRef as React.MutableRefObject<HTMLLIElement>}
          key={dish.restaurant}
          $backgroundImage={dish.image}
        >
          <FDDishInfo ref={dish.dishInfoRef}>
            <FDDishName>{dish.name}</FDDishName>
            <FDDishRestaurant>{dish.restaurant}</FDDishRestaurant>
          </FDDishInfo>
        </FDDish>
      );
    });

    // Fine dining screen animation
    return (): void => {
      const fdExploreTextLineElements = fdExploreTextRef.current.children;
      
      const fdTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: screen1Ref.current,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${fdDishes.length * 300 + 7 * 150}`,
          markers: true,
        }
      });

      for (let i = 0, length = fdExploreTextLineElements.length; i < length; i++) {
        fdTimeline.from(fdExploreTextLineElements[i], {
            filter: 'blur(4rem)',
            opacity: 0,
            transform: 'scale(0.95) translate3d(0, 30px, 0)',
            duration: 1,
        });
      }

      fdTimeline.to(fdExploreTextLineElements, { transform: 'translate3d(0, -40vh, 0)', duration: 1, });

      fdDishes.forEach((dish: Dish): void => {
        // We can ignore the linting errors as the references will always exist 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dishElement = dish.dishRef!.current;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dishInfoElement = dish.dishInfoRef!.current;

        fdTimeline
        .to(dishElement, { transform: 'translate3d(0, -72vh, 0)', duration: 1, })
        .from(dishInfoElement, { filter: 'blur(2rem)', opacity: 0, transform: 'scale(0.95)', duration: 1, })
        .to(dishInfoElement, { opacity: 0, duration: 1, })
        .to(dishElement, { transform: 'translate3d(0, -145vh, 0)', duration: 1, });  
      });


      fdTimeline.from(fdClosureTextRef.current, {
        // Do nothing to simulate a pause
        duration: 1,
      });

      for (let i = 0, length = fdExploreTextLineElements.length; i < length; i++) {
        fdTimeline.to(fdExploreTextLineElements[i], {
            filter: 'blur(4rem)',
            opacity: 0,
            transform: 'translate3d(0, -50vh, 0)',
            duration: 1,
        });
      }

      fdTimeline.from(fdClosureTextRef.current, {
        filter: 'blur(4rem)',
        opacity: 0,
        transform: 'scale(0.95) translate3d(0, 30px, 0)',
        duration: 1,
      });
    }
  })();
 
  // Casual dining screen code
  const screen2Animation = ((): () => void => {
    // Casual dining screen data
    const cdDishes: Dish[] = [];

    for (const continent of Object.keys(cdDishesFull)) {
      const continentDishes: Dish[] = cdDishesFull[continent];
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      cdDishes.push(...getRandomElements(continentDishes, 3));
    }

    for (const cdDish of cdDishes) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      cdDish.dishRef = useRef<HTMLLIElement>() as React.MutableRefObject<HTMLLIElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      cdDish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }

    cdDishes.sort(randomize);

    // Casual dining screen React nodes
    cdDishElements = cdDishes.map((dish: Dish): React.ReactNode => {
      return (
        <CDDish
          ref={dish.dishRef as React.MutableRefObject<HTMLLIElement>}
          key={dish.restaurant}
          $backgroundImage={dish.image}
          $aspectRatio={dish.imageAspectRatio}
          $jitterY={Math.round(Math.random() * 10) / 10}
          $rotation={-25 + Math.round(Math.random() * 10) * 5}
        >
          <CDDishInfo ref={dish.dishInfoRef}>
            <CDDishName>{dish.name}</CDDishName>
            <CDDishRestaurant>{dish.restaurant}</CDDishRestaurant>
          </CDDishInfo>
        </CDDish>
      );
    });

    // Casual dining screen animation
    return (): void => {      
      const cdTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: screen2Ref.current,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${cdDishes.length * 300 + 4 * 100}`,
          markers: true,
        }
      });

      cdTimeline.from(cdHeaderS1Ref.current, {
        filter: 'blur(1.5rem)',
        opacity: 0,
        transform: 'scale(0.05)',
        ease: 'back.out(1)',
        duration: 1,
      });

      cdTimeline.from(cdHeaderS2Ref.current, {
        filter: 'blur(1.5rem)',
        opacity: 0,
        transform: 'scale(0.05)',
        ease: 'back.out(1)',
        duration: 1,
      });

      cdTimeline.from(cdHeadS3Ref.current, {
        filter: 'blur(1.5rem)',
        opacity: 0,
        transform: 'scale(0.05)',
        ease: 'back.out(1)',
        duration: 1,
      });

      for (const cdDish of cdDishes) {
        // We can ignore the linting errors as the references will always exist 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cdTimeline.from(cdDish.dishRef!.current, {
          y: '-=130vh',
          rotation: 900 + Math.round(Math.random() * 540) * (Math.random() >= 0.5 ? 1 : 1),
          ease: 'power1.out',
          duration: 1,
        });
      }

      cdTimeline.from(cdEndOverlayRef.current, {
        // Do nothing to simulate a "pause"
        duration: 1,
      });

      cdTimeline.from(cdEndOverlayRef.current, {
        background: 'rgba(0, 0, 0, 0)',
        ease: 'power1.out',
        duration: 1,
      });

      cdTimeline.from(cdEndHeaderRef.current, {
        filter: 'blur(1.5rem)',
        opacity: 0,
        transform: 'scale(0.05)',
        ease: 'back.out(1)',
        duration: 1,
      }, '<');
    }
  })();

  const screen5Animation = ((): () => void => {
    // Cook screen data
    const cookDishes: Dish[] = getRandomElements(cookDishesFull, 5) as Dish[];

    for (const cookDish of cookDishes) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      cookDish.dishRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      cookDish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }

    cookDishes.sort(randomize);

    // Cook screen React nodes
    cookDishElements = cookDishes.map((dish: Dish): React.ReactNode => {
      return (
        <CookDish
          key={dish.name}
        >
          <CookDishName ref={dish.dishInfoRef}>{dish.name}</CookDishName>
          <CookDishImage ref={dish.dishRef as React.MutableRefObject<HTMLDivElement>} $backgroundImage={dish.image} />
        </CookDish>
      );
    });

    // Cook screen animation
    return (): void => {      
      const cookTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: screen5Ref.current,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${cookDishes.length * 300 + 4 * 100}`,
          markers: true,
        }
      });

      for (const path of cookHeader1Ref.current.children) {
        cookTimeline.fromTo(path, {
          drawSVG: '0%',
        },
        {
          drawSVG: '100%',
          duration: 0.5,
        });
      }

      cookTimeline.to(cookHeader1Ref.current.children, {
        opacity: 0,
        ease: 'back.out(1)',
        duration: 4,
      });

      for (const path of cookHeader2Ref.current.children) {
        cookTimeline.fromTo(path, {
          drawSVG: '0%',
        },
        {
          drawSVG: '100%',
          duration: 0.5,
        });
      }

      cookTimeline.to(cookHeader2Ref.current.children, {
        opacity: 0,
        ease: 'back.out(1)',
        duration: 4,
      });

      cookTimeline.from(cookDishesRef.current, {
        transform: 'translate3d(30vw, 0, 0)',
        ease: 'power.out',
        duration: 1,
      });

      for (const cookDish of cookDishes) {
        // We can ignore the linting errors as the references will always exist 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cookTimeline.from(cookDish.dishRef!.current, {
          transform: 'translate3d(0, -90vh, 0)',
          ease: 'power1.out',
          duration: 1,
        });

        // We can ignore the linting errors as the references will always exist 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cookTimeline.to(cookDish.dishInfoRef!.current, {
          "--lineScale": 1,
          ease: 'power1.out',
          duration: 1,
        });

        // We can ignore the linting errors as the references will always exist 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cookTimeline.to(cookDish.dishRef!.current, {
          transform: 'translate3d(0, 90vh, 0)',
          ease: 'power1.out',
          duration: 1,
        });
      }
    }
  })();

  useLayoutEffect((): () => void => {
    const ctx = gsap.context(() => {
      screen1Animation();
      screen2Animation();
      screen5Animation();
    });

    return (): void => { ctx.revert() };
  });

  return (
    <ParallaxPageWrapper>
      <ParallaxScreen>
        <PageTitle>Culinary</PageTitle>
        <Quote>
          <QuoteText>
            <span>Food, </span>
            <span>for </span> 
            <span>me, </span> 
            <span>has </span>
            <span>always </span>
            <span>been </span>
            <span>an </span>
            <span>adventure.</span>
          </QuoteText>
          <QuoteAuthor>Anthony Bourdain</QuoteAuthor>
        </Quote>
      </ParallaxScreen>
      <ParallaxScreen
        ref={screen1Ref}
        $backgroundImage={FineDiningScreenBackground}
      >
        <FDHeader ref={fdExploreTextRef}>
          <span>Exploring</span>
          <span>the</span>
          <span>world of flavor</span>
        </FDHeader>
        {fdDishElements}
        <FDHeader ref={fdClosureTextRef}>
          It&apos;s not just all fancy
        </FDHeader>
      </ParallaxScreen>
      <ParallaxScreen
        ref={screen2Ref}
        $backgroundImage={CasualDiningScreenBackground}
      >
        <CasualDiningHeader>
          <CasualDiningHeaderS1 ref={cdHeaderS1Ref}>Casual</CasualDiningHeaderS1>
          <CasualDiningHeaderS2 ref={cdHeaderS2Ref}>is sometimes</CasualDiningHeaderS2>
          <CasualDiningHeaderS3 ref={cdHeadS3Ref}>where the fun&apos;s at</CasualDiningHeaderS3>
        </CasualDiningHeader>
        <CDDishes>
          {cdDishElements}
        </CDDishes>
        <Overlay ref={cdEndOverlayRef}>
          <CasualDiningEndHeader ref={cdEndHeaderRef}>Had enough food?</CasualDiningEndHeader>
        </Overlay>
      </ParallaxScreen>
      <ParallaxScreen
        ref={screen3Ref}
        $backgroundImage={DrinksScreenBackground}
      >
      </ParallaxScreen>
      <ParallaxScreen
        ref={screen5Ref}
        $backgroundImage={CookScreenBackground}
      >
        <CookHeader1
          ref={cookHeader1Ref}
          version="1.1"
          viewBox="0 0 600 110"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={6}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M53.4,11.1c-1.9-4.7-7-7.8-12.1-8.1s-10.1,1.8-14.1,5-7,7.4-9.7,11.8c-8.4,13.7-13.3,29.4-14.4,45.4-.2,3-.2,6.1.6,8.9s2.6,5.6,5.2,7c3.3,1.7,7.4,1,10.9-.2,10.4-3.7,18.9-12.2,22.7-22.5,2-5.5,2.5-12.3-1.4-16.8-4.1.4-8.2.7-12.3,1.1"/>
          <path d="M83.8,5.9c-5,12.4-10,24.7-15,37.1-4.6,11.3-9.2,23.1-8.1,35.3"/>
          <path d="M117.8,42.9c-1.9-1.7-2.1-1.9-5-4s-3-1.9-4.3-2.2c-2.5-.6-4.9,1.2-6.8,2.9-7.7,7.3-13.9,16.2-17.9,26-.6,1.6-1.2,3.3-.7,4.9.7,2,3.1,3.2,5.2,3s4.1-1.3,5.9-2.5c5.7-3.9,10.6-8.9,15.5-13.9,2.7-2.7,6-13.2,8-13.2,2,1-5,16-3,21s6.1,6.3,10.6,7.8"/>
          <path d="M183.4,9.8c-12.2,19.6-19.3,42.3-20.5,65.4.8-6.8,1.5-13.6,2.3-20.3.4-3.2.6-6.8-1.2-9.4-2.2-3.1-6.7-3.7-10.3-2.4s-7.5,4-10,6.8c-5.4,6-9.2,13.1-9.5,21.2,0,2.3.5,4.9,2.5,5.9,2.3,1,4.8-.7,6.8-2.3,6.7-5.7,15.6-13.9,22.2-19.7"/>
          <path d="M215,39.2c1.4.6,2.3,2,2.6,3.5s.2,3,.1,4.5c-.6,7.1-1.1,14.3-1.7,21.4,0,.9,0,2,.8,2.4.8.4,1.8-.3,2.5-.9,8.4-8,16-16.9,22.7-26.4s1-.1.9.4c-4.3,16.8-11.9,32.6-19.5,48.3-2.1,4.4-4.2,8.7-6.4,13.1"/>
          <path d="M274.8,38.9c-2.5.4-6.6,1.6-8.3,3.4-6.1,6.4-10.1,14.7-11.5,23.4-.4,2.7-.4,5.8,1.7,7.6,1.3,1.1,3.2,1.3,4.9.9s5.8-1.3,7.2-2.3c3.7-2.7,7.2-6.3,10-10,1.9-2.5,3.1-4.9,3-8,0-2.5-16.4-8.2-14-9s15.5,3.6,17,0"/>
          <path d="M311.4,37.9c-4.5,6.7-7.7,14.4-9.4,22.3-.4,2.1-.8,4.4-.4,6.5s1.6,4.3,3.6,5.3c1.8.9,4,.8,5.8,0s3.4-2.1,4.9-3.5c7.3-6.9,12.2-16.4,13.6-26.3"/>
          <path d="M407.8,43.9c-1-2-2.7-2.7-5-5s-7.1-2.6-9-2.3c-1.3.2-2.3,1-3.3,1.9-8.6,7.7-15.3,17.5-19.3,28.3-.9,2.3-1.5,5.2.1,7,1.1,1.2,2.9,1.5,4.4,1.1s2.7-1.6,4.3-2.1c12.8-3.9,22.2-25.9,26.8-27.9,3-1.3-2.7,8.8-2.9,12s-.1,6.6,1.2,9.6,6.5,6.4,9.7,6.4"/>
          <path d="M451.4,48.2c1.4-1.4,2.9-2.8,3.9-4.5s1.6-3.7,1.2-5.7c-.6-2.7-3.2-4.7-5.9-5.1s-5.6.4-7.9,1.9-4.9,2.1-6.9,4.1c-2.5,2.5-4.4,3.8-6,7s-3.8,8.9-2,12c1.3,2.2,5.2,4.7,7.4,6.1s5,2.9,6.6,4.9,3.4,3.8,2,6c-1.8,2.9-7.4,4-10.7,3.4-3.7-.6-7.3-1.8-10.7-3.3"/>
          <path d="M490.5,12c-9.9,20.4-18,41.7-24.3,63.6"/>
          <path d="M500.8,37.9c-3.4,7-17.6,9.3-25.3,15.5-3.9,3.2,6,7.3,9.3,11.5,3.4,4.2,6,10,10.5,12.6"/>
          <path d="M515.9,52.8c3.6,2.9,9.4,6.1,13.9,5.1s9.1-7.5,10-12-2.8-9.6-7.3-10.3c-6.9-1-12.9,5.9-16.1,12.1s-5.6,13.2-5.6,20.2c0,2.1,1,5.2,2,7,2,3.7,7.6,4,11.6,2.8s7.2-4.2,10.3-7"/>
          <path d="M600.2,7c-12.2,19.6-19.3,42.3-20.5,65.4.8-6.8,1.5-13.6,2.3-20.3.4-3.2.6-6.8-1.2-9.4-2.2-3.1-6.7-3.7-10.3-2.4s-7.5,4-10,6.8c-5.4,6-9.2,13.1-9.5,21.2,0,2.3.5,4.9,2.5,5.9,2.3,1,4.8-.7,6.8-2.3,6.7-5.7,15.6-13.9,22.2-19.7"/>
        </CookHeader1>
        <CookHeader2
          ref={cookHeader2Ref}
          version="1.1"
          viewBox="0 0 1300 130"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={6}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M46.32,17.09C31.39,35.36,21.01,57.32,16.38,80.45c-0.62,3.1-1.13,6.33-0.34,9.38c1.13,4.38,4.91,7.77,9.2,9.2
            s9.01,1.08,13.36-0.16s8.4-3.33,12.41-5.41"/>
          <path d="M70.44,68.89c6.94,3.97,16.34,3.04,22.37-2.21c2.67-2.33,4.77-5.86,3.94-9.3c-0.91-3.77-5.19-6.02-9.05-5.67
            s-7.28,2.69-10.05,5.4c-5.97,5.85-9.83,13.82-10.72,22.13c-0.34,3.19-0.17,6.69,1.79,9.23c2.52,3.25,7.34,3.93,11.27,2.71
            c3.93-1.22,7.17-3.96,10.3-6.63"/>
          <path d="M107.97,50.05c9.76,1.03,19.64,0.89,29.36-0.43"/>
          <path d="M129.34,32.71c-10.43,14.23-17.99,30.56-22.11,47.71c-0.53,2.21-1,4.57-0.22,6.71c0.83,2.28,3,3.89,5.34,4.53
            c2.34,0.65,4.83,0.45,7.21-0.01c4.76-0.91,9.33-2.87,13.28-5.68"/>
          <path d="M158.2,20.98c1.66-0.85,3.71-1.69,5.29-0.7c1.13,0.71,1.6,2.18,1.47,3.51c-0.12,1.33-0.73,2.56-1.33,3.76
            c-2.39,4.8-4.78,9.6-7.17,14.39"/>
          <path d="M188.2,63.35c1.47-1.58,2.95-3.22,3.8-5.2c0.86-1.98,0.99-4.4-0.17-6.22c-1.35-2.12-4.18-2.92-6.66-2.52
            c-2.48,0.4-4.68,1.8-6.7,3.3c-4.74,3.53-8.92,7.81-12.32,12.64c-1.5,2.13-2.9,4.56-2.73,7.16c0.17,2.55,1.84,4.78,3.83,6.38
            c1.99,1.6,4.32,2.71,6.47,4.11c2.08,1.35,4.9,3.55,5.27,6c0.39,2.64-1.57,3.89-4,5s-5.91,1.95-8.42,1.05
            c-2.51-0.9-4.74-2.43-6.95-3.94"/>
          <path d="M260.52,62.89c2.95-2.62,3.53-7.51,1.27-10.75c-2.93-1.34-6.37-1.53-9.44-0.53c-3.8,1.24-6.8,4.15-9.45,7.14
            c-2.43,2.73-4.83,5.99-4.6,9.64c0.1,1.64,0.74,3.2,1.36,4.72c1.23,2.99,2.46,5.98,3.69,8.97c1.1,2.67,3.97,5.35,2.66,7.92
            c-1.41,2.75-6.92,4.02-9.88,3.14c-2.97-0.88-5.34-3.05-7.6-5.16"/>
          <path d="M276.71,69.64c5.15,1.35,10.61,2.69,15.71,1.17c4.83-1.44,8.77-5.54,10.01-10.42
            c0.39-1.55,0.51-3.27-0.26-4.67c-1.08-1.95-3.47-2.66-5.63-3.2c-1.67-0.42-3.42-0.83-5.09-0.4c-1.34,0.35-2.48,1.21-3.53,2.11
            c-5.73,4.86-10.16,11.23-12.73,18.3c-1.08,2.98-1.84,6.13-1.6,9.29c0.24,3.16,1.58,6.33,4.07,8.28c2.96,2.31,7.16,2.57,10.71,1.37
            s6.54-3.69,9.06-6.47"/>
          <path d="M316.99,69.02c2.77,2.28,6.11,3.86,9.63,4.55c1.88,0.37,3.89,0.48,5.64-0.29c1.64-0.72,2.87-2.12,4.04-3.49
            c1.4-1.63,2.81-3.28,3.8-5.18c0.99-1.91,1.54-4.12,1.1-6.22c-0.71-3.36-3.95-5.82-7.36-6.22c-3.41-0.39-6.84,1.02-9.47,3.22
            c-2.63,2.2-4.55,5.13-6.18,8.15c-1.39,2.56-2.62,5.23-3.5,8.01c-1.38,4.34-1.91,8.95-1.55,13.5c0.16,2.02,0.5,4.07,1.44,5.86
            s2.55,3.32,4.52,3.77c2.11,0.48,4.3-0.31,6.27-1.22c4.38-2.02,8.45-4.7,12.03-7.92"/>
          <path d="M388,54.74c-0.53,10.82-0.16,21.68,1.09,32.43c0.06,0.55,0.15,1.14,0.56,1.51c0.82,0.75,2.11,0.02,2.94-0.72
            c8.77-7.84,15.41-18.05,19.02-29.24c-2.76,8.16-3.48,17-2.09,25.5c0.31,1.87,0.97,4.02,2.76,4.63c1.81,0.61,3.66-0.73,5.04-2.05
            c8.03-7.66,13.74-17.71,16.23-28.52"/>
          <path d="M466.47,23.61c-7.93,14.34-12.41,30.29-16.83,46.07c-1.55,5.54-3.11,11.09-4.66,16.63
            c8.29-10.2,19.04-18.39,31.07-23.68c0.96-0.42,2.01-0.83,3.02-0.56c1.11,0.3,1.87,1.37,2.13,2.49c0.26,1.12,0.11,2.29-0.04,3.42
            c-0.63,4.79-1.27,9.57-1.9,14.36c-0.15,1.14-0.3,2.31-0.03,3.42c0.27,1.12,1.06,2.18,2.17,2.44c1.12,0.26,2.46-0.6,2.41-1.75"/>
          <path d="M526.62,75.16c3.26-3.07,4.39-8.2,2.71-12.35c-1.68-4.15-6.06-7.05-10.53-6.99
            c-7.13,6.03-12.74,13.83-16.18,22.51c-0.73,1.84-1.37,3.76-1.34,5.73c0.03,1.97,0.84,4.03,2.49,5.12c2.79,1.84,6.52,0.29,9.33-1.53
            c4.83-3.13,9.16-7.01,12.79-11.47c0.23,2.74,0.47,5.53,1.56,8.06c1.09,2.52,3.2,4.77,5.9,5.28s5.84-1.25,6.19-3.98"/>
          <path d="M553.75,56.26c9.95,0.44,19.95-0.33,29.72-2.29"/>
          <path d="M573.58,38.32c-7.2,13.19-11.92,27.72-13.85,42.62c-0.38,2.96-0.62,6.15,0.83,8.75
            c1.33,2.38,4.04,3.91,6.76,3.82s5.33-1.81,6.49-4.27"/>
          <path d="M634.03,27.66c13.09-1.4,26.18-2.8,39.26-4.21"/>
          <path d="M655,24c-6.91,21.31-17.22,52.49-24.13,73.8"/>
          <path d="M616.32,96.65c12.44-0.8,24.87-1.6,37.31-2.4"/>
          <path d="M681.4,22.9c0.24-1.39,0.95-2.75,2.15-3.5c1.19-0.75,2.89-0.75,3.94,0.19c1.3,1.17,1.21,3.21,0.9,4.92
            c-1.1,6.16-3.8,12.02-7.76,16.86"/>
          <path d="M684.41,59.77c2.64,9.05,5.29,18.09,7.93,27.14c7.88-6.65,14.68-14.6,20.03-23.42"/>
          <path d="M726.23,69.74c4.23,0.97,8.56,1.89,12.88,1.46c4.32-0.43,8.7-2.43,10.97-6.13c2.27-3.7,1.74-9.2-1.83-11.67
            c-2.28-1.58-5.34-1.7-7.97-0.81c-2.62,0.89-4.85,2.67-6.77,4.67c-5.19,5.42-8.4,12.69-8.91,20.17c-0.21,3.06,0.04,6.22,1.32,9
            s3.73,5.14,6.73,5.77c4.76,0.99,9.23-2.39,12.92-5.55"/>
          <path d="M819.51,23.33c-11.77,20-19.85,42.15-23.73,65.03c1.18-5.85,4.34-11.16,8.23-15.68s8.52-8.35,13.13-12.15
            c2.62-2.16,5.78-4.46,9.08-3.67c2.52,0.6,4.33,2.98,4.89,5.52s0.03,5.18-0.79,7.64c-2.34,7.03-7.25,13.24-13.74,16.8
            s-14.53,4.36-21.47,1.78"/>
          <path d="M849.81,68.05c2.82,3.97,8.15,5.98,12.89,4.86c4.74-1.12,8.61-5.29,9.36-10.11c0.66-4.24-1.62-9.23-5.82-10.11
            c-3.61-0.76-7.11,1.63-9.69,4.26c-6.21,6.33-10.08,14.92-10.7,23.77c-0.27,3.82,0.2,8.04,2.93,10.73
            c2.61,2.57,6.77,3.07,10.27,1.99c3.5-1.08,6.42-3.51,8.94-6.18"/>
          <path d="M882.62,66.64c4.43,2.27,8.96,4.57,13.89,5.3c4.92,0.73,10.4-0.36,13.77-4.03s3.68-10.17-0.16-13.34
            c-3.09-2.55-7.83-2.25-11.26-0.2s-5.79,5.51-7.65,9.05c-2.87,5.44-4.88,11.59-4.06,17.68c0.52,3.84,2.34,7.7,5.65,9.71
            c2.76,1.67,6.38,1.83,9.27,0.41c2.89-1.43,4.97-4.39,5.33-7.6"/>
          <path d="M938.61,54.65c-3.64,8.92-7.29,17.83-10.93,26.75c-0.71,1.73-1.12,4.26,0.6,4.99c1.27,0.54,2.62-0.46,3.63-1.4
            c5.55-5.12,11.09-10.24,16.64-15.36c1.78-1.64,4.31-3.38,6.38-2.13c1.61,0.97,1.84,3.17,1.89,5.05c0.09,3.38,0.18,6.76,0.27,10.14
            c0.04,1.63,0.13,3.39,1.15,4.66c1.02,1.27,3.33,1.58,4.15,0.17"/>
          <path d="M1035.09,65.57c1.75-2.97,1.32-7.05-1.01-9.59c-2.32-2.54-6.35-3.33-9.47-1.86c-2.83,1.34-4.62,4.16-6.08,6.93
            c-3.47,6.62-5.84,13.81-7,21.2c-0.42,2.69-0.6,5.72,1.1,7.85c2.15,2.69,6.29,2.66,9.6,1.68c6.28-1.85,11.78-6.25,14.95-11.98"/>
          <path d="M1070.02,57.11c-2.63,1.31-4.75,3.47-6.63,5.74c-2.93,3.53-5.42,7.41-7.4,11.55c-1.36,2.83-2.5,5.89-2.33,9.03
            s1.9,6.37,4.84,7.48c3.29,1.24,6.94-0.42,9.81-2.43c7.23-5.08,12.55-12.82,14.71-21.4c0.53-2.12,0.88-4.38,0.25-6.48
            C1081.73,55.43,1074.09,55.08,1070.02,57.11z"/>
          <path d="M1114.21,54.81c-7.36,5.3-12.98,12.98-15.82,21.6c-0.73,2.24-1.29,4.58-1.13,6.92s1.13,4.72,2.98,6.17
            c2.71,2.12,6.71,1.81,9.73,0.15c3.01-1.65,5.25-4.4,7.38-7.09c2.41-3.04,4.86-6.26,5.54-10.08s-4.19-9.37-7.9-10.49
            c2.72-0.19,11,0,13-1"/>
          <path d="M1164.05,26.94c-8.12,21.83-16.24,43.66-24.37,65.49"/>
          <path d="M1172.7,54.88c-7.26,6.79-15.66,12.37-24.75,16.42c7.05,7.23,14.1,14.45,21.15,21.68"/>
          <path d="M1194.54,60.83c-2.09,9.51-5.66,18.69-10.53,27.12"/>
          <path d="M1199.62,37.97c-0.3,1.19,0.51,2.55,1.7,2.85c0.64-1.17-0.15-2.86-1.45-3.12"/>
          <path d="M1221.49,54.56c-3.46,9.48-6.92,18.95-10.38,28.43c-0.43,1.17-0.81,2.63,0.04,3.55
            c1.23,1.34,3.42,0.06,4.72-1.21c5.02-4.89,10.04-9.79,15.07-14.68c1.62-1.58,3.87-3.28,5.91-2.31c1.69,0.81,2.12,2.98,2.34,4.84
            c0.43,3.69,0.86,7.38,1.29,11.07c0.16,1.39,0.39,2.91,1.46,3.81c1.07,0.9,3.19,0.43,3.2-0.96"/>
          <path d="M1290.77,65.08c2.03-3.5,0.16-8.39-3.37-10.38c-3.52-1.99-8.08-1.44-11.58,0.58c-3.51,2.01-6.12,5.28-8.28,8.7
            c-2.99,4.74-5.2,11.07-2.06,15.71c3.26,4.83,10.83,4.82,15.65,1.54s7.56-8.77,10.09-14.02c-3.53,12.14-7.06,24.29-10.59,36.43
            c-0.81,2.78-1.64,5.61-3.29,7.98c-1.65,2.37-4.3,4.25-7.19,4.21c-2.65-0.04-5.06-1.67-6.69-3.76c-1.63-2.09-2.59-4.6-3.54-7.07"/>
        </CookHeader2>
        <CookDishes ref={cookDishesRef}>
          {cookDishElements}
        </CookDishes>
      </ParallaxScreen>
      <ScrollPrompt />
    </ParallaxPageWrapper>
  );
};

export default Culinary;
import { gsap } from 'gsap';
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
  dishRef?: React.MutableRefObject<HTMLLIElement>;
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
  font-family: Lato, serif;
  font-size: 1.1rem;
  text-align: center;
  opacity: 1;
`;

const CDDishName = styled.p`
  color: #303030;
  text-transform: lowercase;
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
  const screen1Ref = useRef<HTMLDivElement>();
  const screen2Ref = useRef<HTMLDivElement>();

  // Fine dining screen refs and nodes
  const fdExploreText = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const fdClosureText = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  let fdDishElements: React.ReactNode[];

  // Casual dining screen refs and nodes
  const cdHeaderS1 = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const cdHeaderS2 = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const cdHeaderS3 = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const cdEndOverlay = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const cdEndHeader = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  let cdDishElements: React.ReactNode[];

  // Generic code
  gsap.registerPlugin(ScrollTrigger);

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
          ref={dish.dishRef}
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
      const fdExploreTextLineElements = fdExploreText.current.children;
      
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


      fdTimeline.from(fdClosureText.current, {
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

      fdTimeline.from(fdClosureText.current, {
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
          ref={dish.dishRef}
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

      cdTimeline.from(cdHeaderS1.current, {
        filter: 'blur(1.5rem)',
        opacity: 0,
        transform: 'scale(0.05)',
        ease: 'back.out(1)',
        duration: 1,
      });

      cdTimeline.from(cdHeaderS2.current, {
        filter: 'blur(1.5rem)',
        opacity: 0,
        transform: 'scale(0.05)',
        ease: 'back.out(1)',
        duration: 1,
      });

      cdTimeline.from(cdHeaderS3.current, {
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

      cdTimeline.from(cdEndOverlay.current, {
        // Do nothing to simulate a "pause"
        duration: 1,
      });

      cdTimeline.from(cdEndOverlay.current, {
        background: 'rgba(0, 0, 0, 0)',
        ease: 'power1.out',
        duration: 1,
      });

      cdTimeline.from(cdEndHeader.current, {
        filter: 'blur(1.5rem)',
        opacity: 0,
        transform: 'scale(0.05)',
        ease: 'back.out(1)',
        duration: 1,
      }, '<');
    }
  })();

  useLayoutEffect((): () => void => {
    const ctx = gsap.context(() => {
      screen1Animation();
      screen2Animation();
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
        ref={screen1Ref as React.MutableRefObject<HTMLDivElement>}
        $backgroundImage={FineDiningScreenBackground}
      >
        <FDHeader ref={fdExploreText}>
          <span>Exploring</span>
          <span>the</span>
          <span>world of flavor</span>
        </FDHeader>
        {fdDishElements}
        <FDHeader ref={fdClosureText}>
          It&apos;s not just all fancy
        </FDHeader>
      </ParallaxScreen>
      <ParallaxScreen
        ref={screen2Ref as React.MutableRefObject<HTMLDivElement>}
        $backgroundImage={CasualDiningScreenBackground}
      >
        <CasualDiningHeader>
          <CasualDiningHeaderS1 ref={cdHeaderS1}>Casual</CasualDiningHeaderS1>
          <CasualDiningHeaderS2 ref={cdHeaderS2}>is sometimes</CasualDiningHeaderS2>
          <CasualDiningHeaderS3 ref={cdHeaderS3}>where the fun&apos;s at</CasualDiningHeaderS3>
        </CasualDiningHeader>
        <CDDishes>
          {cdDishElements}
        </CDDishes>
        <Overlay ref={cdEndOverlay}>
          <CasualDiningEndHeader ref={cdEndHeader}>Had enough food?</CasualDiningEndHeader>
        </Overlay>
      </ParallaxScreen>
      <ScrollPrompt />
    </ParallaxPageWrapper>
  );
};

export default Culinary;
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

type Continent = 'ASIA' | 'AFRICA_MID_EAST' | 'NORTH_AMERICA' | 'SOUTH_AMERICA' | 'EUROPE';

const Continents: Record<string, Continent> = keyMirror({
  ASIA: null,
  AFRICA_MID_EAST: null,
  NORTH_AMERICA: null,
  SOUTH_AMERICA: null,
  EUROPE: null,
});

interface FDDish {
  name: string,
  restaurant: string,
  backgroundImage: string,
  dishRef?: React.MutableRefObject<HTMLDivElement>;
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

const ExploreText = styled.h3`
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

const Dish = styled.div<{ $backgroundImage: string }>`
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

const DishInfo = styled.div`
  position: relative;
  top: 100%;
  margin: 50px auto 0;
  font-family: 'Crimson Text', serif;
  font-size: 1.4rem;
  text-align: center;
  text-transform: lowercase;
  opacity: 1;
`;

const DishName = styled.p`
  color: #606060;
  font-style: italic;
`;

const DishRestaurant = styled.h4`
  margin: 0;
  color: #303030;
  font-weight: 600;
`;

const Culinary = () => {
  const screen1Ref = useRef<HTMLDivElement>();
  const fdExploreText = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  const fdDishesFull: Record<string, FDDish[]> = {
    [Continents.ASIA]: [
      {
        name: 'Tender coconut kushiyaki, smoked Nilgiri spices, yuzu rasam',
        restaurant: 'Tresind Studio',
        backgroundImage: FDDish5Background,
      },
    ],
    [Continents.AFRICA_MID_EAST]: [
      {
        name: 'Tuna la colombe',
        restaurant: 'La Colombe',
        backgroundImage: FDDish2Background,
      },
      {
        name: 'Shish barak a la gyoza',
        restaurant: 'Orfali Bros Bistro',
        backgroundImage: FDDish7Background,
      },
    ],
    [Continents.NORTH_AMERICA]: [
      {
        name: '(Unknown dish name)',
        restaurant: 'Eleven Madison Park',
        backgroundImage: FDDish4Background,
      },
      {
        name: 'Hokkaido uni toast with black truffle',
        restaurant: 'Chef\'s Table at Brooklyn Fare',
        backgroundImage: FDDish8Background,
      },
    ],
    [Continents.SOUTH_AMERICA]: [
      {
        name: 'Lamb olluco sheep\'s milk',
        restaurant: 'Central',
        backgroundImage: FDDish3Background,
      }, 
      {
        name: 'Beetroot leaves wilted on murra miso and duck aged on bees wax',
        restaurant: 'Borago',
        backgroundImage: FDDish9Background,
      },
    ],
    [Continents.EUROPE]: [
      {
        name: 'Fried marigold flowers with egg yolk and whisky sauce',
        restaurant: 'Noma',
        backgroundImage: FDDish1Background,
      },
      {
        name: 'Candele macaroni with black truffle, artichoke and duck foie gras, rocket juice and Parmesan cheese',
        restaurant: 'Epicure',
        backgroundImage: FDDish6Background,
      },
    ],
  };

  const fdDishes: FDDish[] = [];

  for (const continent of Object.values(Continents)) {
    const continentDishes: FDDish[] = fdDishesFull[continent];
    fdDishes.push(continentDishes[Math.floor(Math.random() * continentDishes.length)]);
  }

  gsap.registerPlugin(ScrollTrigger);

  for (const fdDish of fdDishes) {
    // We can ignore the linting errors as the elements always exist
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fdDish.dishRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fdDish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  }

  // Shuffle order
  fdDishes.sort(() => (Math.random() > 0.5) ? 1 : -1);

  const fdDishElements: React.ReactNode[] = fdDishes.map((dish: FDDish): React.ReactNode => {
    return (
      <Dish ref={dish.dishRef} key={dish.restaurant} $backgroundImage={dish.backgroundImage}>
        <DishInfo ref={dish.dishInfoRef}>
          <DishName>{dish.name}</DishName>
          <DishRestaurant>{dish.restaurant}</DishRestaurant>
        </DishInfo>
      </Dish>
    );
  });

  useLayoutEffect((): () => void => {
    const ctx = gsap.context(() => {
      const exploreTextLineElements = fdExploreText.current.children;
      
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: screen1Ref.current,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${fdDishes.length * 300 + 3 * 150}`,
          markers: true,
        }
      });

      for (let i = 0, length = exploreTextLineElements.length; i < length; i++) {
        timeline.from(exploreTextLineElements[i], {
            filter: 'blur(4rem)',
            opacity: 0,
            transform: 'scale(0.95) translate3d(0, 30px, 0)'
        });
      }

      timeline.to(exploreTextLineElements, { transform: 'translate3d(0, -40vh, 0)' });

      fdDishes.forEach((dish: FDDish): void => {
        // We can ignore the linting errors as the references will always exist 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dishElement = dish.dishRef!.current;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dishInfoElement = dish.dishInfoRef!.current;

        timeline
        .to(dishElement, { transform: 'translate3d(0, -72vh, 0)' })
        .from(dishInfoElement, { filter: 'blur(2rem)', opacity: 0, transform: 'scale(0.95)' })
        .to(dishInfoElement, { opacity: 0 })
        .to(dishElement, { transform: 'translate3d(0, -145vh, 0)' });  
      });
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
      <ParallaxScreen ref={screen1Ref} $backgroundImage={FineDiningScreenBackground}>
        <ExploreText ref={fdExploreText}>
          <span>Exploring</span>
          <span>the</span>
          <span>world of flavor</span>
        </ExploreText>
        {fdDishElements}
      </ParallaxScreen>
      <ScrollPrompt />
    </ParallaxPageWrapper>
  );
};

export default Culinary;
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { PageWrapper } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { getRandomElements, randomize } from '../../../../utils/ArrayUtils';
import { aspectRatios, screenSizes } from '../../../../utils/ResponsiveUtils';
import { SceneProps } from '../../../../utils/SceneUtils';
import { Continents, Dish } from '../../common';

import SceneBackground from './images/scene-finedining.jpg'
import Dish1Background from './images/finedining-dish-1.png';
import Dish2Background from './images/finedining-dish-2.png';
import Dish3Background from './images/finedining-dish-3.png';
import Dish4Background from './images/finedining-dish-4.png';
import Dish5Background from './images/finedining-dish-5.png';
import Dish6Background from './images/finedining-dish-6.png';
import Dish7Background from './images/finedining-dish-7.png';
import Dish8Background from './images/finedining-dish-8.png';
import Dish9Background from './images/finedining-dish-9.png';
import Dish10Background from './images/finedining-dish-10.png';

const Header = styled.h3`
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

interface DishAttrs {
  $backgroundImage: string;
}

const Dish = styled.li.attrs<DishAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -22.5vh;
  margin-left: -22.5vh;
  width: 45vh;
  height: 45vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const DishInfo = styled.div`
  position: relative;
  top: 100%;
  margin: 10px auto 0;
  font-family: 'Crimson Text', serif;
  font-size: 1.4rem;
  text-align: center;
  text-transform: lowercase;
  opacity: 1;

  @media ${screenSizes.desktopM} {
    margin-top: 50px;
  }
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

const dishData: Record<string, Dish[]> = {
  [Continents.ASIA]: [
    {
      name: 'Tender coconut kushiyaki, smoked Nilgiri spices, yuzu rasam',
      restaurant: 'Tresind Studio',
      image: Dish5Background,
      imageAspectRatio: 1,
    },
    {
      name: 'River Prawn with pork belly jam, shrimp paste and organic rice',
      restaurant: 'Le Du',
      image: Dish10Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.AFRICA_MID_EAST]: [
    {
      name: 'Tuna la colombe',
      restaurant: 'La Colombe',
      image: Dish2Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Shish barak a la gyoza',
      restaurant: 'Orfali Bros Bistro',
      image: Dish7Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.NORTH_AMERICA]: [
    {
      name: '(Unknown dish name)',
      restaurant: 'Eleven Madison Park',
      image: Dish4Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Hokkaido uni toast with black truffle',
      restaurant: 'Chef\'s Table at Brooklyn Fare',
      image: Dish8Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.SOUTH_AMERICA]: [
    {
      name: 'Lamb olluco sheep\'s milk',
      restaurant: 'Central',
      image: Dish3Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Beetroot leaves wilted on murra miso and duck aged on bees wax',
      restaurant: 'Borago',
      image: Dish9Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.EUROPE]: [
    {
      name: 'Fried marigold flowers with egg yolk and whisky sauce',
      restaurant: 'Noma',
      image: Dish1Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Candele macaroni with black truffle, artichoke and duck foie gras, rocket juice and Parmesan cheese',
      restaurant: 'Epicure',
      image: Dish6Background,
      imageAspectRatio: 1,
    },
  ],
};

const FineDiningScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);
  const [dishes, setDishes] = useState<Dish[]>([]);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const exploreTextRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const dishRefs = useRef<HTMLLIElement[]>([]);
  const dishInfoRefs = useRef<HTMLDivElement[]>([]);
  const closureTextRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  // Initialize dish data
  useEffect((): void => {
    const dishes: Dish[] = [];

    for (const continent of Object.keys(dishData)) {
      const continentDishes: Dish[] = dishData[continent];
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dishes.push(...getRandomElements(continentDishes, 1));
    }
  
    randomize(dishes);
    setDishes(dishes);
  }, []);

  // Screen animation
  useGSAP((): void => {
    if (dishes.length === 0) {
      return;
    }

    const exploreTextLineElements = exploreTextRef.current.children;
    
    const timeline = gsap.timeline({});

    for (let i = 0, length = exploreTextLineElements.length; i < length; i++) {
      timeline.from(exploreTextLineElements[i], {
          filter: 'blur(4rem)',
          opacity: 0,
          transform: 'scale(0.95) translate3d(0, 30px, 0)',
          duration: animationDurations.FAST
      });
    }

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    timeline.to(exploreTextLineElements, { transform: 'translate3d(0, -40vh, 0)', duration: animationDurations.MEDIUM });

    for (let i = 0; i < dishes.length; i++) {
      const dishElement: HTMLLIElement = dishRefs.current[i];
      const dishInfoElement: HTMLDivElement = dishInfoRefs.current[i];

      timeline
      .from(dishElement, { y: '72.5vh', duration: animationDurations.MEDIUM })
      .from(dishInfoElement, { filter: 'blur(2rem)', opacity: 0, transform: 'scale(0.95)', duration:
        animationDurations.FAST })

      timeline.addLabel(`scene-${sceneIndex}-dish-${i}`);

      timeline.to(dishInfoElement, { opacity: 0, duration: animationDurations.FAST })
      .to(dishElement, { y: '-72.5vh', duration: animationDurations.MEDIUM });
    }

    for (let i = 0, length = exploreTextLineElements.length; i < length; i++) {
      timeline.to(exploreTextLineElements[i], {
          filter: 'blur(4rem)',
          opacity: 0,
          transform: 'translate3d(0, -50vh, 0)',
          duration: animationDurations.FAST
      });
    }

    timeline.from(closureTextRef.current, {
      filter: 'blur(4rem)',
      opacity: 0,
      transform: 'scale(0.95) translate3d(0, 30px, 0)',
      duration: animationDurations.FAST
    });

    timeline.addLabel(`scene-${sceneIndex}-outro`);

    registerScene(sceneIndex, screenRef, timeline, 'Fine Dining Experiences');
  }, [dishes]);

  const setDishRef = (element: HTMLLIElement): HTMLLIElement => {
    dishRefs.current[dishRefs.current.length] = element;
    return element;
  };

  const setDishInfoRef = (element: HTMLDivElement): HTMLDivElement => {
    dishInfoRefs.current[dishInfoRefs.current.length] = element;
    return element;
  };

  const dishElements: React.ReactNode[] = dishes.map((dish: Dish): React.ReactNode => {
    return (
      <Dish
        ref={setDishRef}
        key={dish.restaurant}
        $backgroundImage={dish.image}
      >
        <DishInfo ref={setDishInfoRef}>
          <DishName>{dish.name}</DishName>
          <DishRestaurant>{dish.restaurant}</DishRestaurant>
        </DishInfo>
      </Dish>
    );
  });

  return (
    <Screen
      innerRef={screenRef}
      backgroundImage={SceneBackground}
    >
      <PageWrapper>
        <Header ref={exploreTextRef}>
          <span>Exploring</span>
          <span>the</span>
          <span>world of flavor</span>
        </Header>
        {dishElements}
        <Header ref={closureTextRef}>
          It&apos;s not just all fancy
        </Header>
      </PageWrapper>
    </Screen>
  );
};

export default FineDiningScene;
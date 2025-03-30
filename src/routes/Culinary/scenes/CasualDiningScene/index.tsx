import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';


import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { Overlay, PaddedPageWrapper } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { getRandomElements, randomize } from '../../../../utils/ArrayUtils';
import { aspectRatios, screenSizes } from '../../../../utils/ResponsiveUtils';
import { SceneProps } from '../../../../utils/SceneUtils';
import { Continents } from '../../common';
import type { Dish } from '../../common';

import SceneBackground from './images/screen-casualdining.jpg'
import Dish1Background from './images/casualdining-dish-1.jpg';
import Dish2Background from './images/casualdining-dish-2.jpg';
import Dish3Background from './images/casualdining-dish-3.jpg';
import Dish4Background from './images/casualdining-dish-4.jpg';
import Dish5Background from './images/casualdining-dish-5.jpg';
import Dish6Background from './images/casualdining-dish-6.jpg';
import Dish7Background from './images/casualdining-dish-7.jpg';
import Dish8Background from './images/casualdining-dish-8.jpg';
import Dish9Background from './images/casualdining-dish-9.jpg';
import Dish10Background from './images/casualdining-dish-10.jpg';
import Dish11Background from './images/casualdining-dish-11.jpg';
import Dish12Background from './images/casualdining-dish-12.jpg';
import Dish13Background from './images/casualdining-dish-13.jpg';
import Dish14Background from './images/casualdining-dish-14.jpg';
import Dish15Background from './images/casualdining-dish-15.jpg';
import Dish16Background from './images/casualdining-dish-16.jpg';
import Dish17Background from './images/casualdining-dish-17.jpg';
import Dish18Background from './images/casualdining-dish-18.jpg';
import Dish19Background from './images/casualdining-dish-19.jpg';
import Dish20Background from './images/casualdining-dish-20.jpg';
import Dish21Background from './images/casualdining-dish-21.jpg';

interface DishAttrs {
  $zIndex: number;
}

interface DishPhotoAttrs {
  $backgroundImage: string;
  $rotation: number;
}

const Header = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  color: #ffffff;
  opacity: 1;
  text-align: center;
  transform: translate3d(-50%, -50%, 0);

  & > span {
    display: block;
  }
`;

const HeaderS1 = styled.span`
  margin: 0 0 0.25rem;
  font-family: Lato, sans-serif;
  font-size: 8rem;
  font-weight: 900;
  line-height: 8rem;
  text-transform: uppercase;

  @media ${screenSizes.phone} {
    font-size: 5rem;
    line-height: 5rem;
  }
`;

const HeaderS2 = styled.span`
  margin: 0 0 0.25rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 2.5rem;

  @media ${screenSizes.phone} {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
`;

const HeaderS3 = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  font-weight: 600;
  line-height: 4rem;

  @media ${screenSizes.phone} {
    font-size: 3rem;
    line-height: 3rem;
  }
`;

const Dishes = styled.ul`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  width: 72vw;
  height: fit-content;
  align-items: center;
  list-style: none;
  transform: translate3d(-50%, -50%, 0);

  @media ${screenSizes.phone} {
    width: 95vw;
  }
`;

const Dish = styled.li.attrs<DishAttrs>(({ $zIndex }) => ({
  style: {
    zIndex: $zIndex,
  }
}))`
  display: flex;
  position: relative;
  margin: 0;
  padding: 0;
  width: 18vw;
  height: 18vw;
  align-items: center;

  @media ${screenSizes.tablet} {
    width: 24vw;
    height: 24vw;
  }

  @media ${screenSizes.phone} {
    width: 31vw;
    height: 31vw;
  }

  @media ${aspectRatios.a21x9} {
    width: 12vw;
    height: 12vw;
  }
`;

const DishPhoto = styled.div.attrs<DishPhotoAttrs>(({ $backgroundImage, $rotation }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
    transform: `translate3d(0, 0, 0) rotate(${$rotation}deg)`
  }
}))<{ $aspectRatio: number }>`
  border: solid 10px #ffffff;
  border-bottom-width: 50px;
  width: 100%;
  height: ${(props) => { return Math.round(props.$aspectRatio * 100); }}%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 3px 3px 3px #303030;
`;

const DishInfo = styled.div`
  position: relative;
  top: 100%;
  margin: 5px auto 0;
  text-align: center;
  opacity: 1;
`;

const DishName = styled.p`
  color: #303030;
  font-family: Caveat, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;

  @media ${screenSizes.tablet} {
    font-size: 1.1rem;
  }

  @media ${screenSizes.phone} {
    font-size: 1rem;
  }
`;

const DishRestaurant = styled.h4`
  margin: 0;
  color: #404040;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;

  @media ${screenSizes.tablet} {
    font-size: 0.75rem;
  }

  @media ${screenSizes.phone} {
    display: none;
  }
`;

const EndHeader = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  color: #ffffff;
  opacity: 1;
  text-align: center;
  font-family: Lato, sans-serif;
  font-size: 8rem;
  font-weight: 900;
  line-height: 8rem;
  text-transform: uppercase;
  transform: translate3d(-50%, -50%, 0);

  @media ${screenSizes.phone} {
    font-size: 6rem;
    line-height: 6rem;
  }
`;

const dishData: Record<string, Dish[]> = {
  [Continents.ASIA]: [
    {
      name: 'Tom Yum Goong',
      restaurant: 'Jeh O Chula',
      image: Dish1Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Egg and plain parantha',
      restaurant: 'Moolchand Parantha',
      image: Dish2Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Tantanmen',
      restaurant: 'Nakiryu',
      image: Dish3Background,
      imageAspectRatio: 1.33,
    },
    {
      name: 'Nasi Kandar',
      restaurant: 'Nasi Kandar Pelita',
      image: Dish4Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Assorted Tempura & Udon',
      restaurant: 'Shin Udon',
      image: Dish5Background,
      imageAspectRatio: 1.33,
    }
  ],
  [Continents.NORTH_AMERICA]: [
    {
      name: 'Ribs, Pulled Pork and Brisket',
      restaurant: 'Dinosaur Bar-B-Que',
      image: Dish6Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Emmy Burger',
      restaurant: 'Emily Pizza',
      image: Dish7Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Sage Fried Chicken  Waffles',
      restaurant: 'Hash House A Go-Go',
      image: Dish8Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Nashville Hot Chicken',
      restaurant: 'Hattie B\'s',
      image: Dish9Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Everything Bagel w/ Lox',
      restaurant: 'Russ & Daughters',
      image: Dish10Background,
      imageAspectRatio: 1,
    },
  ],
  [Continents.SOUTH_AMERICA]: [
    {
      name: 'Sopa Criolla',
      restaurant: 'Morena',
      image: Dish11Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Milanesa de Ternera con Fritas',
      restaurant: 'Pietro\'s Cafe',
      image: Dish12Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Lomo Saltado',
      restaurant: 'The Coffee Maker',
      image: Dish13Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Cordero Classico',
      restaurant: 'Isabel Cocina al Disco',
      image: Dish14Background,
      imageAspectRatio: 1,
    }, 
    {
      name: 'Ceviche de Pescado',
      restaurant: 'Osso San Isidro',
      image: Dish15Background,
      imageAspectRatio: 0.75,
    }, 
  ],
  [Continents.EUROPE]: [
    {
      name: 'Kaiserschmarren',
      restaurant: 'Heindls Schmarren & Palatschinkenkuchl',
      image: Dish16Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Scheinshaxe',
      restaurant: 'Hofbrau Haus',
      image: Dish17Background,
      imageAspectRatio: 0.75,
    },
    {
      name: 'Magherita',
      restaurant: ' L\'Antica Pizzeria Da Michele',
      image: Dish18Background,
      imageAspectRatio: 1.33,
    },
    {
      name: 'Steak Frites',
      restaurant: 'Le Relais de l\'Entrecôte',
      image: Dish19Background,
      imageAspectRatio: 1,
    },
    {
      name: '(Unknown tapas)',
      restaurant: 'Sala de Despiece',
      image: Dish20Background,
      imageAspectRatio: 1.33,
    },
  ],
  [Continents.AFRICA_MID_EAST]: [
    {
      name: 'Koshary',
      restaurant: 'Abou Tarek',
      image: Dish21Background,
      imageAspectRatio: 1,
    },
  ]
};

const CasualDiningScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);
  const [dishes, setDishes] = useState<Dish[]>([]);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerS1Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const headerS2Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const headerS3Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const dishRefs = useRef<HTMLLIElement[]>([]);
  const endOverlayRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const endHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  // Initialize dish data
  useEffect((): void => {
    if (dishes.length !== 0) {
      return;
    }

    const newDishes: Dish[] = [];
    
    for (const continent of Object.keys(dishData)) {
      const continentDishes: Dish[] = dishData[continent];
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      newDishes.push(...getRandomElements(continentDishes, Math.min(continentDishes.length, 3)));
    }
  
    randomize(newDishes);
    // Remove a dish to keep total to 12 (4 continents of 3 dishes and 1 continent (Africa) with 1 dish)
    newDishes.splice(0, 1);
    setDishes(newDishes);
  }, [dishes]);

  // Screen animation
  useGSAP((): void => {
    if (dishes.length === 0) {
      return;
    }

    const timeline = gsap.timeline({});

    timeline.from(headerS1Ref.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      transform: 'scale(0.05)',
      ease: 'back.out(1)',
      duration: animationDurations.FAST,
    });

    timeline.from(headerS2Ref.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      transform: 'scale(0.05)',
      ease: 'back.out(1)',
      duration: animationDurations.FAST,
    });

    timeline.from(headerS3Ref.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      transform: 'scale(0.05)',
      ease: 'back.out(1)',
      duration: animationDurations.FAST,
    });

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    for (let i = 0; i < dishes.length; i++) {
      const dishElement: HTMLLIElement = dishRefs.current[i];

      timeline.from(dishElement, {
        y: '-100dvh',
        yPercent: -100,
        rotation: Math.round(360 + Math.random() * 540) * (Math.random() >= 0.5 ? 1 : -1),
        ease: 'power1.out',
        duration: animationDurations.FAST,
      });
    }

    timeline.addLabel(`scene-${sceneIndex}-dishes`);

    timeline.from(endOverlayRef.current, {
      background: 'rgba(0, 0, 0, 0)',
      ease: 'power1.out',
      duration: animationDurations.FAST,
    });

    timeline.from(endHeaderRef.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      scale: 0.05,
      ease: 'back.out(1)',
      duration: animationDurations.FAST,
    }, '<');

    timeline.addLabel(`scene-${sceneIndex}-outro`);

    registerScene(sceneIndex, screenRef, timeline, 'Casual Dining & Street Food Experiences');
  }, [dishes]);

  const setDishRef = (element: HTMLLIElement): HTMLLIElement => {
    dishRefs.current[dishRefs.current.length] = element;
    return element;
  };

  const dishElements: React.ReactNode[] = useMemo((): React.ReactNode[] => {
    return dishes.map((dish: Dish): React.ReactNode => {
      // Note: the z-index and rotation are deterministic to avoid "jitters" upon scene re-render
      const number: number = dish.name.split('').reduce((previous: number, letter: string): number => {
        return previous + letter.charCodeAt(0);
      }, 0);

      const rotation = (number % 2 === 0 ? 1 : -1) * Math.round(number / 180);

      return (
        <Dish
          ref={setDishRef}
          key={dish.restaurant}
          $zIndex={number}
        >
          <DishPhoto
            $aspectRatio={dish.imageAspectRatio}
            $backgroundImage={dish.image}
            $rotation={rotation}
          >
            <DishInfo>
              <DishName>{dish.name}</DishName>
              <DishRestaurant>{dish.restaurant}</DishRestaurant>
            </DishInfo>
          </DishPhoto>
        </Dish>
      );
    });
  }, [dishes]);

  return (
    <Screen
      innerRef={screenRef}
      backgroundImage={SceneBackground}
    >
      <PaddedPageWrapper>
        <Header>
          <HeaderS1 ref={headerS1Ref}>Casual</HeaderS1>
          <HeaderS2 ref={headerS2Ref}>is sometimes</HeaderS2>
          <HeaderS3 ref={headerS3Ref}>where the fun&apos;s at</HeaderS3>
        </Header>
        <Dishes>
          {dishElements}
        </Dishes>
      </PaddedPageWrapper>
      <Overlay ref={endOverlayRef}>
        <EndHeader ref={endHeaderRef}>It&apos;s not just food</EndHeader>
      </Overlay>
    </Screen>
  );
};

export default CasualDiningScene;
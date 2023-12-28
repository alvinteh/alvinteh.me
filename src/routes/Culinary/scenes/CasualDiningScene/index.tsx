import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styled from 'styled-components';

import { getRandomElements, randomize } from '../../../../utils/ArrayUtils';
import ParallaxScreen from '../../../../components/ParallaxScreen';
import { Overlay } from '../../../../components/static';
import { Continents, Dish } from '../../common';

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

const Header = styled.h3`
  position: relative;
  top: 30vh;
  color: #ffffff;
  opacity: 1;
  text-align: center;

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
`;

const HeaderS2 = styled.span`
  margin: 0 0 0.25rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 2.5rem;
`;

const HeaderS3 = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  font-weight: 600;
  line-height: 4rem;
`;

const Dishes = styled.ul`
  display: flex;
  position: relative;
  margin: calc(-50px - 9vw) 0 0;
  padding: 0;
  flex-wrap: wrap;
  width: calc(72vw + 80px);
  height: 54vw;
  list-style: none;
`;

const Dish = styled.li<{ $backgroundImage: string, $aspectRatio: number, $jitterY: number, $rotation: number }>`
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

const DishInfo = styled.div`
  position: relative;
  top: 100%;
  margin: 5px auto 0;
  font-size: 1.1rem;
  text-align: center;
  opacity: 1;
`;

const DishName = styled.p`
  color: #303030;
  font-family: Caveat, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
`;

const DishRestaurant = styled.h4`
  margin: 0;
  color: #404040;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const EndHeader = styled.h3`
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

const CasualDiningScene = () => {
  // Screen refs and nodes
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerS1Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const headerS2Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const headerS3Ref = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const endOverlayRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const endHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  let dishElements: React.ReactNode[];

  // Screen data
  const dishes: Dish[] = [];

  gsap.registerPlugin(ScrollTrigger);

  // Initialize dish elements
  ((): void => {
    for (const continent of Object.keys(dishData)) {
      const continentDishes: Dish[] = dishData[continent];
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dishes.push(...getRandomElements(continentDishes, Math.min(continentDishes.length, 3)));
    }
  
    for (const Dish of dishes) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      Dish.dishRef = useRef<HTMLLIElement>() as React.MutableRefObject<HTMLLIElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      Dish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }
  
    randomize(dishes);
    // Remove a dish to keep total to 12
    dishes.pop();
  
    dishElements = dishes.map((dish: Dish): React.ReactNode => {
      return (
        <Dish
          ref={dish.dishRef as React.MutableRefObject<HTMLLIElement>}
          key={dish.restaurant}
          $backgroundImage={dish.image}
          $aspectRatio={dish.imageAspectRatio}
          $jitterY={Math.round(Math.random() * 10) / 10}
          $rotation={-25 + Math.round(Math.random() * 10) * 5}
        >
          <DishInfo ref={dish.dishInfoRef}>
            <DishName>{dish.name}</DishName>
            <DishRestaurant>{dish.restaurant}</DishRestaurant>
          </DishInfo>
        </Dish>
      );
    });
  })();

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: `+=${dishes.length * 300 + 4 * 100}`,
      }
    });

    timeline.from(headerS1Ref.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      transform: 'scale(0.05)',
      ease: 'back.out(1)',
      duration: 1,
    });

    timeline.from(headerS2Ref.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      transform: 'scale(0.05)',
      ease: 'back.out(1)',
      duration: 1,
    });

    timeline.from(headerS3Ref.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      transform: 'scale(0.05)',
      ease: 'back.out(1)',
      duration: 1,
    });

    for (const dish of dishes) {
      // We can ignore the linting errors as the references will always exist 
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      timeline.from(dish.dishRef!.current, {
        y: '-=130vh',
        rotation: 900 + Math.round(Math.random() * 540) * (Math.random() >= 0.5 ? 1 : 1),
        ease: 'power1.out',
        duration: 1,
      });
    }

    timeline.from(endOverlayRef.current, {
      // Do nothing to simulate a "pause"
      duration: 1,
    });

    timeline.from(endOverlayRef.current, {
      background: 'rgba(0, 0, 0, 0)',
      ease: 'power1.out',
      duration: 1,
    });

    timeline.from(endHeaderRef.current, {
      filter: 'blur(1.5rem)',
      opacity: 0,
      transform: 'scale(0.05)',
      ease: 'back.out(1)',
      duration: 1,
    }, '<');
  });

  return (
    <ParallaxScreen
      innerRef={screenRef}
      backgroundImage={SceneBackground}
      title="Casual Dining & Street Food Experiences"
    >
      <Header>
        <HeaderS1 ref={headerS1Ref}>Casual</HeaderS1>
        <HeaderS2 ref={headerS2Ref}>is sometimes</HeaderS2>
        <HeaderS3 ref={headerS3Ref}>where the fun&apos;s at</HeaderS3>
      </Header>
      <Dishes>
        {dishElements}
      </Dishes>
      <Overlay ref={endOverlayRef}>
        <EndHeader ref={endHeaderRef}>it's not just food</EndHeader>
      </Overlay>
    </ParallaxScreen>
  );
};

export default CasualDiningScene;
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { randomize } from '../../../../utils/ArrayUtils';
import PageContext from '../../../../utils/PageContext';
import { SceneProps } from '../../../../utils/SceneUtils';
import { aspectRatios, screenSizes } from '../../../../utils/StyleUtils';
import ParallaxScreen from '../../../../components/ParallaxScreen';
import { PageWrapper } from '../../../../components/static';

import SceneBackground from './images/scene-drinks.jpg'
import Drink1Background from './images/drink-1.png';
import Drink2Background from './images/drink-2.png';
import Drink3Background from './images/drink-3.png';
import Drink4Background from './images/drink-4.png';
import Drink5Background from './images/drink-5.png';
import { animationDurations } from '../../../../utils/ParallaxUtils';

interface Drink {
  name: string;
  ingredients: string;
  bar: string;
  image: string;
  drinkRef?: React.MutableRefObject<HTMLDivElement>;
  drinkInfoRef?: React.MutableRefObject<HTMLDivElement>;
}

const DrinksParallaxScreen = styled(ParallaxScreen)`
  background-position: center bottom;
`;

const Header = styled.h3`
  position: absolute;
  top: 35vh;
  right: 5vw;
  width: 55%;
  max-width: 40rem;
  font-family: 'Crimson Text', serif;
  font-size: 4rem;
  font-weight: 600;
  text-align: right;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
`;

const Drinks = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Drink = styled.li`
  position: absolute;
  bottom: 3vh;
  right: 4vw; 
  width: 18vw;
  aspect-ratio: 0.778;

  @media ${screenSizes.tablet} {
    right: 2vw;
    width: 30vw;
  }

  @media ${aspectRatios.a21x9} {
    width: 14vw;
    bottom: 1vh;
    right: 2vw;
  }
`;

const DrinkImage = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => { return props.$backgroundImage; }});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const DrinkInfo = styled.div`
  position: absolute;
  bottom: 25%;
  right: 105%;
  width: 25rem;
  color: #ffffff;
  font-size: 1.4rem;
  text-align: right;
`;

const DrinkName = styled.span`
  display: block;
  font-family: 'Crimson Text', serif;
  font-weight: 600;
`;

const DrinkIngredients = styled.span`
  display: block;
  margin: 0 0 0.5rem;
  font-family: 'Crimson Text', serif;
  font-size: 1.3rem;
  font-style: italic;
  text-transform: lowercase;
`;

const DrinkBar = styled.span`
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
`;

const drinkData: Drink[] = [
  {
    name: 'Precision Pilot',
    ingredients: 'Tullamore DEW Phoenix, Campari, Combier Pamplemousse Rosé, Lilet Rose, Peychaud\'s Bitters',
    bar: 'Dead Rabbit',
    image: Drink1Background,
  }, 
  {
    name: 'Con el Pisco Seco',
    ingredients: 'Pisco Calavera, Aperol, Chandon sparkling Wine',
    bar: 'Tres Monos',
    image: Drink2Background,
  }, 
  {
    name: 'Unknown Cocktail',
    ingredients: '',
    bar: 'The Art of Duplicity',
    image: Drink3Background,
  }, 
  {
    name: 'Pencillin',
    ingredients: 'Blended Scotch, Lemon Juice, Honey-Ginger Syrup, Islay Single Malt Scotch',
    bar: 'Atlas',
    image: Drink4Background,
  }, 
  {
    name: 'Big Trouble in Oaxaca',
    ingredients: 'Casamigos, Gliffard Pineapple, Midori, Ancho Reyes Verde, Citric Acid Bio, Toschi Simple Syrup',
    bar: 'Drink Kong',
    image: Drink5Background,
  }, 
];

const DrinksScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);
  const [drinks, setDrinks] = useState<Drink[]>([]);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const drinkRefs = useRef<HTMLDivElement[]>([]);
  const drinkInfoRefs = useRef<HTMLDivElement[]>([]);

  // Initialize drink data
  useEffect((): void => {
    const drinks: Drink[] = [...drinkData];

    randomize(drinks);
    setDrinks(drinks);
  }, []);

  // Screen animation
  useGSAP((): void => {
    if (drinks.length === 0) {
      return;
    }

    const wordAnimationCount: number = (headerRef.current.children.length) / 2;

    const timeline = gsap.timeline({ data: { 
      duration: (wordAnimationCount + (drinks.length * 4) + 1) * 150,
    }});

    timeline.from(headerRef.current.children, {
      filter: 'blur(4rem)',
      opacity: 0,
      textShadow: '2px 2px 2px rgba(0, 0, 0, 0)',
      transform: 'scale(0.95) translate3d(0, 30px, 0)',
      duration: headerRef.current.children.length / 2,
      ease: 'power.out',
      stagger: 0.5,
    });

    for (let i = 0; i < drinks.length; i++) {
      const drinkElement: HTMLDivElement = drinkRefs.current[i];
      const drinkInfoElement: HTMLDivElement = drinkInfoRefs.current[i];

      timeline
      .from(drinkElement, { transform: 'translate3d(35vw, 0, 0)', duration: animationDurations.FAST, })
      .from(drinkInfoElement, { filter: 'blur(2rem)', opacity: 0, transform: 'scale(0.95)',
        duration: animationDurations.FAST, })
      .to(drinkElement, { duration: animationDurations.FAST })
      .to(drinkElement, { transform: 'translate3d(35vw, 0, 0)', duration: animationDurations.FAST, })
      .to(drinkInfoElement, { filter: 'blur(2rem)', opacity: 0, transform: 'scale(0.95)',
        duration: animationDurations.FAST, }, '<');
    }

    registerScene(sceneIndex, screenRef, timeline);
  }, [drinks]);

  const setDrinkRef = (element: HTMLDivElement): HTMLDivElement => {
    drinkRefs.current[drinkRefs.current.length] = element;
    return element;
  };

  const setDrinkInfoRef = (element: HTMLDivElement): HTMLDivElement => {
    drinkInfoRefs.current[drinkInfoRefs.current.length] = element;
    return element;
  };
  
  const drinkElements: React.ReactNode[] = drinks.map((drink: Drink): React.ReactNode => {
    return (
      <Drink key={drink.bar}>
        <DrinkImage
          ref={setDrinkRef}
          $backgroundImage={drink.image}
        />
        <DrinkInfo ref={setDrinkInfoRef}>
          <DrinkName>{drink.name}</DrinkName>
          <DrinkIngredients>{drink.ingredients}</DrinkIngredients>
          <DrinkBar>{drink.bar}</DrinkBar>
        </DrinkInfo>
      </Drink>
    );
  });

  return (
    <DrinksParallaxScreen
      innerRef={screenRef}
      backgroundImage={SceneBackground}
      title="Cocktail Bar Experiences"
    >
      <PageWrapper>
        <Header ref={headerRef}>
          <span>Drinks </span>
          <span>play </span>
          <span>an </span>
          <span>equally </span>
          <span>important </span>
          <span>role.</span>
        </Header>
        <Drinks>
          {drinkElements}
        </Drinks>
      </PageWrapper>
    </DrinksParallaxScreen>
  );
};

export default DrinksScene;
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styled from 'styled-components';

import { randomize } from '../../../../utils/ArrayUtils';
import ParallaxScreen from '../../../../components/ParallaxScreen';

import SceneBackground from './images/scene-drinks.jpg'
import Drink1Background from './images/drink-1.png';
import Drink2Background from './images/drink-2.png';
import Drink3Background from './images/drink-3.png';
import Drink4Background from './images/drink-4.png';
import Drink5Background from './images/drink-5.png';

interface Drink {
  name: string;
  ingredients: string;
  bar: string;
  image: string;
  drinkRef?: React.MutableRefObject<HTMLDivElement>;
  drinkInfoRef?: React.MutableRefObject<HTMLDivElement>;
}

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
  right: 5vw; 
  width: 18vw;
  aspect-ratio: 0.778;
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

const DrinksScene = () => {
  // Screen refs and nodes
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  let drinkElements: React.ReactNode[];

  // Screen data
  let drinks: Drink[] = [];

  gsap.registerPlugin(ScrollTrigger);

  // Initialize drink elements
  ((): void => {
    drinks = [...drinkData];

    for (const drink of drinks) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      drink.drinkRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      drink.drinkInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }

    randomize(drinks);
  
    drinkElements = drinks.map((drink: Drink): React.ReactNode => {
      return (
        <Drink key={drink.bar}>
          <DrinkImage
            ref={drink.drinkRef as React.MutableRefObject<HTMLLIElement>}
            $backgroundImage={drink.image}
          />
          <DrinkInfo ref={drink.drinkInfoRef}>
            <DrinkName>{drink.name}</DrinkName>
            <DrinkIngredients>{drink.ingredients}</DrinkIngredients>
            <DrinkBar>{drink.bar}</DrinkBar>
          </DrinkInfo>
        </Drink>
      );
    });
  })();

  // Screen animation
  useGSAP((): void => {  
    const wordAnimationCount: number = (headerRef.current.children.length) / 2;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: `+=${(wordAnimationCount + (drinks.length * 4) + 1) * 150}`,
      }
    });

    timeline.from(headerRef.current.children, {
      filter: 'blur(4rem)',
      opacity: 0,
      textShadow: '2px 2px 2px rgba(0, 0, 0, 0)',
      transform: 'scale(0.95) translate3d(0, 30px, 0)',
      duration: headerRef.current.children.length / 2,
      ease: 'power.out',
      stagger: 0.5,
    });

    for (const drink of drinks) {
      // We can ignore the linting errors as the references will always exist 
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const drinkElement = drink.drinkRef!.current;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const drinkBarElement = drink.drinkInfoRef!.current;

      timeline
      .from(drinkElement, { transform: 'translate3d(30vw, 0, 0)', duration: 1, })
      .from(drinkBarElement, { filter: 'blur(2rem)', opacity: 0, transform: 'scale(0.95)', duration: 1, })
      .to(drinkElement, {})
      .to(drinkElement, { transform: 'translate3d(30vw, 0, 0)', duration: 1, })
      .to(drinkBarElement, { filter: 'blur(2rem)', opacity: 0, transform: 'scale(0.95)', duration: 1, }, '<');
    }
  });

  return (
    <ParallaxScreen
      innerRef={screenRef}
      backgroundImage={SceneBackground}
      title="Cocktail Bar Experiences"
    >
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
    </ParallaxScreen>
  );
};

export default DrinksScene;
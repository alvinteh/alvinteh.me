import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Accordion, { AccordionItem, AccordionItemContent, AccordionItemHeader } from '../../../../components/Accordion';
import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { PageWrapper } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { getRandomElements, randomize } from '../../../../utils/ArrayUtils';
import { aspectRatios, screenSizes } from '../../../../utils/ResponsiveUtils';
import { SceneProps } from '../../../../utils/SceneUtils';
import { Dish } from '../../common';
import { dishData, extraBakeDishData, extraCookDishData } from './data/dish-data';

import SceneBackground from './images/scene-cook.jpg'
import Header1Svg from './images/cook-header-1.svg?react';
import Header2Svg from './images/cook-header-2.svg?react';
import Header3Svg from './images/cook-header-3.svg?react';
import Header4Svg from './images/cook-header-4.svg?react';
import NoteBackground from './images/cook-note.png';
import FaqWrapperBackground from './images/faq-wrapper.png';

interface DishImageAttrs {
  $backgroundImage: string;
}

interface ExtraDishAttrs {
  $backgroundImage: string;
}

const Header1 = styled(Header1Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -15vw;
  width: 30vw;

  @media ${aspectRatios.a21x9}, ${screenSizes.desktopXL} {
    width: 20vw;
    margin-left: -10vw;
  }
`;

const Header2 = styled(Header2Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -30vw;
  width: 60vw;

  @media ${aspectRatios.a21x9}, ${screenSizes.desktopXL} {
    width: 40vw;
    margin-left: -20vw;
  }
`;

const Header3 = styled(Header3Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -15vw;
  width: 30vw;

  @media ${aspectRatios.a21x9}, ${screenSizes.desktopXL} {
    width: 20vw;
    margin-left: -10vw;
  }
`;

const Header4 = styled(Header4Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -17vw;
  width: 34vw;

  @media ${aspectRatios.a21x9}, ${screenSizes.desktopXL} {
    width: 22vw;
    margin-left: -11vw;
  }
`;

const Dishes = styled.ul`
  position: absolute;
  top: 38vh;
  right: 1.5vw;
  margin: 0;
  padding: 5vw 2vw 1vw;
  width: clamp(160px, 16vw, 240px);
  aspect-ratio: 15/16;
  background: url(${NoteBackground}) center/cover no-repeat;
  list-style: none;

  @media ${screenSizes.tablet} {
    padding-top: 6.5vw;
  }

  @media ${screenSizes.desktopS} {
    width: 15vw;
  }

  @media ${screenSizes.desktopM} {
    padding: 5vw 1vw 1vw;
    width: clamp(160px, 16vw, 240px);
  }

  @media ${aspectRatios.a21x9} {
    padding-top: 3vw;
  }
`;

const Dish = styled.li`
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

const DishName = styled.div`
  display: inline-block;
  position: relative;
  color: #202020;
  font-family: Caveat, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.1rem;
  transform: rotate(-7deg);
  white-space: nowrap;

  @media ${screenSizes.desktopS} {
    font-size: 1.1rem;
    line-height: 1.2rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 1.3rem;
    line-height: 1.4rem;
  }

  @media ${screenSizes.desktopL} {
    font-size: 1.4rem;
    line-height: 1.5rem;
  }

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

const DishImage = styled.div.attrs<DishImageAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))`
  position: absolute;
  top: 50%;
  left: calc(100% + 1.5vw - 42vw - 31vh);
  margin-top: -34vh;
  width: 62vh;
  aspect-ratio: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  @media ${screenSizes.tablet} {
    left: calc(100% + 1.5vw - 50vw - 18vh);
    width: 36vh;
    margin-top: -18vh;
  }
`;

const ExtraDishes = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media ${screenSizes.desktopS} ${aspectRatios.a16x19} {
    margin-left: 5vw;
  }
`;

const ExtraDish = styled.li.attrs<ExtraDishAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))`
  position: absolute;
  margin: 0;
  border: solid 10px #ffffff;
  border-bottom-width: calc(10px + 1.6rem);
  padding: 0;
  width: 14vw;
  height: 14vw;
  background-image: url(${(props) => { return props.$backgroundImage; }});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 3px 3px 3px #303030;

  @media ${screenSizes.tablet} {
    width: 20vw;
    height: 20vw;
  }

  @media ${aspectRatios.a21x9} {
    width: 12vw;
    height: 12vw;
  }

  &:nth-child(1) {
    top: 22vh;
    left: 12vw;
    transform: rotate(-8deg);

    @media ${screenSizes.tablet} {
      left: 8vw;
    }
  }

  &:nth-child(2) {
    top: 11vh;
    left: 28vw;
    transform: rotate(-1deg);

    @media ${screenSizes.tablet} {
      top: 16vh;
    }
  }

  &:nth-child(3) {
    top: 18vh;
    left: 44vw;
    transform: rotate(3.5deg);

    @media ${screenSizes.tablet} {
      top: 20vh;
      left: 52vw;
    }
  }

  &:nth-child(4) {
    top: 55vh;
    left: 18vw;
    transform: rotate(-11deg);

    @media ${screenSizes.tablet} {
      left: 9vw;
    }
  }

  &:nth-child(5) {
    top: 50vh;
    left: 35vw;
    transform: rotate(-1deg);

    @media ${screenSizes.tablet} {
      left: 30vw;
    }
  }

  &:nth-child(6) {
    top: 54vh;
    left: 52vw;
    transform: rotate(8deg);
  }
`;

const ExtraDishName = styled.div`
  margin-top: 14vw;
  padding: 0.3rem 0 0.1rem;
  color: #303030;
  font-family: Caveat, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2rem;
  text-align: center;
  white-space: nowrap;

  @media ${screenSizes.tablet} {
    margin-top: 20vw;
  }

  @media ${screenSizes.desktopM} {
    font-size: 1.2rem;
  }

  @media ${screenSizes.desktopL} {
    font-size: 1.4rem;
    line-height: 1.4rem;
  }

  @media ${aspectRatios.a21x9} {
    margin-top: 12vw;
  }
`;

const FaqWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  box-sizing: border-box;
  aspect-ratio: 1460/1760;
  padding: 12% 8.5% 8% 5.5%;
  height: 85%;
  background: url(${FaqWrapperBackground}) top center/cover no-repeat;
  transform: translate3d(-50%, 100%, 0);

  @media ${screenSizes.tablet} {
    top: 35vh;
    padding: 17.5% 12.5% 10% 8.5%;
    height: 65%;
  }

  @media ${screenSizes.desktopM} {
    max-width: 50%;
    height: 65%;    
  }

  @media ${aspectRatios.a21x9} {
    padding: 6% 5% 5% 3%;
  }

  @media ${screenSizes.desktopXL} {
    padding: 10% 7% 5% 4%;
  }
`;

const Faq = styled(AccordionItem)`
  color: #202020;
  font-family: Caveat, sans-serif;
`;

// Note: we set the transforms on child elements to avoid awkward shifts in element position during transitions
const FaqHeader = styled(AccordionItemHeader)`
  transform: rotate(-3.3deg);

  @media ${screenSizes.desktopL} {
    font-size: 1.6rem;
    line-height: 1.8rem;
    min-height: 1.8rem;
  }
`;

// Note: we set the transform origin (and compensating translation) to avoid awkward shifts in element position
// during transitions
const FaqContent = styled(AccordionItemContent)`
  transform: translate3d(0, 1rem, 0) rotate(-3.3deg);
  transform-origin: 0 0;

  @media ${screenSizes.desktopL} {
    transform: translate3d(0, 2rem, 0) rotate(-3.3deg);
    font-size: 1.6rem;
    line-height: 1.8rem;
  }
`;

const CookScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [extraDishes, setExtraDishes] = useState<Dish[]>([]);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const header1Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const header2Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const header3Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const header4Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const faqWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const dishesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const dishRefs = useRef<HTMLDivElement[]>([]);
  const dishInfoRefs = useRef<HTMLDivElement[]>([]);
  const extraDishesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const extraDishRefs = useRef<HTMLLIElement[]>([]);

  gsap.registerPlugin(DrawSVGPlugin);

  // Initialize dish data
  useEffect((): void => {
    const dishes: Dish[] = getRandomElements(dishData, 5) as Dish[];
    let extraDishes: Dish[] = getRandomElements(extraBakeDishData, 3) as Dish[];
    extraDishes = extraDishes.concat(getRandomElements(extraCookDishData, 3) as Dish[]);

    randomize(dishes);
    randomize(extraDishes);

    setDishes(dishes);
    setExtraDishes(extraDishes);
  }, []);

  // Screen animation
  useGSAP((): void => {
    if (dishes.length === 0 || extraDishes.length === 0) {
      return;
    }

    const timeline = gsap.timeline({});

    const isPortrait = window.innerHeight > window.innerWidth;
    
    for (const path of header1Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: animationDurations.XXFAST,
      });
    }

    timeline.to(header1Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: animationDurations.FAST,
    });

    for (const path of header2Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: animationDurations.XXFAST,
      });
    }

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    timeline.to(header2Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: animationDurations.MEDIUM,
    });

    timeline.from(dishesRef.current, {
      transform: 'translate3d(30vw, 0, 0)',
      ease: 'power.out',
      duration: animationDurations.FAST,
    });

    for (let i = 0; i < dishes.length; i++) {
      const dishElement: HTMLDivElement = dishRefs.current[i];
      const dishInfoElement: HTMLDivElement = dishInfoRefs.current[i];

      timeline.from(dishElement, {
        transform: 'translate3d(0, 84vw, 0)',
        ease: 'power1.out',
        duration: animationDurations.MEDIUM,
      });

      timeline.to(dishInfoElement, {
        "--lineScale": 1,
        ease: 'power1.out',
        duration: animationDurations.FAST,
      });

      timeline.addLabel(`scene-${sceneIndex}-dish-${i}`);

      timeline.to(dishElement, {
        transform: 'translate3d(0, -100vh, 0)',
        ease: 'power1.out',
        duration: animationDurations.MEDIUM,
      });
    }

    timeline.to(dishesRef.current, {
      transform: 'translate3d(30vw, 0, 0)',
      ease: 'power.out',
      duration: animationDurations.MEDIUM,
    });

    for (const path of header3Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: animationDurations.XXFAST,
      });
    }

    timeline.addLabel(`scene-${sceneIndex}-break`);

    timeline.to(header3Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: animationDurations.MEDIUM,
    });

    for (let i = 0; i < extraDishes.length; i++) {
      const extraDishElement: HTMLLIElement = extraDishRefs.current[i];

      timeline.from(extraDishElement, {
        top: '105vh', // Leave additional allowance given the rotation
        left: 'calc(50% - 7vw - 10px)',
        ease: 'power1.out',
        duration: animationDurations.FAST,
      });
    }

    timeline.addLabel(`scene-${sceneIndex}-dishes-extra`);

    for (let i = extraDishes.length - 1; i >= 0; i--) {
      const extraDishElement: HTMLLIElement = extraDishRefs.current[i];

      timeline.to(extraDishElement, {
        top: '105vh',
        left: 'calc(50% - 7vw - 10px)',
        transform: 'rotate(0)',
        ease: 'power1.out',
        duration: animationDurations.FAST,
      });
    }

    for (const path of header4Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: animationDurations.XFAST * 0.5,
      });
    }

    timeline.to(header4Ref.current.querySelectorAll('.line1'), {
      opacity: 0,
      duration: animationDurations.FAST,
    });
    
    timeline.to(header4Ref.current, {
      transform: `translate3d(0, -${isPortrait ? 20 : 40}vh, 0)`,
      ease: 'power1.out',
      duration: animationDurations.MEDIUM,
    });

    timeline.to(faqWrapperRef.current, {
      y: '0',
      ease: 'power1.out',
      duration: animationDurations.MEDIUM,
    }, '<');

    timeline.addLabel(`scene-${sceneIndex}-outro`);

    registerScene(sceneIndex, screenRef, timeline, 'Cooks & Bakes');
  }, [dishes, extraDishes]);

  const setDishRef = (element: HTMLDivElement): HTMLDivElement => {
    dishRefs.current[dishRefs.current.length] = element;
    return element;
  };

  const setDishInfoRef = (element: HTMLDivElement): HTMLDivElement => {
    dishInfoRefs.current[dishInfoRefs.current.length] = element;
    return element;
  };

  const setExtraDishRef = (element: HTMLLIElement): HTMLLIElement => {
    extraDishRefs.current[extraDishRefs.current.length] = element;
    return element;
  };

  const dishElements: React.ReactNode[] = dishes.map((dish: Dish): React.ReactNode => {
    return (
      <Dish
        key={dish.name}
      >
        <DishName ref={setDishInfoRef}>{dish.name}</DishName>
        <DishImage ref={setDishRef} $backgroundImage={dish.image} />
      </Dish>
    );
  });

  const extraDishElements: React.ReactNode[] = extraDishes.map((extraDish: Dish): React.ReactNode => {
    return (
      <ExtraDish
        key={extraDish.name}
        ref={setExtraDishRef}
        $backgroundImage={extraDish.image}
      >
        <ExtraDishName>{extraDish.name}</ExtraDishName>
      </ExtraDish>
    );
  });

  return (
    <Screen
      innerRef={screenRef}
      backgroundImage={SceneBackground}
    >
      <PageWrapper>
        <Header1 ref={header1Ref} />
        <Header2 ref={header2Ref} />
        <Dishes ref={dishesRef}>
          {dishElements}
        </Dishes>
        <Header3 ref={header3Ref} />
        <ExtraDishes ref={extraDishesRef}>
          {extraDishElements}
        </ExtraDishes>
        <Header4 ref={header4Ref} />
        <FaqWrapper ref={faqWrapperRef}>
          <Accordion>
            <Faq>
              <FaqHeader>
                How did you get tables at those fancy restaurants?
              </FaqHeader>
              <FaqContent>
                No secrets here, I join the line just like most other people. In many cases, this means visiting a 
                restaurant&apos;s website to check when they release bookings (it&apos;s typically 2 - 3 months) in 
                advance, and scrambling to secure a table once that happens. For some restaurants, I might waitlist a
                whole week (and plan travel accordingly) to increase my chances.
              </FaqContent>
            </Faq>
            <Faq>
              <FaqHeader>
                There&apos;s a cool place you should check out. How can I make suggestions? 
              </FaqHeader>
              <FaqContent>
                I cannot guarantee I&apos;ll visit your suggested places, but let me know via the contact form! In 
                addition,  note that just because I have visited a place does not mean I will recommend it.
              </FaqContent>
            </Faq>
            <Faq>
              <FaqHeader>
                Do you do reviews, endorsements or sponsored content?
              </FaqHeader>
              <FaqContent>
                No, I do not. Food and drink are a hobby, not a career for me. I&apos;m not an influencer either,
                and all of my meals and drinks were paid out of my own pocket.
              </FaqContent>
            </Faq>
            <Faq>
              <FaqHeader>
                We&apos;ve met and I remember you saying you don&apos;t take fruit, vegetables, or seafood?
              </FaqHeader>
              <FaqContent>
                Good catch! But if you remember, I said <em>generally speaking</em>, I do not take fruits, vegetables
                and/or seafood. There are a lot of rules and exceptions (e.g. I take strawberry jam, but I do not eat
                whole strawberries), and it is so complex I often joke that the person who can come up with a ML model
                that accurately predicts what I take/don&apos;t take can win a Nobel prize. And if you are wondering,
                fine dining establishments do not get an automatic pass. I have left whole plates of fruit/etc.
                untouched at 2/3-Michelin starred places. 
              </FaqContent>
            </Faq>
            <Faq>
              <FaqHeader>
                What is your favorite food and drink?
              </FaqHeader>
              <FaqContent>
                Food-wise, it is hard for me to pick a single dish, but I am generally down for a good lasagna. Dishes 
                that are meat and/or cheese heavy (e.g. burgers, BBQ, mac and cheese, carbonara) tend to be among my 
                favorites too. As for drink, my favorite cocktail is the Pencillin, and I also love Paper Planes and 
                Pisco Sours.
              </FaqContent>
            </Faq>
            <Faq>
              <FaqHeader>
                How did you start cooking?
              </FaqHeader>
              <FaqContent>
                I lamented the lack of quality food in my neighborhood, and since dining out all the time would be too 
                costly, decided to put on an apron and try my hand at cooking. I watched a number of YouTube channels
                (<a href="https://www.joshuaweissman.com/" rel="external noreferrer" target="_blank">Joshua Weissman</a>
                is one of my influences) and slowly but surely worked my way into being a better home cook/baker.
                (Trust me, there were a lot of failures I did not post here!)
              </FaqContent>
            </Faq>
          </Accordion>
        </FaqWrapper>
      </PageWrapper>
    </Screen>
  );
};

export default CookScene;
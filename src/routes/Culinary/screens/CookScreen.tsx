import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styled from 'styled-components';

import { getRandomElements, randomize } from '../../../utils/ArrayUtils';
import Accordion, { AccordionItem, AccordionItemContent, AccordionItemHeader } from '../../../components/Accordion';
import { ParallaxScreen } from '../../../components/static';
import { Dish } from '../common';

import ScreenBackground from '../images/screen-cook.jpg'
import Header1Svg from '../images/cook-header-1.svg?react';
import Header2Svg from '../images/cook-header-2.svg?react';
import Header3Svg from '../images/cook-header-3.svg?react';
import Header4Svg from '../images/cook-header-4.svg?react';
import NoteBackground from '../images/cook-note.png';
import FaqWrapperBackground from '../images/faq-wrapper.png';
import Dish1Background from '../images/cook-dish-1.png';
import Dish2Background from '../images/cook-dish-2.png';
import Dish3Background from '../images/cook-dish-3.png';
import Dish4Background from '../images/cook-dish-4.png';
import Dish5Background from '../images/cook-dish-5.png';
import Dish6Background from '../images/cook-dish-6.png';
import Dish7Background from '../images/cook-dish-7.png';
import Dish8Background from '../images/cook-dish-8.png';
import Dish9Background from '../images/cook-dish-9.png';
import Dish10Background from '../images/cook-dish-10.png';
import Dish11Background from '../images/cook-dish-11.png';
import Dish12Background from '../images/cook-dish-12.png';
import Dish13Background from '../images/cook-dish-13.png';
import Dish14Background from '../images/cook-dish-14.png';


const Header1 = styled(Header1Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -15vw;
  width: 30vw;
`;

const Header2 = styled(Header2Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -30vw;
  width: 60vw;
`;

const Header3 = styled(Header3Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -15vw;
  width: 30vw;
`;

const Header4 = styled(Header4Svg)`
  position: absolute;
  top: 35vh;
  left: 50%;
  margin-left: -17vw;
  width: 34vw;
`;

const Dishes = styled.ul`
  position: absolute;
  top: 38vh;
  right: 1.5vw;
  margin: 0;
  padding: 5vw 2vw 1vw;
  width: 16vw;
  height: 15vw;
  background: url(${NoteBackground}) center/cover no-repeat;
  list-style: none;
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

const DishImage = styled.div<{ $backgroundImage: string }>`
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

const FaqWrapper = styled.div`
  position: relative;
  top: 15vh;
  margin: 0 auto;
  box-sizing: border-box;
  aspect-ratio: 1460/1760;
  padding: 12% 8.5% 8% 5.5%;
  height: 85%;
  background: url(${FaqWrapperBackground}) top center/cover no-repeat;
`;

const Faq = styled(AccordionItem)`
  color: #202020;
  font-family: Caveat, sans-serif;
`;

// Note: we set the transforms on child elements to avoid awkward shifts in element position during transitions
const FaqHeader = styled(AccordionItemHeader)`
  transform: rotate(-3.3deg);
`;

// Note: we set the transform origin (and compensating translation) to avoid awkward shifts in element position
// during transitions
const FaqContent = styled(AccordionItemContent)`
  transform: translate3d(0, 1rem, 0) rotate(-3.3deg);
  transform-origin: 0 0;
`;

const dishData: Dish[] = [
    {
      name: 'Steak w/ Roast Potatoes',
      restaurant: '',
      image: Dish1Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Pappardelle Bolognese',
      restaurant: '',
      image: Dish2Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Garlic Butter Tortellini',
      restaurant: '',
      image: Dish3Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Tortellini en Brodo',
      restaurant: '',
      image: Dish4Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Carbonara',
      restaurant: '',
      image: Dish5Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Pasta all\'Arrabbiata',
      restaurant: '',
      image: Dish6Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Gyro over Rice',
      restaurant: '',
      image: Dish7Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Ayam Pelalah',
      restaurant: '',
      image: Dish8Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Lasagna',
      restaurant: '',
      image: Dish9Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Pad Kra Pao',
      restaurant: '',
      image: Dish10Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Chicken Curry',
      restaurant: '',
      image: Dish11Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Omu Rice',
      restaurant: '',
      image: Dish12Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Tonkotsu',
      restaurant: '',
      image: Dish13Background,
      imageAspectRatio: 1,
    },
    {
      name: 'Gyudon',
      restaurant: '',
      image: Dish14Background,
      imageAspectRatio: 1,
    },
];

const CookScreen = () => {
  // Screen refs and nodes
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const Header1Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const Header2Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const Header3Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const Header4Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const FaqWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const DishesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  let dishElements: React.ReactNode[];

  // Screen data
  let dishes: Dish[] = [];

  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

  // Initialize dish elements
  ((): void => {
    dishes = getRandomElements(dishData, 5) as Dish[];

    for (const dish of dishes) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      dish.dishRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      dish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }

    randomize(dishes);
  
    dishElements = dishes.map((dish: Dish): React.ReactNode => {
      return (
        <Dish
          key={dish.name}
        >
          <DishName ref={dish.dishInfoRef}>{dish.name}</DishName>
          <DishImage ref={dish.dishRef as React.MutableRefObject<HTMLDivElement>} $backgroundImage={dish.image} />
        </Dish>
      );
    });
  })();

  // Screen animation
  useGSAP((): void => {
    const letterAnimationCount: number = (Header1Ref.current.children.length
      + Header2Ref.current.children.length
      + Header3Ref.current.children.length
      + Header4Ref.current.children.length) / 2;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: `+=${dishes.length * 300 + (letterAnimationCount + 4 * 4) * 100}`,
      }
    });

    for (const path of Header1Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(Header1Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: 4,
    });

    for (const path of Header2Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(Header2Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: 4,
    });

    timeline.from(DishesRef.current, {
      transform: 'translate3d(30vw, 0, 0)',
      ease: 'power.out',
      duration: 1,
    });

    for (const dish of dishes) {
      // We can ignore the linting errors as the references will always exist 
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      timeline.from(dish.dishRef!.current, {
        transform: 'translate3d(0, 90vh, 0)',
        ease: 'power1.out',
        duration: 1,
      });

      // We can ignore the linting errors as the references will always exist 
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      timeline.to(dish.dishInfoRef!.current, {
        "--lineScale": 1,
        ease: 'power1.out',
        duration: 1,
      });

      // We can ignore the linting errors as the references will always exist 
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      timeline.to(dish.dishRef!.current, {
        transform: 'translate3d(0, -90vh, 0)',
        ease: 'power1.out',
        duration: 1,
      });
    }

    timeline.to(DishesRef.current, {
      transform: 'translate3d(30vw, 0, 0)',
      ease: 'power.out',
      duration: 1,
    });

    for (const path of Header3Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(Header3Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: 4,
    });

    for (const path of Header4Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(Header4Ref.current.querySelectorAll('.line1'), {
      opacity: 0,
      duration: 1,
    });
    
    timeline.to(Header4Ref.current, {
      transform: 'translate3d(0, -40vh, 0)',
      ease: 'power1.out',
      duration: 4,
    });

    timeline.from(FaqWrapperRef.current, {
      transform: 'translate3d(0, 100%, 0)',
      ease: 'power1.out',
      duration: 4,
    }, '<');
  });

  return (
    <ParallaxScreen ref={screenRef} $backgroundImage={ScreenBackground}>
      <Header1 ref={Header1Ref} />
      <Header2 ref={Header2Ref} />
      <Dishes ref={DishesRef}>
        {dishElements}
      </Dishes>
      <Header3 ref={Header3Ref} />
      <Header4 ref={Header4Ref} />
      <FaqWrapper ref={FaqWrapperRef}>
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
              (<a href="https://www.youtube.com/@JoshuaWeissman">Joshua Weissman</a> is one of my influences) and 
              slowly but surely worked my way into being a better home cook/baker. (Trust me, there were a lot of 
              failures I did not post here!)
            </FaqContent>
          </Faq>
        </Accordion>
      </FaqWrapper>
    </ParallaxScreen>
  );
};

export default CookScreen;
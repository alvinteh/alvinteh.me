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
import ExtraBakeDish1Background from '../images/cook-extra-bake-dish-1.jpg';
import ExtraBakeDish2Background from '../images/cook-extra-bake-dish-2.jpg';
import ExtraBakeDish3Background from '../images/cook-extra-bake-dish-3.jpg';
import ExtraBakeDish4Background from '../images/cook-extra-bake-dish-4.jpg';
import ExtraBakeDish5Background from '../images/cook-extra-bake-dish-5.jpg';
import ExtraBakeDish6Background from '../images/cook-extra-bake-dish-6.jpg';
import ExtraBakeDish7Background from '../images/cook-extra-bake-dish-7.jpg';
import ExtraBakeDish8Background from '../images/cook-extra-bake-dish-8.jpg';
import ExtraBakeDish9Background from '../images/cook-extra-bake-dish-9.jpg';
import ExtraBakeDish10Background from '../images/cook-extra-bake-dish-10.jpg';
import ExtraBakeDish11Background from '../images/cook-extra-bake-dish-11.jpg';
import ExtraBakeDish12Background from '../images/cook-extra-bake-dish-12.jpg';
import ExtraBakeDish13Background from '../images/cook-extra-bake-dish-13.jpg';
import ExtraBakeDish14Background from '../images/cook-extra-bake-dish-14.jpg';
import ExtraBakeDish15Background from '../images/cook-extra-bake-dish-15.jpg';
import ExtraBakeDish16Background from '../images/cook-extra-bake-dish-16.jpg';
import ExtraCookDish1Background from '../images/cook-extra-cook-dish-1.jpg';
import ExtraCookDish2Background from '../images/cook-extra-cook-dish-2.jpg';
import ExtraCookDish3Background from '../images/cook-extra-cook-dish-3.jpg';
import ExtraCookDish4Background from '../images/cook-extra-cook-dish-4.jpg';
import ExtraCookDish5Background from '../images/cook-extra-cook-dish-5.jpg';
import ExtraCookDish6Background from '../images/cook-extra-cook-dish-6.jpg';
import ExtraCookDish7Background from '../images/cook-extra-cook-dish-7.jpg';
import ExtraCookDish8Background from '../images/cook-extra-cook-dish-8.jpg';
import ExtraCookDish9Background from '../images/cook-extra-cook-dish-9.jpg';
import ExtraCookDish10Background from '../images/cook-extra-cook-dish-10.jpg';
import ExtraCookDish11Background from '../images/cook-extra-cook-dish-11.jpg';
import ExtraCookDish12Background from '../images/cook-extra-cook-dish-12.jpg';
import ExtraCookDish13Background from '../images/cook-extra-cook-dish-13.jpg';
import ExtraCookDish14Background from '../images/cook-extra-cook-dish-14.jpg';
import ExtraCookDish15Background from '../images/cook-extra-cook-dish-15.jpg';
import ExtraCookDish16Background from '../images/cook-extra-cook-dish-16.jpg';

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

const ExtraDishes = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ExtraDish = styled.li<{ $backgroundImage: string }>`
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

  &:nth-child(1) {
    top: 22vh;
    left: 12vw;
    transform: rotate(-8deg);
  }

  &:nth-child(2) {
    top: 11vh;
    left: 28vw;
    transform: rotate(-1deg);
  }

  &:nth-child(3) {
    top: 18vh;
    left: 44vw;
    transform: rotate(3.5deg);
  }

  &:nth-child(4) {
    top: 55vh;
    left: 18vw;
    transform: rotate(-11deg);
  }

  &:nth-child(5) {
    top: 50vh;
    left: 35vw;
    transform: rotate(-1deg);
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
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2rem;
  text-align: center;
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

const extraBakeDishData: Dish[] = [
  {
    name: 'Raspberry Chocolate Cake',
    restaurant: '',
    image: ExtraBakeDish1Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Chocolate Babka',
    restaurant: '',
    image: ExtraBakeDish2Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Nutella-stuffed Chocolate Cookies',
    restaurant: '',
    image: ExtraBakeDish3Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Kueh Lapis',
    restaurant: '',
    image: ExtraBakeDish4Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Cinnamon Roll',
    restaurant: '',
    image: ExtraBakeDish5Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Blondie',
    restaurant: '',
    image: ExtraBakeDish6Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Key Lime Pie',
    restaurant: '',
    image: ExtraBakeDish7Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Mixed Berry Shortcake Pie',
    restaurant: '',
    image: ExtraBakeDish8Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Marble Cake',
    restaurant: '',
    image: ExtraBakeDish9Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Chocolate Rainbow Cake w/ Berries',
    restaurant: '',
    image: ExtraBakeDish10Background,
    imageAspectRatio: 1,
  },
  {
    name: 'New York Cheesecake',
    restaurant: '',
    image: ExtraBakeDish11Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Chocolate Fraisier Cake',
    restaurant: '',
    image: ExtraBakeDish12Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Marble Chocolate Madeleine',
    restaurant: '',
    image: ExtraBakeDish13Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Blueberry Muffin',
    restaurant: '',
    image: ExtraBakeDish14Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Sea Salt Chocolate Cookies',
    restaurant: '',
    image: ExtraBakeDish15Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Hokkaido Milk Bun',
    restaurant: '',
    image: ExtraBakeDish16Background,
    imageAspectRatio: 1,
  },
];

const extraCookDishData: Dish[] = [
  {
    name: 'Chicken Tikka Masala',
    restaurant: '',
    image: ExtraCookDish1Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Dum Biryani',
    restaurant: '',
    image: ExtraCookDish2Background,
    imageAspectRatio: 1,
  },
  {
    name: 'Blueberry Pancakes',
    restaurant: '',
    image: ExtraCookDish3Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Breakfast Hash',
    restaurant: '',
    image: ExtraCookDish4Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Steak Diane',
    restaurant: '',
    image: ExtraCookDish5Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Yangnyeom + Dakgangjeong Chikin',
    restaurant: '',
    image: ExtraCookDish6Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Double Bacon Cheeseburger',
    restaurant: '',
    image: ExtraCookDish7Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Pho Bo',
    restaurant: '',
    image: ExtraCookDish8Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Japanese-style Gyoza',
    restaurant: '',
    image: ExtraCookDish9Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Tamagoyaki',
    restaurant: '',
    image: ExtraCookDish10Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Rendang Daging',
    restaurant: '',
    image: ExtraCookDish11Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Souffle Pancakes',
    restaurant: '',
    image: ExtraCookDish12Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Beef Stew',
    restaurant: '',
    image: ExtraCookDish13Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Jerk Chicken',
    restaurant: '',
    image: ExtraCookDish14Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Philly Cheesesteak',
    restaurant: '',
    image: ExtraCookDish15Background,
    imageAspectRatio: 1,
  }, 
  {
    name: 'Ramdon',
    restaurant: '',
    image: ExtraCookDish16Background,
    imageAspectRatio: 1,
  }, 
]

const CookScreen = () => {
  // Screen refs and nodes
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const header1Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const header2Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const header3Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const header4Ref = useRef<SVGSVGElement>() as React.MutableRefObject<SVGSVGElement>;
  const faqWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const dishesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const extraDishesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;

  let dishElements: React.ReactNode[];
  let extraDishElements: React.ReactNode[];

  // Screen data
  let dishes: Dish[] = [];
  let extraDishes: Dish[] = [];

  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

  // Initialize dish elements
  ((): void => {
    dishes = getRandomElements(dishData, 5) as Dish[];
    extraDishes = getRandomElements(extraBakeDishData, 3) as Dish[];
    extraDishes = extraDishes.concat(getRandomElements(extraCookDishData, 3) as Dish[]);

    for (const dish of dishes) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      dish.dishRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      dish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }

    for (const extraDish of extraDishes) {
      // We can ignore the linting errors as the elements always exist
      // eslint-disable-next-line react-hooks/rules-of-hooks
      extraDish.dishRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      extraDish.dishInfoRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    }

    randomize(dishes);
    randomize(extraDishes);

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

    extraDishElements = extraDishes.map((extraDish: Dish): React.ReactNode => {
      return (
        <ExtraDish
          key={extraDish.name}
          ref={extraDish.dishRef as React.MutableRefObject<HTMLLIElement>}
          $backgroundImage={extraDish.image}
        >
          <ExtraDishName ref={extraDish.dishInfoRef}>{extraDish.name}</ExtraDishName>
        </ExtraDish>
      );
    });
  })();

  // Screen animation
  useGSAP((): void => {
    const letterAnimationCount: number = (header1Ref.current.children.length
      + header2Ref.current.children.length
      + header3Ref.current.children.length
      + header4Ref.current.children.length) / 2;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: `+=${dishes.length * 300 + extraDishes.length * 200 + (letterAnimationCount + 4 * 4) * 100}`,
      }
    });

    for (const path of header1Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(header1Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: 4,
    });

    for (const path of header2Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(header2Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: 4,
    });

    timeline.from(dishesRef.current, {
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

    timeline.to(dishesRef.current, {
      transform: 'translate3d(30vw, 0, 0)',
      ease: 'power.out',
      duration: 1,
    });

    for (const path of header3Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(header3Ref.current.children, {
      opacity: 0,
      ease: 'back.out(1)',
      duration: 4,
    });

    for (const extraDish of extraDishes) {
      // We can ignore the linting errors as the references will always exist 
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      timeline.from(extraDish.dishRef!.current, {
        top: '100vh',
        left: 'calc(50% - 7vw - 10px)',
        ease: 'power1.out',
        duration: 1,
      });
    }

    timeline.to(header3Ref.current, {
      // Do nothing to simulate a "pause"
      duration: 1,
    });

    for (let i = extraDishes.length - 1; i >= 0; i--) {
      // We can ignore the linting errors as the references will always exist 
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      timeline.to(extraDishes[i].dishRef!.current, {
        top: '100vh',
        left: 'calc(50% - 7vw - 10px)',
        transform: 'rotate(0)',
        ease: 'power1.out',
        duration: 0.5,
      });
    }

    for (const path of header4Ref.current.children) {
      timeline.fromTo(path, {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.5,
      });
    }

    timeline.to(header4Ref.current.querySelectorAll('.line1'), {
      opacity: 0,
      duration: 1,
    });
    
    timeline.to(header4Ref.current, {
      transform: 'translate3d(0, -40vh, 0)',
      ease: 'power1.out',
      duration: 4,
    });

    timeline.from(faqWrapperRef.current, {
      transform: 'translate3d(0, 100%, 0)',
      ease: 'power1.out',
      duration: 4,
    }, '<');
  });

  return (
    <ParallaxScreen ref={screenRef} $backgroundImage={ScreenBackground}>
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
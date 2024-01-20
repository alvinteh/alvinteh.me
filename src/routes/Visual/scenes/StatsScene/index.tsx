import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import Accordion, { AccordionItem, AccordionItemContent, AccordionItemHeader } from '../../../../components/Accordion';
import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';
import { SceneProps } from '../../../../utils/SceneUtils';

import SceneBackground from './images/scene-background.jpg';

const StyledScreen = styled(Screen)`
  box-sizing: border-box;
  padding-top: 30vh;
  mask-image: radial-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 1%, rgba(0, 0, 0, 0) 100%);
  mask-size: cover;
  opacity: 0;

  @media ${screenSizes.desktopL} {
    padding-top: 35vh;
  }
`;

const Header = styled.h1`
  margin: 0 0 3rem;
  padding-right: calc(5vw);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 3rem;
  text-align: right;
  text-transform: uppercase;
`;

const StatsWrapper = styled.div``;

const Stats = styled.ul`
  display: flex;
  float: right;
  flex-wrap: wrap;
  margin: 0;
  padding: 0 calc(5vw - 2rem) 0 0;
  width: 40rem;
  font-family: 'Barlow Condensed', sans-serif;
  list-style: none;
  text-transform: uppercase;

  @media ${screenSizes.desktopM} {
    width: 64rem;
  }
`;

const Stat = styled.li`
  margin: 0 0 4rem;
  padding: 0;
  width: 10rem;
  text-align: center;

  @media ${screenSizes.desktopM} {
    width: 16rem;
  }
`;

const StatValue = styled.span`
  display: block;
  font-size: 4rem;

  @media ${screenSizes.desktopM} {
    font-size: 6rem;
  }
`;

const StatType = styled.span`
  display: block;
  font-size: 1.25rem;

  @media ${screenSizes.desktopM} {
    font-size: 1.5rem;
  }
`;

const FaqWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  float: right;
  margin: 0;
  padding: 0;
  width: 40rem;
  font-family: 'Barlow Condensed', sans-serif;
  opacity: 0;
  
  @media ${screenSizes.desktopM} {
    width: 55rem;
  }
`;

const Faqs = styled(Accordion)`
  margin-right: 5vw !important;
`;

const FaqHeader = styled(AccordionItemHeader)`
  border-bottom-color: #ffffff;
  text-transform: uppercase;
`;

const FaqContent = styled(AccordionItemContent)`
  font-size: 1.2rem;
  font-weight: 400;
`;

const StatsScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const statsWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const countriesVisitedRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const citiesVisitedRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const shotsRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const shotsKeptRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const speciesShotRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const mostShotsRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const storedPhotosRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const mobileShotsRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const faqWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({ data: { isCustomTransition: true }});
    
    const textAnimation: gsap.TweenVars = {
      innerText: 0,
      snap : { innerText: 1, },
      duration: animationDurations.FAST,
      stagger: {
        each: 1,
        onUpdate: function () {
          // We can ignore the linting errors as there will be one target
          // @ts-expect-error:next-line
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const element: HTMLSpanElement = this.targets()[0] as HTMLSpanElement;
          // We can ignore the linting error as the element will have text
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          element.innerHTML = Math.ceil(Number.parseInt(element.textContent!, 10)).toLocaleString();
        },
      },
    };

    timeline.to(screenRef.current, {
      opacity: 1,
      'mask-image': 'radial-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 99%, rgba(0, 0, 0, 0) 100%)',
      duration: animationDurations.SLOW,
    });
    timeline.from(countriesVisitedRef.current, textAnimation);
    timeline.from(citiesVisitedRef.current, textAnimation, '<');
    timeline.from(shotsRef.current, textAnimation, '<');
    timeline.from(shotsKeptRef.current, textAnimation, '<');
    timeline.from(speciesShotRef.current, textAnimation, '<');
    timeline.from(mostShotsRef.current, textAnimation, '<');
    timeline.from(storedPhotosRef.current, Object.assign({}, textAnimation, {
      snap: { innerText: 0.1 }, stagger: { each: 0.1 }}), '<');
    timeline.from(mobileShotsRef.current, textAnimation, '<');

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    timeline.to(statsWrapperRef.current, {
      opacity: 0,
      duration: animationDurations.MEDIUM,
    });

    timeline.to(faqWrapperRef.current, {
      opacity: 1,
      duration: animationDurations.MEDIUM,
    });

    timeline.addLabel(`scene-${sceneIndex}-outro`);

    registerScene(sceneIndex, screenRef, timeline);
  }, []); 

  return (
    <StyledScreen innerRef={screenRef} backgroundImage={SceneBackground} title="Photography Stats">
      {/* Stats last updated on 2024-01-05, excludes shots from Luang Prabang trip onwards */}
      <StatsWrapper ref={statsWrapperRef}>
        <Header>Photos by the numbers</Header>
        <Stats>
          <Stat>
            {/* Obtained from records on Countries Been app */}
            <StatValue ref={countriesVisitedRef}>60</StatValue>
            <StatType>Countries Visited</StatType>
          </Stat>
          <Stat>
            {/* Obtained from records on Countries Been app */}
            <StatValue ref={citiesVisitedRef}>169</StatValue>
            <StatType>Cities Visited</StatType>
          </Stat>
          <Stat>
            {/* Estimate based off 30+k from Africa trip, 20+k from Torres del Paine + Antarctica trip */}
            <StatValue><span ref={shotsRef}>75</span>k+</StatValue>
            <StatType>Shutter Count</StatType>
          </Stat>
          <Stat>
            {/* Obtained from S3 count of CR2/CR3 files */}
            <StatValue><span ref={shotsKeptRef}>3798</span>+</StatValue>
            <StatType>Shots Kept</StatType>
          </Stat>
          <Stat>
            {/* Count off Africa, Torres del Paine + Antarctica and Yellowstone trips */}
            <StatValue ref={speciesShotRef}>224</StatValue>
            <StatType>Species Shot</StatType>
          </Stat>
          <Stat>
            {/* Obtained from EXIF records in Lightroom; Africa trip in Maasai Mara */}
            <StatValue ref={mostShotsRef}>1406</StatValue>
            <StatType>Most Shots in 1 Day</StatType>
          </Stat>
          <Stat>
            {/* 32 GB * 10 cards + 64 GB * 15 cards + 128 GB * 4 cards*/}
            <StatValue><span ref={storedPhotosRef}>1.8</span>TB+</StatValue>
            <StatType>Stored Photos</StatType>
          </Stat>
          <Stat>
            {/* Obtained from lightroom.adobe.com; all photos included */}
            <StatValue ref={mobileShotsRef}>2368</StatValue>
            <StatType>Mobile Shots</StatType>
          </Stat>
        </Stats>
      </StatsWrapper>
      <FaqWrapper ref={faqWrapperRef}>
        <Header>Travels &amp; Photography FAQ</Header>
        <Faqs>
          <AccordionItem>
            <FaqHeader>
              How did you get to travel to so many places? 
            </FaqHeader>
            <FaqContent>
              I traveled to the majority of places within 5 + 2 years (+2 years due to the travel restrictions during
              the Covid pandemic), and have been fortunate that my work has allowed me the flexibility to explore the
              world (e.g. through remote work). My itineraries are also typically packed extremely tight (for example,
              in 2022 I visited 11 cities in Europe in 11 days) with long days that people say are more similar to
              military boot camps rather than holidays.
            </FaqContent>
          </AccordionItem>
          <AccordionItem>
            <FaqHeader>
              What&apos;s your favorite photography destination?
            </FaqHeader>
            <FaqContent>
              Am I limited to choosing just one? Torres del Paine is a strong contender with its mixture of stunning
              landscapes and wildlife. From a landscape photographer&apos;s perspective, it is a dream with its
              plethora of mountains, forests, waterfalls and glaciers among other things. When it comes to wildlife
              photography, the Maasai Mara is my top choice. It is impossible to beat being able to see so many birds
              and animals up close, and with a lot less chasing compared to other regions!
            </FaqContent>
          </AccordionItem>
          <AccordionItem>
            <FaqHeader>
              What other destinations are on your travel bucket list?
            </FaqHeader>
            <FaqContent>
              In no particular order, Iceland, Eastern Europe (from the Baltic Sea to the Black Sea), Nepal, Bhutan,
              Morocco, Türkiye, the Galapagos Islands, Greece and Hawaii. I am also likely to make another trip to New
              Zealand (my previous trip was marred by poor weather and other mishaps).
            </FaqContent>
          </AccordionItem>
          <AccordionItem>
            <FaqHeader>
              Why are there no photos from *insert place here*?
            </FaqHeader>
            <FaqContent>
              Depending on the place, I may simply not have been, or I may have been but do not have decent photos for
              this gallery (hey, everyone starts somewhere right?). In a few rare cases, (namely South Korea and
              Russia), I have lost the photos too. So do not be surprised to see few photos from places like Asia
              (although I have been to 14 countries/territories there), or seeing no shots of that Wanaka Tree in New
              Zealand.
            </FaqContent>
          </AccordionItem>
          <AccordionItem>
            <FaqHeader>
              What photography gear do you use? 
            </FaqHeader>
            <FaqContent>
              I use Canon gear: started with the 7D Mk II, and most of the pictures here were taken with a 5D Mk IV.
              Most of the African wildlife shots were taken with a R3. Lens-wise, it&apos;s a mix between the EF
              16-35mm F/4L IS USM, the EF 35mm F/2 IS USM, the EF 24-105mm F/4L IS II USM, EF200-400mm F/4L IS USM and
              the RF 100-300mm F/2.8L IS USM. Other gear include Lee filters and a Gitzo Systematic 3.
            </FaqContent>
          </AccordionItem>
          <AccordionItem>
            <FaqHeader>
              Do you offer prints and/or photography workshops? 
            </FaqHeader>
            <FaqContent>
              No, I do not. Travel and photography are interests, not work, for me. That being said, I am happy to
              share tips and/or recommendations for destinations I am familiar with, just reach out.
            </FaqContent>
          </AccordionItem>
        </Faqs>
      </FaqWrapper>
    </StyledScreen>
  );
};

export default StatsScene;
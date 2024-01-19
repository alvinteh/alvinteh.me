import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';
import { SceneProps } from '../../../../utils/SceneUtils';

import SceneBackground from './images/scene-background.jpg';

const StyledScreen = styled(Screen)`
  mask-image: radial-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 1%, rgba(0, 0, 0, 0) 100%);
  mask-size: cover;
  opacity: 0;
`;

const Header = styled.h1`
  margin: 30vh 0 3rem;
  padding-right: calc(5vw);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 3rem;
  text-align: right;
  text-transform: uppercase;

  @media ${screenSizes.desktopL} {
    margin-top: 35vh;
  }
`;

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

const StatsScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const countriesVisitedRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const citiesVisitedRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const shotsRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const shotsKeptRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const speciesShotRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const mostShotsRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const storedPhotosRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const mobileShotsRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({ data: { isCustomTransition: true }});
    
    const textAnimation: gsap.TweenVars = {
      innerText: 0,
      snap : { innerText: 1, },
      duration: animationDurations.XFAST,
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

    registerScene(sceneIndex, screenRef, timeline);
  }, []); 

  return (
    <StyledScreen innerRef={screenRef} backgroundImage={SceneBackground} title="Photography Stats">
      {/* Stats last updated on 2024-01-05, excludes shots from Luang Prabang trip onwards */}
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
          <StatType>Camera Shots</StatType>
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
    </StyledScreen>
  );
};

export default StatsScene;
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';

import Subscreen1Background from './images/subscreen-1.mp4';
import Subscreen2Background from './images/subscreen-2.jpg';
import Subscreen3Background from './images/subscreen-3.jpg';
import Subscreen4Background from './images/subscreen-4.jpg';
import Subscreen5Background from './images/subscreen-5.jpg';
import Subscreen6Background from './images/subscreen-6.jpg';
import Subscreen7Background from './images/subscreen-7.jpg';
import Subscreen8Background from './images/subscreen-8.jpg';
import Subscreen9Background from './images/subscreen-9.jpg';

interface SubscreenAttrs {
  $backgroundImage?: string;
  $backgroundPosition?: string;
}

const Header = styled.h2`
  position: absolute;
  top: 50%;
  left: 15%;
  margin: 0;
  width: 70%;
  height: fit-content;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2rem;
  text-align: center;
  transform: translate3d(0, -50%, 0);

  &>span {
    display: block;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media ${screenSizes.desktopM} {
    font-size: 3rem;
    line-height: 3rem;
  }
`;

const Subscreen = styled.div.attrs<SubscreenAttrs>(({ $backgroundImage, $backgroundPosition }) => ({
  style: {
    backgroundImage: $backgroundImage ? `url(${$backgroundImage})` : 'none',
    backgroundPosition: $backgroundPosition ?? 'center',
  }
}))<{ $style?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  width: 100%;
  height: 100dvh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: ${(props) => { return props.$style === 'dark' ? '#000000' : '#ffffff'; }};
  font-family: "Crimson Text", serif;
  overflow: hidden;
  

  &:first-child {
    
  }

  &>${Header} {
    text-shadow: 1px 1px 3px rgba(${(props) => {
      return props.$style === 'dark' ? '255, 255, 255' : '0, 0, 0';
    }}, 0.7);
  }
`;

const Info = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  font-size: 1.4rem;
  text-align: right;
  text-transform: lowercase;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-style: italic;
  font-weight: 400;
`;

const Artist = styled.h4`
  font-weight: 600;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

const LifeScene = ({ sceneIndex }: { sceneIndex: number }) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const subscreenRefs: React.MutableRefObject<HTMLDivElement[]> = useRef<HTMLDivElement[]>([]);

  // Screen animation
  useGSAP((): void => {
    const timeline = gsap.timeline({ data: { isCustomTransition: true } });

    timeline.from(screenRef.current, {
      opacity: 0,
      ease: 'power1.inOut',
      duration: animationDurations.SLOW,
    });

    for (let i = 0, subscreenCount = subscreenRefs.current.length; i < subscreenCount; i++) {
      const subscreenElement: HTMLDivElement = subscreenRefs.current[i];
      const subscreenChildren: HTMLElement[] = [].slice.call(subscreenElement.children);
      const headerElement: HTMLHeadingElement = subscreenChildren.find((element: HTMLElement): boolean => {
        return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(element.tagName.toLowerCase());
      }) as HTMLHeadingElement;
      const infoElement = subscreenChildren.find((element: HTMLElement): boolean => {
        return element.tagName.toLowerCase() === 'div';
      });

      timeline.from(headerElement.children.length === 0 ? headerElement : headerElement.children, {
        filter: 'blur(4rem)',
        opacity: 0,
        scale: 0.95,
        y: 20,
        ease: 'power1.out',
        duration: animationDurations.MEDIUM,
        stagger: animationDurations.MEDIUM,
      });

      if (infoElement) {
        timeline.from(infoElement, {
          filter: 'blur(2rem)',
          opacity: 0,
          scale: 0.95,
          duration: animationDurations.FAST,
        });
      }

      if (i === 0) {
        timeline.addLabel(`scene-${sceneIndex}-intro`);
      }
      else {
        timeline.addLabel(`scene-${sceneIndex}-subscreen-${i}`);
      }

      timeline.to(headerElement.children.length === 0 ? headerElement : headerElement.children, {
        filter: 'blur(4rem)',
        opacity: 0,
        duration: animationDurations.FAST,
      });

      if (infoElement) {
        timeline.to(infoElement, {
          filter: 'blur(2rem)',
          opacity: 0,
          duration: animationDurations.FAST,
        }, '<');
      }
      
      if (i < subscreenCount - 1) {
        timeline.from(subscreenRefs.current[i + 1], {
          opacity: 0,
          ease: 'power1.inOut',
          duration: animationDurations.SLOW,
        });
      }
    }

    registerScene(sceneIndex, screenRef, timeline, 'Expressions of Life');
  }, []);

  const setSubscreenRef = (element: HTMLDivElement): HTMLDivElement => {
    subscreenRefs.current[subscreenRefs.current.length] = element;
    return element;
  };

  return (
    <Screen innerRef={screenRef}>
      <Subscreen ref={setSubscreenRef}>
        <Header>
          <span>Literature is oft said to be an expression of life</span>
          <span>But what is life?</span>
        </Header>
        <Info>
          <Title>(Untitled)</Title> 
          <Artist>teamLab</Artist>
        </Info>
        <Video
          autoPlay
          disablePictureInPicture
          disableRemotePlayback
          loop
          muted
          preload="auto"
        >
          <source src={Subscreen1Background} type="video/mp4" />
        </Video>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen2Background}>
        <Header>An rollercoaster of color?</Header>
        <Info>
          <Title>Splinter</Title> 
          <Artist>Katharina Grosse</Artist>
        </Info>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen3Background}>
        <Header>A quiet peregrination?</Header>
        <Info>
          <Title>Nymphéas bleus</Title> 
          <Artist>Claude Monet</Artist>
        </Info>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen4Background}>
        <Header>A voyage through tumult?</Header>
        <Info>
          <Title>Le Radeau de la Méduse</Title> 
          <Artist>Théodore Géricault</Artist>
        </Info>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen5Background}>
        <Header>A celebration of triumphs?</Header>
        <Info>
          <Title>US Marine Corps War Memorial</Title> 
          <Artist>Felix de Weldon</Artist>
        </Info>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen6Background}>
        <Header>A pursuit of our passions?</Header>
        <Info>
          <Title>Nascita di Venere</Title> 
          <Artist>Sandro Botticelli</Artist>
        </Info>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen7Background} $backgroundPosition="center top">
        <Header>A fight for our values?</Header>
        <Info>
          <Title>La Liberté guidant le peuple</Title> 
          <Artist>Eugène Delacroix</Artist>
        </Info>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen8Background}>
        <Header>A reflection of our being?</Header>
        <Info>
          <Title>La Nuit étoilée</Title> 
          <Artist>Vincent van Gogh</Artist>
        </Info>
      </Subscreen>
      <Subscreen ref={setSubscreenRef} $backgroundImage={Subscreen9Background} $style="dark">
        <Header>A blank canvas for us to draw on?</Header>
      </Subscreen>
    </Screen>
  );
};

export default LifeScene;
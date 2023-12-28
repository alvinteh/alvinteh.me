import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styled from 'styled-components';

import ParallaxScreen from '../../../../components/ParallaxScreen';
import SceneBackground from './images/scene-drinks.jpg'

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

const DrinksScene = () => {
  // Screen refs and nodes
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;

  gsap.registerPlugin(ScrollTrigger);

  // Screen animation
  useGSAP((): void => {  
    const wordAnimationCount: number = (headerRef.current.children.length) / 2;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: `+=${(wordAnimationCount + 1) * 150}`,
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

    timeline.to(headerRef.current, {
      transform: 'translate3d(0, -20vh, 0)',
      ease: 'power.out',
      duration: 1,
    });
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
    </ParallaxScreen>
  );
};

export default DrinksScene;
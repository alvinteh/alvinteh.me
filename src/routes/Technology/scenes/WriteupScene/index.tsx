import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { Overlay } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { SceneProps } from '../../../../utils/SceneUtils';

import SceneBackground from './images/scene-background.jpg';

const ContentWrapper = styled.div`
  padding: 20vh 20px;
`;

const Header = styled.h1`
  margin: 0 0 3rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  text-transform: uppercase;
`;

const Writeup = styled.div`
  font-family: 'Crimson Text', serif;
  font-size: 1.75rem;
  line-height: 2.25rem;
  width: 65rem;
`;

const WriteupScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const contentWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  // Screen animation
  useGSAP((): void => {
    const timeline: gsap.core.Timeline = gsap.timeline({});

    timeline.fromTo(contentWrapperRef.current, {
      opacity: 0,  
    },
    {
      opacity: 1,
      duration: animationDurations.MEDIUM,
      ease: 'power1.inOut',
    });

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    registerScene(sceneIndex, screenRef, timeline);
  }, []);

  return (
    <Screen innerRef={screenRef} backgroundImage={SceneBackground} title="Technology & Me">
      <Overlay>
        <ContentWrapper ref={contentWrapperRef}>
          <Header>Technology & Me</Header>
          <Writeup>
            I am an entrepreneurial technologist with a passion for crafting digital products and platforms that
            deliver an impact. I achieve this by harnessing a unique blend of product thinking, business acumen
            and technical know-how to lead teams in building said experiences: be it creative digital campaigns
            that have bagged awards, complex and large-scale distributed systems serving hundreds of thousands of
            concurrent users, or innovative apps that have been <a href="https://techcrunch.com/2012/04/11/farewell-app-store-netizine-turns-magazines-into-social-networks-runs-on-html5/">covered
            by TechCrunch</a>, I have continued to help organizations create value across my 15+ years of experience.
            <br />
            <br />
            My diverse exposure across a range of environments from startups to corporates, and in-house to consultancy
            to solution providers also allows me to approach problems more holistically. Be it architecting internet
            scale systems, leading product design activities, managing the delivery of multi-million dollar programs,
            establishing processes or collaborating on opportunities, I am at home.
            <br />
            <br />
            Reach out if you would like to collaborate!
          </Writeup>
        </ContentWrapper>
      </Overlay>
    </Screen>
  );
};

export default WriteupScene;
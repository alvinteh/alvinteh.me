import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartKanban,
  faCloud,
  faCode,
  faCubes,
  faGearCode,
  faHammerBrush,
  faHandHoldingDollar,
  faHeadSideHeart,
  faPeopleArrows,
} from '@fortawesome/sharp-regular-svg-icons';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { Overlay, PaddedPageWrapper } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { SceneProps } from '../../../../utils/SceneUtils';

import SceneBackground from './images/scene-background.jpg';

const StyledScreen = styled(Screen)`
  a, a:visited {
    color: #e5e590;
  }

  a:hover {
    color: #f5f5a0;
  }

`;

const Header = styled.h1`
  margin: 0 0 3rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  line-height: 4rem;
  text-transform: uppercase;
`;

const Content = styled.div`
  display: flex;
  padding-top: 15vh;
`

const MainContent = styled.div`
  margin-right: 100px;
`;

const SideContent = styled.div`
  width: 15rem;
`;

const Writeup = styled.div`
  font-family: 'Crimson Text', serif;
  font-size: 1.75rem;
  line-height: 2.25rem;
  width: 65rem;
`;

const SideHeader = styled.h3`
  margin: 0 0 2rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  line-height: 2rem;
  text-transform: uppercase;

  &:first-child {
    margin-top: 3rem;
  }
`;

const Skills = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Skill = styled.li`
  margin: 0 0 0.5rem;
  padding: 0;
  font-family: Lato, sans-serif;
  font-size: 1.25rem;
  line-height: 1.5rem;
  
  & *:first-child {
    margin-right: 5px;
  }
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
    <StyledScreen innerRef={screenRef} backgroundImage={SceneBackground} title="Technology & Me">
      <Overlay $isEventBlocking={false}>
        <PaddedPageWrapper ref={contentWrapperRef}>
          <Content>
            <MainContent>
              <Header>My Approach to Tech</Header>
              <Writeup>
                I am an entrepreneurial technologist with a passion for crafting digital products and platforms that
                deliver an impact. I achieve this by harnessing a unique blend of product thinking, business acumen
                and technical know-how to lead teams in building said experiences: be it creative digital campaigns
                that have bagged awards, complex and large-scale distributed systems serving hundreds of thousands of
                concurrent users, or innovative apps that have been <a href="https://techcrunch.com/2012/04/11/farewell-app-store-netizine-turns-magazines-into-social-networks-runs-on-html5/"
                target="_blank" rel="external noreferrer">covered by TechCrunch</a>, I have continued to help
                organizations create value across my 15+ years of experience, which includes stints at&nbsp;
                <a href="https://www.cisco.com/" target="_blank" rel="external noreferrer">Cisco</a>,&nbsp;
                <a href="https://www.techinasia.com" target="_blank" rel="external noreferrer">Tech in Asia</a>,&nbsp;
                <a href="https://www.publicissapient.com" target="_blank" rel="external noreferrer">Publicis Sapient</a>,&nbsp;
                <a href="https://www.temasek.com.sg" target="_blank" rel="external noreferrer">Temasek</a> and&nbsp;
                <a href="https://aws.amazon.com" rel="external noreferrer">Amazon Web Services</a>.
                <br />
                <br />
                My diverse exposure across a range of environments from startups to corporates, and in-house to consultancy
                to solution providers also allows me to approach problems more holistically. Be it architecting internet
                scale systems, leading product design activities, managing the delivery of multi-million dollar programs,
                establishing processes or collaborating on opportunities, I am at home.
                <br />
                <br />
                I am currently exploring my next move, reach out if you think I would add value to your organization!
              </Writeup>
            </MainContent>
            <SideContent>
              <SideHeader>Skills at a Glance</SideHeader>
              <Skills>
                <Skill><FontAwesomeIcon icon={faCode} fixedWidth />Software Development</Skill>
                <Skill><FontAwesomeIcon icon={faCubes} fixedWidth />System Architecture</Skill>
                <Skill><FontAwesomeIcon icon={faGearCode} fixedWidth />DevOps &amp; SRE</Skill>
                <Skill><FontAwesomeIcon icon={faCloud} fixedWidth />Cloud Infrastructure</Skill>
                <Skill><FontAwesomeIcon icon={faHeadSideHeart} fixedWidth />UX Design</Skill>
                <Skill><FontAwesomeIcon icon={faHammerBrush} fixedWidth />Product Management</Skill>
                <Skill><FontAwesomeIcon icon={faChartKanban} fixedWidth />Program Management</Skill>
                <Skill><FontAwesomeIcon icon={faHandHoldingDollar} fixedWidth />Technology Sales</Skill>
                <Skill><FontAwesomeIcon icon={faPeopleArrows} fixedWidth />Tech Consulting</Skill>
              </Skills>
            </SideContent>
          </Content>
        </PaddedPageWrapper>
      </Overlay>
    </StyledScreen>
  );
};

export default WriteupScene;
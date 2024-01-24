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
import { SplitText } from 'gsap/SplitText';
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
    color: #70e0e0;
  }

  a:hover {
    color: #80f5f5;
  }
`;

const Header = styled.h1`
  margin: 0 0 3rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  line-height: 4rem;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
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
  max-width: 0;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  line-height: 2rem;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;

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
  margin: 0 0 0.75rem;
  padding: 0;
  font-family: Lato, sans-serif;
  font-size: 1.25rem;
  line-height: 1.5rem;
  
  & *:first-child {
    margin-right: 10px;
  }
`;

const WriteupScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const mainHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const writeupRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const sideHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const skillsRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;

  gsap.registerPlugin(SplitText);

  // Screen animation
  useGSAP((): void => {
    const timeline: gsap.core.Timeline = gsap.timeline({});

    timeline.fromTo(mainHeaderRef.current, {
      maxWidth: 0,
    }, {
      maxWidth: '100%',
      duration: animationDurations.MEDIUM,
      ease: 'power1.inOut',
    });

    // Note we need this line as GSAP doesn't respect maxWidth 0 in the previous line
    timeline.set(mainHeaderRef.current, { maxWidth: 0 }, '<');

    const splitWriteup: SplitText = new SplitText(writeupRef.current, { type: 'lines' });
    // Skip blank lines
    const writeupLineElements: Element[] = splitWriteup.lines.filter((element: Element): boolean => {
      return element.innerHTML !== '&nbsp;'
    });

    timeline.from(writeupLineElements, {
      filter: 'blur(0.5rem)',
      opacity: 0,
      y: 10,
      duration: animationDurations.FAST,
      ease: 'power1.in',
      stagger: animationDurations.FAST,
    });

    timeline.to(sideHeaderRef.current, {
      maxWidth: '100%',
      duration: animationDurations.MEDIUM,
      ease: 'power1.inOut',
    }, `<+${animationDurations.XXFAST}`);

    timeline.from(skillsRef.current.children, {
      opacity: 0,
      x: '20px',
      duration: animationDurations.FAST,
      ease: 'power1.inOut',
      stagger: animationDurations.XFAST,
    }, '>');

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    registerScene(sceneIndex, screenRef, timeline);
  }, []);

  return (
    <StyledScreen innerRef={screenRef} backgroundImage={SceneBackground} title="My Career in Tech">
      <Overlay $isEventBlocking={false}>
        <PaddedPageWrapper>
          <Content>
            <MainContent>
              <Header ref={mainHeaderRef}>My Approach to Tech</Header>
              <Writeup ref={writeupRef}>
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
              <SideHeader ref={sideHeaderRef}>Skills at a Glance</SideHeader>
              <Skills ref={skillsRef}>
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
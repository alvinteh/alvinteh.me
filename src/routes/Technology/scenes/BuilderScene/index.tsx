import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import React, { useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { Overlay, OverlayTypes, PaddedPageWrapper } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { randomize } from '../../../../utils/ArrayUtils';
import { screenSizes } from '../../../../utils/ResponsiveUtils';
import { SceneProps } from '../../../../utils/SceneUtils';

import SceneBackground from './images/scene-background.jpg';
import WriteupBackground from './images/writeup-background.jpg';

import LogoAWS from './images/technologies/logo-aws.svg';
import LogoAzure from './images/technologies/logo-azure.svg';
import LogoCSS from './images/technologies/logo-css.svg';
import LogoD3 from './images/technologies/logo-d3.svg';
import LogoDynamoDB from './images/technologies/logo-dynamodb.svg';
import LogoElastic from './images/technologies/logo-elastic.svg';
import LogoGatsby from './images/technologies/logo-gatsby.svg';
import LogoGCP from './images/technologies/logo-gcp.svg';
import LogoGithub from './images/technologies/logo-github.svg';
import LogoGolang from './images/technologies/logo-golang.svg';
import LogoGrafana from './images/technologies/logo-grafana.svg';
import LogoHTML from './images/technologies/logo-html5.svg';
import LogoIstio from './images/technologies/logo-istio.svg';
import LogoJaeger from './images/technologies/logo-jaeger.svg';
import LogoJava from './images/technologies/logo-java.svg';
import LogoJenkins from './images/technologies/logo-jenkins.svg';
import LogoJest from './images/technologies/logo-jest.svg';
import LogoKafka from './images/technologies/logo-kafka.svg';
import LogoKubernetes from './images/technologies/logo-kubernetes.svg';
import LogoMongoDB from './images/technologies/logo-mongodb.svg';
import LogoMSSQL from './images/technologies/logo-mssql.svg';
import LogoMySQL from './images/technologies/logo-mysql.svg';
import LogoNeo4j from './images/technologies/logo-neo4j.svg';
import LogoNewRelic from './images/technologies/logo-newrelic.svg';
import LogoNextjs from './images/technologies/logo-next.svg';
import LogoNodejs from './images/technologies/logo-nodejs.svg';
import LogoPHP from './images/technologies/logo-php.svg';
import LogoPlaywright from './images/technologies/logo-playwright.svg';
import LogoPostgreSQL from './images/technologies/logo-postgresql.svg';
import LogoPrometheus from './images/technologies/logo-prometheus.svg';
import LogoPython from './images/technologies/logo-python.svg';
import LogoRabbitMQ from './images/technologies/logo-rabbitmq.svg';
import LogoReact from './images/technologies/logo-react.svg';
import LogoReactNative from './images/technologies/logo-react-native.svg';
import LogoRedis from './images/technologies/logo-redis.svg';
import LogoRedshift from './images/technologies/logo-redshift.svg';
import LogoRedux from './images/technologies/logo-redux.svg';
import LogoThreejs from './images/technologies/logo-threejs.svg';
import LogoTypescript from './images/technologies/logo-typescript.svg';
import LogoVite from './images/technologies/logo-vite.svg';
import LogoVMware from './images/technologies/logo-vmware.svg';
import LogoWebpack from './images/technologies/logo-webpack.svg';

import LogoAws from './images/organizations/logo-aws.svg';
import LogoCisco from './images/organizations/logo-cisco.svg';
import LogoPublicsSapient from './images/organizations/logo-publicis-sapient.svg';
import LogoTechInAsia from './images/organizations/logo-tech-in-asia.svg';
import LogoTemasek from './images/organizations/logo-temasek.svg';
import LogoVmware from './images/organizations/logo-vmware.svg';
import LogoBillabong from './images/organizations/logo-billabong.svg';
import LogoBossini from './images/organizations/logo-bossini.svg';
import LogoBmw from './images/organizations/logo-bmw.svg';
import LogoBca from './images/organizations/logo-bca.svg';
import LogoCanon from './images/organizations/logo-canon.svg';
import LogoDbs from './images/organizations/logo-dbs.svg';
import LogoDell from './images/organizations/logo-dell.svg';
import LogoFonterra from './images/organizations/logo-fonterra.svg';
import LogoGarena from './images/organizations/logo-garena.png';
import LogoKimberlyClark from './images/organizations/logo-kimberly-clark.svg';
import LogoMfm from './images/organizations/logo-mfm.png';
import LogoNtuc from './images/organizations/logo-ntuc.svg';
import LogoOrigins from './images/organizations/logo-origins.svg';
import LogoPilot from './images/organizations/logo-pilot.svg';
import LogoSephora from './images/organizations/logo-sephora.svg';
import LogoShiseido from './images/organizations/logo-shiseido.svg';
import LogoShopee from './images/organizations/logo-shopee.svg';
import LogoSpca from './images/organizations/logo-spca.png'
import LogoTigerBeer from './images/organizations/logo-tiger-beer.svg';
import LogoSyog from './images/organizations/logo-syog.svg';
import LogoWego from './images/organizations/logo-wego.png';
import LogoZalora from './images/organizations/logo-zalora.svg';

export interface ItemImageAttrs {
  $src: string;
  $size?: string;
}

const StyledOverlay = styled(Overlay)`
  pointer-events: auto;
`;

const HeaderBase = styled.h2`
  position: absolute;
  top: 50%;
  left: 15%;
  margin: 0;
  width: 70%;
  height: 2rem;
  color: #ffffff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 2rem;
  line-height: 2rem;
  text-transform: uppercase;
  transform: translate3d(0, -50%, 0);

  @media ${screenSizes.phone} {
    left: 2.5%;
    width: 95%;
    height: 1.8rem;
    font-size: 1.8rem;
    line-height: 1.8rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 3rem;
    line-height: 3rem;
    height: 3rem;
  }
`;

const CentralizedHeader = styled(HeaderBase)`
  text-align: center;
`;

// Note: we offset the left by 2rem to compensate for shorter header ends
const SplitHeader = styled(HeaderBase)`
  display: flex;
  left: calc(50% - 20rem);
  width: 44rem;

  @media ${screenSizes.tablet} {
    left: 2.5%;
    width: 95%;
  }

  @media ${screenSizes.phone} {
    left: 2.5%;
    width: 95%;
    height: 1.2rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
  }

  @media ${screenSizes.desktopM} {
    left: calc(50% - 26.5rem);
    width: 57rem;
  }
`;

const SplitHeaderStart = styled.span`
  width: 12rem;
  height: 100%;
  text-align: right;

  @media ${screenSizes.desktopM} {
    width: 18rem;
  }
`;

const SplitHeaderEnds = styled.span`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 26rem;
  height: 100%;
  text-align: left;

  @media ${screenSizes.desktopM} {
    width: 39rem;
  }
`;

const SplitHeaderEnd = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 39rem;
  height: 100%;
`;

const Items = styled.ul`
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  width: 90%;
  column-gap: 10px;
  row-gap: 10px;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  transform: translate3d(-50%, -50%, 0);

  @media ${screenSizes.tablet} {
    grid-template-columns: repeat(5, 1fr);
  }

  @media ${screenSizes.phone} {
    width: 95%;
  }

  @media ${screenSizes.desktopM} {
    column-gap: 20px;
    row-gap: 20px;
  }
`;

const Item = styled.li`
  margin: 0;
  padding: 0;
  text-align: center;
`;

const ItemImage = styled.div.attrs<ItemImageAttrs>(({ $src, $size }) => ({
  style: {
    backgroundImage: `url(${$src})`,
    backgroundSize: $size === '' ? 'contain' : $size,
  }
}))`
  height: 100%;  
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
`;

const Technology = styled(Item)`
  height: 80px;

  &:nth-child(n+15):nth-child(-n+21) {
    padding-bottom: 5rem;
  }

  @media ${screenSizes.tablet} {
    width: 90px;
    height: 70px;

    &:nth-child(n+15):nth-child(-n+21) {
      padding-bottom: 0rem;
    }

    &:nth-child(n+16):nth-child(-n+20) {
      padding-bottom: 5rem;
    }

    &:nth-child(n+41):nth-child(-n+42) {
      display: none;
    }
  }

  @media ${screenSizes.phone} {
    width: calc(19dvw - 8px);
    height: 50px;
  }

  @media ${screenSizes.desktopM} {
    max-width: 180px;
    height: 100px;
  }

  @media ${screenSizes.desktopXL} {
    max-width: 270px;
    height: 150px;
  }
`;

const Organization = styled(Item)`
  width: 90px;
  height: 90px;

  &:nth-child(n+8):nth-child(-n+14) {
    padding-bottom: 8rem;
  }

  @media ${screenSizes.tablet} {
    width: 90px;

    &:nth-child(n+8):nth-child(-n+14) {
      padding-bottom: 0rem;
    }
    &:nth-child(n+11):nth-child(-n+15) {
      padding-bottom: 6rem;
    }
  }

  @media ${screenSizes.phone} {
    width: calc(19dvw - 8px);
    height: 50px;    
  }

  @media ${screenSizes.desktopM} {
    width: auto;
    max-width: 185px;
    height: 110px;
  }

  @media ${screenSizes.desktopXL} {
    max-width: 225px;
    height: 150px;
  }
`;

const ProfileLinks = styled.ul`
  display: block;
  position: absolute;
  top: 50%;
  left: 10%;
  margin: 5rem 0 0;
  padding: 0;
  width: 80%;
  height: 1.4rem;
  color: #ffffff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4rem;
  list-style: none;
  text-align: center;
  text-transform: uppercase;

  @media ${screenSizes.phone} {
    display: block;
    font-size: 1.2rem;
    line-height: 1.2rem;
    height: auto;
  }

  @media ${screenSizes.desktopM} {
    left: 20%;
    width: 60%;
    height: 2rem;
    font-size: 2rem;
    line-height: 2rem;
  }
`;

const ProfileLink = styled.li`
  display: inline-block;
  margin: 0 3rem 0 0;
  padding: 0;

  @media ${screenSizes.phone} {
    display: block;
    margin: 0 0 1rem 0;
  }

  @media ${screenSizes.desktopM} {
    margin-right: 8rem;
  }

  @media ${screenSizes.desktopL} {
    margin-right: 10rem;
  }

  &:last-child {
    margin-right: 0;
  }

  a, a:visited {
    color: #ffffff;
  }

  a:hover {
    color: #80f5f5;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const WriteupShowLink = styled.a`
  position: absolute;
  top: 50%;
  left: calc(50% - 10rem);
  margin: 10rem 0 0;
  width: 20rem;
  height: 1.3rem;
  color: #ffffff;
  cursor: pointer;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.3rem;
  list-style: none;
  text-align: center;
  text-transform: uppercase;

  @media ${screenSizes.phone} {
    margin-top: 15rem;
  }

  &:hover {
    color: #80f5f5;
  }
`;

const WriteupWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  height: 100dvh;
  overflow: hidden;
`;

const WriteupPaddedBackground = styled(PaddedPageWrapper)`
  background-image: url(${WriteupBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100dvh;

  @media ${screenSizes.phone} {
    overflow-y: auto;
  }
`;

const WriteupHeader = styled.h1`
  margin: 10dvh auto 3rem;
  max-width: 60rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 3rem;
  line-height: 3rem;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;

  @media ${screenSizes.phone} {
    margin-top: 5dvh;
    margin-bottom: 2rem;
    font-size: 2rem;
    line-height: 2rem;
  }

  @media ${screenSizes.desktopM} {
    font-size: 4rem;
    line-height: 4rem;  
  }
`;

const WriteupContent = styled.div`
  margin: 0 auto;
  max-width: 60rem;
  font-family: 'Crimson Text', serif;
  font-size: 1.25rem;
  line-height: 1.5rem;

  @media ${screenSizes.phone} {
    font-size: 1.1rem;
    line-height: 1.25rem;
  }
  
  @media ${screenSizes.desktopM} {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  a, a:visited {
    color: #70e5e5;
  }

  a:hover {
    color: #80f5f5;
  }
`;

const WriteupHideLink = styled.a`
  display: block;
  margin: 2rem auto 0;
  max-width: 60rem;
  color: #ffffff;
  cursor: pointer;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25rem;
  text-align: center;
  text-transform: uppercase;

  &:hover {
    color: #80f5f5;
  }
`;

const BuilderScene = ({ sceneIndex }: SceneProps) => {
  const { pageObserverName, registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const overlayRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const startHeaderRefs = useRef<HTMLHeadingElement[]>([]);
  const splitHeaderStartRef = useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const splitHeaderEndRefs = useRef<HTMLHeadingElement[]>([]);
  const skillsRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const organizationsRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const endHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const profileLinksRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const writeupShowLinkRef = useRef<HTMLAnchorElement>() as React.MutableRefObject<HTMLAnchorElement>;
  const writeupWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const setStartHeaderRefs = (element: HTMLHeadingElement): HTMLHeadingElement => {
    startHeaderRefs.current[startHeaderRefs.current.length] = element;
    return element;
  };

  const setSplitHeaderEndRefs = (element: HTMLHeadingElement): HTMLHeadingElement => {
    splitHeaderEndRefs.current[splitHeaderEndRefs.current.length] = element;
    return element;
  };

  const handleWriteupShowLinkClick = useCallback((): void => {
    Observer.getById(pageObserverName)?.disable();
    gsap.to(writeupWrapperRef.current, {
      maxHeight: '100dvh',
      ease: 'power1.out',
      duration: animationDurations.XSLOW,
    });
  }, [pageObserverName]);

  const handleWriteupHideLinkClick = useCallback((): void => {
    Observer.getById(pageObserverName)?.enable();
    gsap.to(writeupWrapperRef.current, {
      maxHeight: 0,
      ease: 'power1.out',
      duration: animationDurations.XSLOW,
    });
  }, [pageObserverName]);

  // Screen animation
  useGSAP((): void => {
    const timeline: gsap.core.Timeline = gsap.timeline({});

    timeline.to(skillsRef.current, { z: '1px' });

    timeline.set(skillsRef.current, { display: 'none' });
    timeline.set(organizationsRef.current, { display: 'none' });

    for (let i = 0, startHeaderCount = startHeaderRefs.current.length; i < startHeaderCount; i++) {
      timeline.from(startHeaderRefs.current[i], {
        filter: 'blur(0.5rem)',
        opacity: 0,
        ease: 'power1.out',
        duration: animationDurations.MEDIUM,
      }, i == 0 ? '>' : undefined);

      if (i === 0) {
        timeline.addLabel(`scene-${sceneIndex}-intro`);
      }
      else {
        timeline.addLabel(`scene-${sceneIndex}-intro-header-${i + 1}`);
      }

      if (i < startHeaderCount) {
        timeline.to(startHeaderRefs.current[i], {
          filter: 'blur(0.5rem)',
          opacity: 0,
          ease: 'power1.out',
          duration: animationDurations.FAST,
        });
      }
    }

    timeline.to(overlayRef.current, {
      background: 'rgba(0, 0, 0, 0.85)',
      ease: 'power1.out',
      duration: animationDurations.MEDIUM,
    }, '<');

    const invisible: gsap.TweenVars = {
      filter: 'blur(0.5rem)',
      opacity: 0,
      pointerEvents: 'none',
      ease: 'power1.out',
      duration: animationDurations.MEDIUM,
    };

    for (let i = 0, splitHeaderCount = splitHeaderEndRefs.current.length; i < splitHeaderCount; i++) {
      const splitHeaderEndElement: HTMLSpanElement = splitHeaderEndRefs.current[i];
      const section: string = splitHeaderEndElement.dataset.section ?? '';
      const category: string = splitHeaderEndElement.dataset.category ?? '';

      if (i === 0) {
        timeline.set(skillsRef.current, { display: 'grid' });
        timeline.set(organizationsRef.current, { display: 'none' });
        timeline.from([splitHeaderStartRef.current, splitHeaderEndElement], invisible);
      }
      else {
        // Note: for some unknown reason, we have to use an object literal here; otherwise the animation breaks
        // even Object.assign({}, invisible) does not work
        timeline.to(splitHeaderEndRefs.current[i - 1], {
          filter: 'blur(0.5rem)',
          opacity: 0,
          ease: 'power1.out',
          duration: animationDurations.MEDIUM,
        });

        timeline.to(skillsRef.current.children, {
          opacity: 0,
          pointerEvents: 'none',
          ease: 'power1.out',
          duration: animationDurations.FAST,
        }, '<');

        timeline.from(splitHeaderEndElement, invisible);
      }

      if (section === 'technologies') {
        let filteredItemElements: HTMLLIElement[] = [];

        for (const itemElement of skillsRef.current.children) {
          if (category === '*' || (itemElement as HTMLLIElement).dataset.category === category) {
            filteredItemElements.push(itemElement as HTMLLIElement);
          }
        }

        filteredItemElements = randomize(filteredItemElements) as HTMLLIElement[];

        timeline.fromTo(filteredItemElements, {
          opacity: 0,
          pointerEvents: 'none',
        },
        { 
          opacity: 1,
          pointerEvents: 'auto',
          ease: 'power1.out',
          duration: animationDurations.FAST,
          stagger: animationDurations.XXFAST / 2,
        }, `<+=${animationDurations.FAST}`);
      }
      else if (section === 'organizations') {
        timeline.set(skillsRef.current, { display: 'none' });
        timeline.set(organizationsRef.current, { display: 'grid' });
        timeline.fromTo(randomize([].slice.call(organizationsRef.current.children)), {
          opacity: 0,
        },
        { 
          opacity: 1,
          ease: 'power1.out',
          duration: animationDurations.FAST,
          stagger: animationDurations.XXFAST / 2,
        }, `<+=${animationDurations.FAST}`);
      }
      
      timeline.addLabel(`scene-${sceneIndex}-subheader-${i}`);
    }

    // Note: for some unknown reason, we have to use an object literal here; otherwise the animation breaks
    // even Object.assign({}, invisible) does not work
    timeline.to([splitHeaderStartRef.current, splitHeaderEndRefs.current[splitHeaderEndRefs.current.length - 1]], {
      filter: 'blur(0.5rem)',
      opacity: 0,
      ease: 'power1.out',
      duration: animationDurations.MEDIUM,
    });

    timeline.to(organizationsRef.current.children, {
      opacity: 0,
      pointerEvents: 'none',
      ease: 'power1.out',
      duration: animationDurations.MEDIUM,
    }, '<');

    timeline.from(endHeaderRef.current, invisible);

    timeline.from([profileLinksRef.current.children, writeupShowLinkRef.current], {
      opacity: 0,
      y: 20,
      duration: animationDurations.FAST,
      ease: 'power1.out',
      stagger: animationDurations.XFAST,
    });

    // Note: we set this to avoid the animation issue on first playback
    gsap.set(writeupWrapperRef.current, { maxHeight: 0 });

    timeline.addLabel(`scene-${sceneIndex}-outro`);

    registerScene(sceneIndex, screenRef, timeline, 'A Builder for You');
  }, [sceneIndex, registerScene]);

  return (
    <Screen innerRef={screenRef} backgroundImage={SceneBackground}>
      <StyledOverlay ref={overlayRef} $type={OverlayTypes.NORMAL}>
        <CentralizedHeader ref={setStartHeaderRefs}>Technology enables us to build many things</CentralizedHeader>
        <CentralizedHeader ref={setStartHeaderRefs}>And there are thousands of builders out there</CentralizedHeader>
        <CentralizedHeader ref={setStartHeaderRefs}>But what type of builder are you looking for?</CentralizedHeader>

        <SplitHeader>
          <SplitHeaderStart ref={splitHeaderStartRef}>A builder who&nbsp;</SplitHeaderStart>
          <SplitHeaderEnds>
            <SplitHeaderEnd ref={setSplitHeaderEndRefs} data-section="technologies" data-category="frontend">crafts immersive frontends?</SplitHeaderEnd>
            <SplitHeaderEnd ref={setSplitHeaderEndRefs} data-section="technologies" data-category="backend">builds performant backends?</SplitHeaderEnd>
            <SplitHeaderEnd ref={setSplitHeaderEndRefs} data-section="technologies" data-category="infrastructure">designs scalable infra systems?</SplitHeaderEnd>
            <SplitHeaderEnd ref={setSplitHeaderEndRefs} data-section="technologies" data-category="*">combines all of the above.</SplitHeaderEnd>
            <SplitHeaderEnd ref={setSplitHeaderEndRefs} data-section="organizations">consistently delivers.</SplitHeaderEnd>
          </SplitHeaderEnds>
        </SplitHeader>

        <CentralizedHeader ref={endHeaderRef}>A builder for you?</CentralizedHeader>

        <Items ref={skillsRef}>
          <Technology data-category="infrastructure"><a href="https://aws.amazon.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoAWS} $size="40%">AWS</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://azure.microsoft.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoAzure} $size="30%">Azure</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="external noreferrer"><ItemImage $src={LogoCSS} $size="25%">CSS</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://d3js.org/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoD3} $size="25%">D3</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://aws.amazon.com/dynamodb" target="_blank" rel="external noreferrer"><ItemImage $src={LogoDynamoDB} $size="30%">DynamoDB</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://www.elastic.co" target="_blank" rel="external noreferrer"><ItemImage $src={LogoElastic} $size="75%">Elastic</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://www.gatsbyjs.com/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoGatsby} $size="70%">Gatsby</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://github.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoGithub} $size="30%">GitHub</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://go.dev" target="_blank" rel="external noreferrer"><ItemImage $src={LogoGolang} $size="50%">Go</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://cloud.google.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoGCP} $size="80%">Google Cloud</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://grafana.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoGrafana} $size="35%">Grafana</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://html.spec.whatwg.org" target="_blank" rel="external noreferrer"><ItemImage $src={LogoHTML} $size="35%">HTML</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://istio.io" target="_blank" rel="external noreferrer"><ItemImage $src={LogoIstio} $size="60%">Istio</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://www.jaegertracing.io" target="_blank" rel="external noreferrer"><ItemImage $src={LogoJaeger} $size="30%">Jaeger</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://www.java.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoJava} $size="25%">Java</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://www.jenkins.io" target="_blank" rel="external noreferrer"><ItemImage $src={LogoJenkins} $size="70%">Jenkins</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://jestjs.io/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoJest} $size="25%">Jest</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://kafka.apache.org/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoKafka} $size="20%">Kafka</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://kubernetes.io" target="_blank" rel="external noreferrer"><ItemImage $src={LogoKubernetes} $size="30%">Kubernetes</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://www.mongodb.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoMongoDB} $size="75%">MongoDB</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://www.mysql.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoMySQL} $size="50%">MySQL</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://neo4j.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoNeo4j} $size="55%">neo4j</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://newrelic.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoNewRelic} $size="75%">New Relic</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://nextjs.org/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoNextjs} $size="65%">Next.js</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://nodejs.org" target="_blank" rel="external noreferrer"><ItemImage $src={LogoNodejs} $size="50%">node.js</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://www.php.net" target="_blank" rel="external noreferrer"><ItemImage $src={LogoPHP} $size="45%">PHP</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://playwright.dev/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoPlaywright} $size="75%">Playwright</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://www.postgresql.org" target="_blank" rel="external noreferrer"><ItemImage $src={LogoPostgreSQL} $size="30%">PostgreSQL</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://prometheus.io" target="_blank" rel="external noreferrer"><ItemImage $src={LogoPrometheus} $size="30%">Prometheus</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://www.python.org" target="_blank" rel="external noreferrer"><ItemImage $src={LogoPython} $size="30%">Python</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://rabbitmq.com/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoRabbitMQ} $size="70%">RabbitMQ</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://react.dev/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoReact} $size="30%">React</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://reactnative.dev/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoReactNative} $size="35%">React Native</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://redis.io" target="_blank" rel="external noreferrer"><ItemImage $src={LogoRedis} $size="65%">Redis</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://aws.amazon.com/redshift" target="_blank" rel="external noreferrer"><ItemImage $src={LogoRedshift} $size="30%">Redshift</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://redux.js.org/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoRedux} $size="35%">Redux</ItemImage></a></Technology>
          <Technology data-category="backend"><a href="https://www.microsoft.com/sql-server" target="_blank" rel="external noreferrer"><ItemImage $src={LogoMSSQL} $size="50%">SQL Server</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://threejs.org/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoThreejs} $size="35%">three.js</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://www.typescriptlang.org" target="_blank" rel="external noreferrer"><ItemImage $src={LogoTypescript} $size="25%">TypeScript</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://vitejs.dev/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoVite} $size="30%">Vite</ItemImage></a></Technology>
          <Technology data-category="infrastructure"><a href="https://www.vmware.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoVMware} $size="65%">VMware</ItemImage></a></Technology>
          <Technology data-category="frontend"><a href="https://webpack.js.org/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoWebpack} $size="65%">Webpack</ItemImage></a></Technology>
          
          {/* <Item><a href="" target="_blank" rel="external noreferrer"><ItemImage $src={Logo} $size=""></ItemImage></a></Item> */}
        </Items>

        <Items ref={organizationsRef}>
          <Organization><a href="https://aws.amazon.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoAws} $size="50%">Amazon Web Services</ItemImage></a></Organization>
          <Organization><a href="https://www.billabong.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoBillabong} $size="50%">Billabong</ItemImage></a></Organization>
          <Organization><a href="https://www.bossini.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoBossini} $size="80%">Bossini</ItemImage></a></Organization>
          <Organization><a href="https://www.bmw.com.sg" target="_blank" rel="external noreferrer"><ItemImage $src={LogoBmw} $size="35%">BMW</ItemImage></a></Organization>
          <Organization><a href="https://www.bca.co.id" target="_blank" rel="external noreferrer"><ItemImage $src={LogoBca} $size="75%">BCA</ItemImage></a></Organization>
          <Organization><a href="https://sg.canon" target="_blank" rel="external noreferrer"><ItemImage $src={LogoCanon} $size="65%">Canon</ItemImage></a></Organization>
          <Organization><a href="https://www.cisco.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoCisco} $size="50%">Cisco</ItemImage></a></Organization>
          <Organization><a href="https://dbs.com.sg" target="_blank" rel="external noreferrer"><ItemImage $src={LogoDbs} $size="70%">DBS</ItemImage></a></Organization>
          <Organization><a href="https://dell.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoDell} $size="40%">Dell</ItemImage></a></Organization>
          <Organization><a href="https://www.fonterra.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoFonterra} $size="65%">Fonterra</ItemImage></a></Organization>
          <Organization><a href="https://www.garena.sg" target="_blank" rel="external noreferrer"><ItemImage $src={LogoGarena} $size="75%">Garena</ItemImage></a></Organization>
          <Organization><a href="https://www.kimberly-clark.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoKimberlyClark} $size="85%">Kimberly-Clark</ItemImage></a></Organization>
          <Organization><a href="https://www.manhattanfishmarket.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoMfm} $size="45%">Manhattan Fish Market</ItemImage></a></Organization>
          <Organization><a href="https://www.ntuc.org.sg" target="_blank" rel="external noreferrer"><ItemImage $src={LogoNtuc} $size="50%">NTUC</ItemImage></a></Organization>
          <Organization><a href="https://www.origins.hk" target="_blank" rel="external noreferrer"><ItemImage $src={LogoOrigins} $size="50%">Origins</ItemImage></a></Organization>
          <Organization><a href="https://www.pilotpen.com.sg/" target="_blank" rel="external noreferrer"><ItemImage $src={LogoPilot} $size="70%">Pilot</ItemImage></a></Organization>
          <Organization><a href="https://www.publicissapient.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoPublicsSapient} $size="55%">Publicis Sapient</ItemImage></a></Organization>
          <Organization><a href="https://www.sephora.sg" target="_blank" rel="external noreferrer"><ItemImage $src={LogoSephora} $size="70%">Sephora</ItemImage></a></Organization>
          <Organization><a href="https://www.shiseido.com.hk" target="_blank" rel="external noreferrer"><ItemImage $src={LogoShiseido} $size="70%">Shiseido</ItemImage></a></Organization>
          <Organization><a href="https://shopee.sg" target="_blank" rel="external noreferrer"><ItemImage $src={LogoShopee} $size="85%">Shopee</ItemImage></a></Organization>
          <Organization><a href="https://www.singaporeolympics.com/youth-olympic-games" target="_blank" rel="external noreferrer"><ItemImage $src={LogoSyog} $size="25%">Singapore Youth Olympic Games</ItemImage></a></Organization>
          <Organization><a href="https://www.spca.org.hk" target="_blank" rel="external noreferrer"><ItemImage $src={LogoSpca} $size="90%">SPCA</ItemImage></a></Organization>
          <Organization><a href="https://www.techinasia.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoTechInAsia} $size="70%">Tech in Asia</ItemImage></a></Organization>
          <Organization><a href="https://www.temasek.com.sg" target="_blank" rel="external noreferrer"><ItemImage $src={LogoTemasek} $size="80%">Temasek</ItemImage></a></Organization>
          <Organization><a href="https://www.tigerbeer.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoTigerBeer} $size="55%">Tiger Beer</ItemImage></a></Organization>
          <Organization><a href="https://www.vmware.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoVmware} $size="80%">VMware</ItemImage></a></Organization>
          <Organization><a href="https://www.wego.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoWego} $size="70%">Wego</ItemImage></a></Organization>
          <Organization><a href="https://zalora.com" target="_blank" rel="external noreferrer"><ItemImage $src={LogoZalora} $size="55%">Zalora</ItemImage></a></Organization>
        </Items>

        <ProfileLinks ref={profileLinksRef}>
          <ProfileLink><a href="https://linkedin.com/in/alteh" target="_blank" rel="external noreferrer"><StyledFontAwesomeIcon icon={faLinkedin} fixedWidth />LinkedIn</a></ProfileLink>
          <ProfileLink><a href="https://github.com/alvinteh" target="_blank" rel="external noreferrer"><StyledFontAwesomeIcon icon={faGithub} fixedWidth />GitHub</a></ProfileLink>
          <ProfileLink><a href="https://stackoverflow.com/users/889190/alvin-teh" target="_blank" rel="external noreferrer"><StyledFontAwesomeIcon icon={faStackOverflow} fixedWidth />StackOverflow</a></ProfileLink>
        </ProfileLinks>

        <WriteupShowLink ref={writeupShowLinkRef} onClick={handleWriteupShowLinkClick}>Read about My Approach to Tech</WriteupShowLink>

        <WriteupWrapper ref={writeupWrapperRef}>
          <WriteupPaddedBackground>
            <WriteupHeader>My Approach to Tech</WriteupHeader>
            <WriteupContent>
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
              <a href="https://www.temasek.com.sg" target="_blank" rel="external noreferrer">Temasek</a>, &nbsp;
              <a href="https://aws.amazon.com" rel="external noreferrer">Amazon Web Services</a>, and&nbsp;
              <a href="https://www.thoughtworks.com/" rel="external noreferrer">Thoughtworks</a>.
              <br />
              <br />
              My diverse exposure across a range of environments from startups to corporates, and in-house to consultancy
              to solution providers also allows me to approach problems more holistically. Be it architecting internet
              scale systems, leading product design activities, managing the delivery of multi-million dollar programs,
              establishing processes or collaborating on opportunities, I am at home.
            </WriteupContent>
            <WriteupHideLink onClick={handleWriteupHideLinkClick}>Back</WriteupHideLink>
          </WriteupPaddedBackground>
        </WriteupWrapper>
      </StyledOverlay>
    </Screen>
  );
};

export default BuilderScene;
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
import LogoAws from './images/logo-aws.svg';
import LogoCisco from './images/logo-cisco.svg';
import LogoPublicsSapient from './images/logo-publicis-sapient.svg';
import LogoTechInAsia from './images/logo-tech-in-asia.svg';
import LogoTemasek from './images/logo-temasek.svg';
import LogoVmware from './images/logo-vmware.svg';

import LogoBillabong from './images/logo-billabong.svg';
import LogoBossini from './images/logo-bossini.svg';
import LogoBmw from './images/logo-bmw.svg';
import LogoBca from './images/logo-bca.svg';
import LogoCanon from './images/logo-canon.svg';
import LogoDbs from './images/logo-dbs.svg';
import LogoDell from './images/logo-dell.svg';
import LogoFonterra from './images/logo-fonterra.svg';
import LogoGarena from './images/logo-garena.png';
import LogoKimberlyClark from './images/logo-kimberly-clark.svg';
import LogoMfm from './images/logo-mfm.png';
import LogoNtuc from './images/logo-ntuc.svg';
import LogoOrigins from './images/logo-origins.svg';
import LogoSephora from './images/logo-sephora.svg';
import LogoShiseido from './images/logo-shiseido.svg';
import LogoShopee from './images/logo-shopee.svg';
import LogoSpca from './images/logo-spca.png'
import LogoTigerBeer from './images/logo-tiger-beer.svg';
import LogoSyog from './images/logo-syog.svg';
import LogoWego from './images/logo-wego.png';
import LogoZalora from './images/logo-zalora.svg';

interface LogoImageAttrs {
  $src: string;
  $size?: string;
}

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

const SubHeader = styled.h3`
  margin: 0 0 2rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  line-height: 2rem;
  text-transform: uppercase;
`;

const Logos = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  list-style: none;
`;

const Logo = styled.li`
  margin: 0 20px 20px 0;
  padding: 0;
  width: 150px;
  height: 110px;
`;

const LogoImage = styled.span.attrs<LogoImageAttrs>(({ $src, $size }) => ({
  style: {
    backgroundImage: `url(${$src})`,
    backgroundSize: $size ?? 'contain',
  }
}))`
  display: block;
  height: 110px;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden; 
  text-indent: 100%;
  white-space: nowrap;
`;

const CompaniesScene = ({ sceneIndex }: SceneProps) => {
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
    <StyledScreen innerRef={screenRef} backgroundImage={SceneBackground} title="haha">
      <Overlay $isEventBlocking={false}>
        <PaddedPageWrapper ref={contentWrapperRef}>
          <Content>
            <MainContent>
              <Header>Delivering Impact Everywhere I Go</Header>
              <SubHeader>Employers</SubHeader>
              <Logos>
                <Logo><a href="https://www.cisco.com" rel="external noreferrer"><LogoImage $src={LogoCisco} $size="60%">Cisco</LogoImage></a></Logo>
                <Logo><a href="https://www.techinasia.com" rel="external noreferrer"><LogoImage $src={LogoTechInAsia}>Tech in Asia</LogoImage></a></Logo>
                <Logo><a href="https://www.publicissapient.com" rel="external noreferrer"><LogoImage $src={LogoPublicsSapient} $size="65%">Publicis Sapient</LogoImage></a></Logo>
                <Logo><a href="https://www.temasek.com.sg" rel="external noreferrer"><LogoImage $src={LogoTemasek} $size="90%">Temasek</LogoImage></a></Logo>
                <Logo><a href="https://aws.amazon.com" rel="external noreferrer"><LogoImage $src={LogoAws} $size="60%">Amazon Web Services</LogoImage></a></Logo>
                <Logo><a href="https://www.vmware.com" rel="external noreferrer"><LogoImage $src={LogoVmware} $size="90%">VMware</LogoImage></a></Logo>
              </Logos>
              <SubHeader>Clients</SubHeader>
              <Logos>
                <Logo><a href="https://www.billabong.com" rel="external noreferrer"><LogoImage $src={LogoBillabong} $size="60%">Billabong</LogoImage></a></Logo>
                <Logo><a href="https://www.bossini.com" rel="external noreferrer"><LogoImage $src={LogoBossini} $size="80%">Bossini</LogoImage></a></Logo>
                <Logo><a href="https://www.bmw.com.sg" rel="external noreferrer"><LogoImage $src={LogoBmw} $size="50%">BMW</LogoImage></a></Logo>
                <Logo><a href="https://www.bca.co.id" rel="external noreferrer"><LogoImage $src={LogoBca} $size="85%">BCA</LogoImage></a></Logo>
                <Logo><a href="https://sg.canon" rel="external noreferrer"><LogoImage $src={LogoCanon} $size="90%">Canon</LogoImage></a></Logo>
                <Logo><a href="https://dbs.com.sg" rel="external noreferrer"><LogoImage $src={LogoDbs} $size="80%">DBS</LogoImage></a></Logo>
                <Logo><a href="https://dell.com" rel="external noreferrer"><LogoImage $src={LogoDell} $size="50%">Dell</LogoImage></a></Logo>
                <Logo><a href="https://www.fonterra.com" rel="external noreferrer"><LogoImage $src={LogoFonterra} $size="80%">Fonterra</LogoImage></a></Logo>
                <Logo><a href="https://www.garena.sg" rel="external noreferrer"><LogoImage $src={LogoGarena} $size="80%">Garena</LogoImage></a></Logo>
                <Logo><a href="https://www.kimberly-clark.com" rel="external noreferrer"><LogoImage $src={LogoKimberlyClark}>Kimberly-Clark</LogoImage></a></Logo>
                <Logo><a href="https://www.manhattanfishmarket.com" rel="external noreferrer"><LogoImage $src={LogoMfm} $size="70%">Manhattan Fish Market</LogoImage></a></Logo>
                <Logo><a href="https://www.ntuc.org.sg" rel="external noreferrer"><LogoImage $src={LogoNtuc} $size="70%">NTUC</LogoImage></a></Logo>
                <Logo><a href="https://www.origins.hk" rel="external noreferrer"><LogoImage $src={LogoOrigins} $size="70%">Origins</LogoImage></a></Logo>
                <Logo><a href="https://www.sephora.sg" rel="external noreferrer"><LogoImage $src={LogoSephora}>Sephora</LogoImage></a></Logo>
                <Logo><a href="https://www.shiseido.com.hk" rel="external noreferrer"><LogoImage $src={LogoShiseido}>Shiseido</LogoImage></a></Logo>
                <Logo><a href="https://shopee.sg" rel="external noreferrer"><LogoImage $src={LogoShopee} $size="90%">Shopee</LogoImage></a></Logo>
                <Logo><a href="https://www.singaporeolympics.com/youth-olympic-games" rel="external noreferrer"><LogoImage $src={LogoSyog}>Singapore Youth Olympic Games</LogoImage></a></Logo>
                <Logo><a href="https://www.spca.org.hk" rel="external noreferrer"><LogoImage $src={LogoSpca}>SPCA</LogoImage></a></Logo>
                <Logo><a href="https://www.tigerbeer.com" rel="external noreferrer"><LogoImage $src={LogoTigerBeer} $size="75%">Tiger Beer</LogoImage></a></Logo>
                <Logo><a href="https://www.wego.com" rel="external noreferrer"><LogoImage $src={LogoWego} $size="80%">Wego</LogoImage></a></Logo>
                <Logo><a href="https://zalora.com" rel="external noreferrer"><LogoImage $src={LogoZalora}>Zalora</LogoImage></a></Logo>
              </Logos>
            </MainContent>
            <SideContent>
            </SideContent>
          </Content>
        </PaddedPageWrapper>
      </Overlay>
    </StyledScreen>
  );
};

export default CompaniesScene;
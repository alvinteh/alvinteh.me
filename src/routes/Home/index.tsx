import styled, { keyframes } from 'styled-components';

import { cubicBezier, FullPageWrapper } from '../../components/static';
import { useDispatch, useSelector } from '../../core/hooks';
import { open } from '../../slices/nav';

import HeroBackground from './images/hero.jpg';

const flyCycleAnimation = keyframes`
  100% {
    background-position: -900px 0;
  }
`;

const flyRightAnimation = keyframes`
  0% {
    transform: translate3d(-10cqw, 5cqh, 0) scale(0.2);
  }

  10% {
    transform: translate3d(5cqw, 17cqh, 0) scale(0.25);
  }

  20% {
    transform: translate3d(15cqw, 8cqh, 0) scale(0.27);
  }

  30% {
    transform: translate3d(30cqw, 20cqh, 0) scale(0.29);
  }

  40% {
    transform: translate3d(45cqw, 13cqh, 0) scale(0.3);
  }

  50% {
    transform: translateX(60cqw, 16cqh, 0) scale(0.28);
  }

  60% {
    transform: translateX(73cqw, 7cqh) scale(0.25);
  }

  70% {
    transform: translateX(83cqw, 12cqh, 0) scale(0.2);
  }

  80% {
    transform: translate3d(93cqw, 10cqh, 0) scale(0.15);
  }

  100% {
    transform: translate3d(110cqw, 8cqh, 0) scale(0.05);
  }
`;

const BirdContainers = styled.div`
  position: relative;
  width: 64%;
  height: 25%;
  container-type: size;

  @media (min-aspect-ratio: 17/9) {
    height: 10%;
  }
`;

const BirdContainer = styled.div`
  position: absolute;
  top: 20%;
  left: -10%;
  transform: scale(0) translateX(-10cqw);
  will-change: transform;

  animation-name: ${flyRightAnimation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const BirdContainer1 = styled(BirdContainer)`
  animation-duration: 14s;
	animation-delay: 0;
`;

const BirdContainer2 = styled(BirdContainer)`
  animation-duration: 17s;
  animation-delay: 4s;
`;

const BirdContainer3 = styled(BirdContainer)`
  animation-duration: 15s;
  animation-delay: 9s;
`;

const Bird = styled.div`
  width: 88px;
  height: 125px;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
  background-size: auto 100%;
  opacity: 0.8;
  will-change: background-position;

  animation-name: ${flyCycleAnimation};
  animation-timing-function: steps(10);
  animation-iteration-count: infinite;
`;

const Bird1 = styled(Bird)`
  animation-duration: 1s;
  animation-delay: -0.5s;	
`;

const Bird2 = styled(Bird)`
  animation-duration: 0.9s;
  animation-delay: -0.75s;
`;

const Bird3 = styled(Bird)`
  animation-duration: 1.25s;
  animation-delay: -0.25s;
`;

const steamAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scaleX(1);
    opacity: 0;
  }

  15% {
    opacity: 1;
  }
  
  50% {
    transform: translate3d(0, -35cqh, 0) scaleX(1.5);
  }

  95% {
    opacity: 0;
  }

  100% {
    transform: translate3d(0, -70cqh, 0) scaleX(2);
  }
`;

const SteamContainer = styled.div`
  display: flex;
  position: absolute;
  top: 45%;
  width: 47%;
  height: 30%;
  container-type: size; 
  justify-content: center;
`;

const Steam = styled.span<{ $value: number }>`
  position: relative;
  bottom: -25%;
  border-radius: 50%;
  min-width: 50px;
  height: 100%;
  background: #ffffff;
  filter: blur(50px);
  opacity: 0;
  animation: ${steamAnimation} 6s linear infinite;
  animation-delay: ${(props) => { return props.$value-- * 1; }}s;
`;

const Hero = styled.div<{ $isNavOpen: boolean }>`
  position: relative;
  height: 100vh;
  background-image: url('${HeroBackground}');
  background-position: center;
  background-size: cover;

  &::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #202020;
    content: "";
    opacity: ${(props) => { return (props.$isNavOpen ? 0.9 : 0); }};
    pointer-events: none;
    transition: opacity ${cubicBezier} 800ms;
  }
`;

const HeroText = styled.div`
  position: absolute;
  top: 25%;
  left: 50px;
  width: 46%;
  max-width: 60rem;
`;

const SiteTitle = styled.h2`
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 14rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  opacity: 0.85;
  text-transform: uppercase;
`;

const SiteDescription = styled.p`
  margin: 0 0 25px;
  color: #202020;
  font-family: 'Crimson Text', serif;
  font-size: 2.8rem;
  font-style: italic;
  font-weight: 600;
  opacity: 0.8;
`;

const DiscoverButton = styled.a`
  display: inline-block;
  border-radius: 1rem;
  padding: 0.2rem 1.1rem;
  height: 1.6rem;
  background: #ffffff;
  color: #303030;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.6rem;
  text-transform: uppercase;
  transition: all cubic-bezier(0.525, 0.06, 0.11, 0.995) 400ms;

  &:hover {
    color: #ffffff;
    background: #303030;
  }
`;

const NoticeText = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Home = () => {
  const isNavOpen: boolean = useSelector((state) => { return state.nav.isOpen; });
  const dispatch = useDispatch();

  const handleDiscoverButtonClick = (): void => {
    dispatch(open());
  };

  return (
    <FullPageWrapper>
      <Hero $isNavOpen={isNavOpen}>
        <BirdContainers>
          <BirdContainer1>
            <Bird1 />
          </BirdContainer1>
          <BirdContainer2>
            <Bird2 />
          </BirdContainer2>
          <BirdContainer3>
            <Bird3 />
          </BirdContainer3>
        </BirdContainers>
        <SteamContainer>
          <Steam $value={0.5} />
          <Steam $value={0.3} />
          <Steam $value={1.5} />
          <Steam $value={2.5} />
          <Steam $value={0.1} />
          <Steam $value={0.1} />
          <Steam $value={1.5} />
          <Steam $value={1} />
          <Steam $value={2.1} />
          <Steam $value={1.2} />
          <Steam $value={1.7} />
          <Steam $value={0.8} />
          <Steam $value={1.1} />
          <Steam $value={0.4} />
          <Steam $value={0.6} />
        </SteamContainer>
        <HeroText>
          <SiteTitle>Alvin Teh</SiteTitle>
          <SiteDescription>
            Passionate architect, photographer, cook, writer, traveler, guitarist and gamer among other things.
          </SiteDescription>
          <DiscoverButton onClick={handleDiscoverButtonClick}>Discover More</DiscoverButton>
        </HeroText>
        <NoticeText>&copy;{(new Date().getFullYear())}</NoticeText>
      </Hero>
    </FullPageWrapper>
  );
};

export default Home;
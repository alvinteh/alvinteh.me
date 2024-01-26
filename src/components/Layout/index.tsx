import keyMirror from 'keymirror';
import React, { useEffect, useState } from 'react';
import { Link as LinkRR, useLocation, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

import { useDispatch, useSelector } from '../../core/hooks';
import { open, toggle } from '../../slices/nav';
import { cubicBezier, Overlay, OverlayType, OverlayTypes, pageTransitionDuration } from '../static';
import { setPageTitle } from '../../utils/PageUtils';
import { SiteHeader } from '../static';
import LayoutContext from './LayoutContext';
import { NavItemData, navItemData } from './NavItemData';

type NavItemState = 'DEFAULT' | 'CURRENT' | 'DULLED';

interface NavItemAttrs {
  $backgroundImage: string;
}

interface MainAttrs {
  $isPageOpen: boolean;
  $currentPageIndex: number;
}

const NavItemStates: Record<NavItemState, NavItemState> = keyMirror({
  DEFAULT: null,
  CURRENT: null,
  DULLED: null,
});

const slideInAnimation = keyframes`
  0% {
    transform: translate3d(-100vw, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100vw, 0, 0);
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: #000000;
    color: #ffffff;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: #5080c0;
    text-decoration: none;

    &:visited {
      color: #5080c0;
    }
  }
`;

const MiscLink = styled.a`
  display: block;
  position: fixed;
  height: 1rem;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: Inter, sans-serif;
  font-weight: 600;
  line-height: 1rem;
  text-transform: uppercase;
  user-select: none;
  z-index: 99;

  &:hover {
    color: #808080;
  }
`;

const MenuLink = styled(MiscLink)<{ $isNavOpen: boolean, $isPageOpen: boolean }>`
  top: 25px;
  left: 50px;
  color: rgba(255, 255, 255, ${(props) => { return (props.$isNavOpen ? 0 : 1); }});
  transition: all ${cubicBezier} 200ms;

  &::after {
    display: block;
    position: absolute;
    top: 0;
    color: #ffffff;
    content: "${(props) => { return (props.$isPageOpen ? 'Back' : 'Close'); }}";
    opacity: ${(props) => { return (props.$isNavOpen ? 1 : 0); }};
    transition: all ${cubicBezier} 400ms 200ms;
  }

  &:hover {
    color: rgba(128, 128, 128, ${(props) => { return (props.$isNavOpen ? 0 : 1); }});
  }
`;

const ConnectLink = styled(MiscLink)`
  top: 25px;
  right: 50px;
`;

const LinkText = styled.span`
  display: block;
  margin: 0 0 7px;
  color: #ffffff;
  font-size: 2rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
`;

const LinkDescription = styled.span`
  display: block;
  color: #ffffff;
  filter: blur(1rem);
  font-family: 'Crimson Text', serif;
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 600;
  opacity: 0;
  transform: translate3d(0, 20px, 0);
  transition: transform 1ms 1200ms linear, opacity 400ms 100ms linear, filter 400ms 100ms linear;
`;

const Link = styled(LinkRR)`
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 80vh;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
`;

const OverlayCloseLink = styled(MiscLink)<{ $isNavOpen: boolean, $isPageOpen: boolean }>`
  top: 25px;
  left: 50px;
  color: rgba(255, 255, 255, 1);
  transition: all ${cubicBezier} 200ms;

  &:hover {
    color: rgba(128, 128, 128, 1);
  }
`;

// Note: background images should be at least 768/1037/3226px (cropped/hovered/expanded) * 2160px
const NavItem = styled.li.attrs<NavItemAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))<{ $state: NavItemState }>`
  display: block; 
  position: relative;
  height: 100%;
  flex: ${(props) => { return (props.$state === NavItemStates.CURRENT ? 21 : 1); }};
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  user-select: none;
  transition: flex ${cubicBezier} 400ms, filter ${cubicBezier} 400ms;

  &::after {
    display: ${(props) => { return (props.$state === NavItemStates.CURRENT ? 'none' : 'block') }};
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    backdrop-filter: blur(0);
    background: rgba(0, 0, 0, 0.2);
    pointer-events: none;
    transition: background-color ${cubicBezier} 1200ms;
    z-index: 2;
  }

  &:hover {
    flex: ${(props) => {
      if (props.$state === NavItemStates.DULLED) {
        return 1;
      }

      return (props.$state === NavItemStates.CURRENT ? 21 : 1.3);
    }};

    &::after {
      background: rgba(0, 0, 0, 0);
    }

    & ${LinkText} {
      filter: blur(0);
      color: rgba(255, 255, 255, ${(props) => { return props.$state === NavItemStates.CURRENT ? 0 : 1; }});
    }

    & ${LinkDescription} {
      filter: blur(${(props) => { return props.$state === NavItemStates.DEFAULT ? 0 : '1rem' }});
      opacity: ${(props) => { return props.$state === NavItemStates.DEFAULT ? 1 : 0 }};
      transform: translate3d(0, 0, 0);
      transition: all 400ms ${(props) => { return props.$state === NavItemStates.DEFAULT ? 300 : 0 }}ms;
    }
  }

  & ${LinkText} {
    filter: blur(${(props) => { return props.$state === NavItemStates.DEFAULT ? 0 : '1rem'; }});
    color: rgba(255, 255, 255, ${(props) => { return props.$state === NavItemStates.DEFAULT ? 1 : 0; }});
    transform: ${(props) => { return props.$state === NavItemStates.DULLED ? 'rotate(90deg)' : 'none'; }};
    transition: filter 400ms, color 400ms;
  }
`;

const NavList = styled.ul<{ $isPageOpen: boolean }>`
  display: flex;
  padding: 0;
  width: 100%;
  height: 100%;
  list-style: none;

  &:hover > ${NavItem}:not(:hover) {
    &::after {
      background: rgba(0, 0, 0, ${(props) => { return props.$isPageOpen ? 0.5 : 0.5; }});
      backdrop-filter: blur(${(props) => { return props.$isPageOpen ? 0 : 1; }}px);
    }
  }
`;

const Nav = styled.nav<{ $isNavOpen: boolean }>`
  position: relative;
  height: 100vh;
  filter: blur(${(props) => { return (props.$isNavOpen ? 0 : '0px'); }});
  opacity: ${(props) => { return (props.$isNavOpen ? 1 : 0); }};
  transition: ${(props) => {
    return (props.$isNavOpen ? 'all linear 1ms 800ms' : `all ${cubicBezier} 400ms 800ms`);
  }};

  &::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #202020;
    content: "";
    opacity: ${(props) => { return (props.$isNavOpen ? 0 : 0.9); }};
    transition: opacity ${cubicBezier} 800ms;
  }
`;

const Main = styled.main.attrs<MainAttrs>(({ $isPageOpen, $currentPageIndex }) => ({
  style: {
    transform: `translate3d(${$isPageOpen ? Math.max(0, $currentPageIndex) * 4 : 0}cqw, 0, 0)`,
    zIndex: $isPageOpen ? 3 : 0,
  }
}))`
  position: relative;
  width: 84%;
  min-height: 100vh;
`;

const StyledSiteHeader = styled(SiteHeader)<{ $isVisible: boolean }>`
  opacity: ${(props) => { return (props.$isVisible ? 1 : 0); }};
  transition-delay: ${(props) => { return (props.$isVisible ? pageTransitionDuration : 0); }}ms;
`;

const NavWrapper = styled.div<{ $isNavOpen: boolean, $isPageOpen: boolean }>`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: ${(props) => { return (props.$isNavOpen ? 'auto' : 'none'); }};
  z-index: 2;
  
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #1a1a1a;
    content: "";
    transform: translate3d(-100%, 0, 0);
    z-index: 99;
    animation: ${slideInAnimation} 800ms ${cubicBezier} 0ms 1 normal forwards,
      ${slideOutAnimation} 800ms ${cubicBezier} 1200ms 1 normal forwards;
    animation-play-state: ${(props) => { return (props.$isNavOpen && !props.$isPageOpen ? 'running' : 'paused'); }};
  }

  &:hover ~ ${Main}:not(:hover) {
    &::after {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(1px);
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  container-type: size;
`;

const FullScreenOverlayElement = styled(Overlay)`
  position: fixed;
`;

const FullScreenOverlay = ({ children, isToggled, overlayType, clickHandler }: {
  children: React.ReactNode,
  isToggled: boolean,
  overlayType: OverlayType,
  clickHandler: () => void,
}) => {
  return (
    <FullScreenOverlayElement
      $isToggled={isToggled}
      $type={overlayType}
      onClick={clickHandler}
    >
      <OverlayCloseLink>Close</OverlayCloseLink>
      {children}
    </FullScreenOverlayElement>
  )
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOverlayToggled, setIsOverlayToggled] = useState<boolean>(false);
  const [overlayContent, setOverlayContent] = useState<React.ReactNode>(<></>);

  const currentPage: string = location.pathname.substring(1).split('/')[0];
  const isPageOpen: boolean = currentPage !== '';
  // React Router has state typed as any; we have assertations as a failsafe
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const isFromInternalNav: boolean = location.state?.isFromInternalNav as boolean || false;
  const isNavOpen: boolean = useSelector((state) => { return state.nav.isOpen; });

  const handleMenuLinkClick = (): void => {    
    if (isPageOpen) {
      // Redirect to home page
      navigate('/', { state: { isFromInternalNav: true }});
    }
    else {
      // Update nav menu state
      dispatch(toggle());
      
      // Restart navigation animations on re-render
      ((): void => {
        const navAnimationNames: string[] = [];
        navAnimationNames.push(slideInAnimation.name);
        navAnimationNames.push(slideOutAnimation.name);
    
        document.getAnimations().forEach((animation: Animation) => {
          // @ts-expect-error TS incorrectly flags animationName as a non-existent property
          if (navAnimationNames.includes(animation.animationName as string)) {
            animation.cancel();
            animation.play();
          }
        });
      })();
    }
  };
 
  const navItems = navItemData.map((navItemData: NavItemData) => {
    let state: NavItemState = NavItemStates.DEFAULT;

    if (isPageOpen) {
      state = currentPage === navItemData.slug ? NavItemStates.CURRENT : NavItemStates.DULLED;
    }

    return (
      <NavItem
        key={navItemData.slug}
        $backgroundImage={navItemData.backgroundImage}
        $state={state}
      >
        <Link to={'/' + navItemData.slug}>
          <LinkText>{navItemData.text}</LinkText>
          <LinkDescription>{navItemData.description}</LinkDescription>
        </Link>
      </NavItem>
    );
  });

  const currentPageIndex: number = navItemData.findIndex((navItemData: NavItemData) => {
    return navItemData.slug === currentPage;
  });

  useEffect((): void => {
    if (isPageOpen && !isNavOpen) {
      dispatch(open());
    }
    else if (!isPageOpen) {
      setPageTitle('');
    }
  });

  const handleFullScreenOverlayClick = (): void => {
    setIsOverlayToggled(false);
  };

  return (
    <LayoutContext.Provider value={{ isOverlayToggled, setIsOverlayToggled, setOverlayContent }}>
      <GlobalStyle />
      <Wrapper>
        <NavWrapper $isNavOpen={isNavOpen} $isPageOpen={isPageOpen || isFromInternalNav}>
          <StyledSiteHeader $isVisible={isNavOpen && !isPageOpen}><LinkRR to="/">Alvin Teh</LinkRR></StyledSiteHeader>
          <Nav $isNavOpen={isNavOpen}>
            <NavList $isPageOpen={isPageOpen}>
              {navItems}
            </NavList>
          </Nav>
        </NavWrapper>
        <MenuLink onClick={handleMenuLinkClick} $isNavOpen={isNavOpen} $isPageOpen={isPageOpen}>Menu</MenuLink>
        <ConnectLink>Connect</ConnectLink>
        <Main $isPageOpen={isPageOpen} $currentPageIndex={currentPageIndex}>
            {children}
        </Main>
        <FullScreenOverlay
          isToggled={isOverlayToggled}
          overlayType={OverlayTypes.STRONG}
          clickHandler={handleFullScreenOverlayClick}
        >
          {overlayContent}
        </FullScreenOverlay>
      </Wrapper>
    </LayoutContext.Provider>
  );
};

export default Layout;
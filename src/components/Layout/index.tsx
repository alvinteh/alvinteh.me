import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/sharp-regular-svg-icons';
import keyMirror from 'keymirror';
import React, { useEffect, useState } from 'react';
import { Link as LinkRR, useLocation, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

import { useDispatch, useSelector } from '../../core/hooks';
import { close, open, toggle } from '../../slices/nav';
import { cubicBezier, pageTransitionDuration } from '../static';
import { screenSizes } from '../../utils/ResponsiveUtils';
import { setPageTitle } from '../../utils/PageUtils';
import { SiteHeader } from '../static';
import Dialog from './Dialog';
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

  @media ${screenSizes.phone} {
    font-size: 0.7rem;
  }
`;

const MenuLink = styled(MiscLink)<{ $isNavOpen: boolean, $isPageOpen: boolean }>`
  top: 25px;
  left: 50px;
  color: rgba(255, 255, 255, ${(props) => { return (props.$isNavOpen ? 0 : 1); }});
  transition: all ${cubicBezier} 200ms;

  @media ${screenSizes.phone} {
    top: 15px;
    left: 20px;
  }

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

    &::after {
      color: #808080;
    }
  }
`;

const ConnectLink = styled(MiscLink)`
  top: 25px;
  right: 50px;

  @media ${screenSizes.phone} {
    top: 15px;
    right: 20px;
  }
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

  @media ${screenSizes.phone} {
    padding-top: 0;
    top: 50%;
    line-height: 100%;
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

  @media ${screenSizes.phone} {
    flex: ${(props) => {
      if (props.$state === NavItemStates.CURRENT) {
        return 21;
      }
      if (props.$state === NavItemStates.DULLED) {
        return 0;
      }
      
      return  1;
    }};
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

  @media ${screenSizes.phone} {
    flex-direction: column;
  }

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
  cursor: pointer;  
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

const ConnectDialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: solid 1px rgba(255, 255, 255, 0.3);
  width: 30rem;
  height: fit-content;
  background: #202020;
  color: #ffffff;
  font-family: "Barlow Condensed", sans-serif;
  transform: translate3d(-50%, -50%, 0);

  @media ${screenSizes.phone} {
    width: calc(100% - 40px);
  }
`;

const DialogTitle = styled.h4`
  margin: 0;
  padding: 10px 25px;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  text-transform: uppercase;
`;

const DialogContent = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.3);
  border-bottom: solid 1px rgba(255, 255, 255, 0.3);
  padding: 25px;  
  font-family: "Crimson Text", serif;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;

const DialogButton = styled.button`
  display: block;
  margin: 10px 0;
  border: none;
  padding: 5px 20px;
  float: right;
  background: none;
  color: #ffffff;
  cursor: pointer;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.25rem;
  line-height: 1.1rem;
  outline: none;
  text-transform: uppercase;

  &:hover {
    color: #80f5f5;
  }
`;

const ProfileLinks = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ProfileLink = styled.li`
  margin: 0 0 0.5rem;
  padding: 0;
  font-family: Lato, sans-serif;
  font-size: 1.1rem;
  line-height: 1.25rem;

  a:link, a:visited {
    color: #ffffff;
  }

  a:hover {
    color: #80f5f5;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogToggled, setIsDialogToggled] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(<></>);

  const currentPage: string = location.pathname.substring(1).split('/')[0];
  const isPageOpen: boolean = currentPage !== '';
  // React Router has state typed as any; we have assertations as a failsafe
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const isFromInternalNav: boolean = location.state?.isFromInternalNav as boolean || false;
  const isNavOpen: boolean = useSelector((state) => { return state.nav.isOpen; });

  const resetAnimations = (): void => {
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
  }

  const handleMenuLinkClick = (): void => {    
    if (isPageOpen) {
      // Redirect to home page
      navigate('/', { state: { isFromInternalNav: true }});
    }
    else {
      // Update nav menu state
      dispatch(toggle());
      
      // Reset navigation animations on re-render
      resetAnimations();
    }
  };

  const handleConnectDialogButtonClick = (): void => {
    setIsDialogToggled(false);
  };

  const handleConnectLinkClick = (): void => {
    const dialogContent: React.ReactNode = (
      <ConnectDialog>
        <DialogTitle>Connect with Me</DialogTitle>
          <DialogContent>
          Want to connect on a topic? Feel free to reach out on the following platforms:
          <br />
          <br />
          <ProfileLinks>
            <ProfileLink><a href="https://linkedin.com/in/alteh" target="_blank" rel="external noreferrer"><StyledFontAwesomeIcon icon={faLinkedin} fixedWidth />LinkedIn</a></ProfileLink>
            <ProfileLink><a href="https://github.com/alvinteh" target="_blank" rel="external noreferrer"><StyledFontAwesomeIcon icon={faGithub} fixedWidth />GitHub</a></ProfileLink>
            <ProfileLink><a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#64;&#97;&#108;&#118;&#105;&#110;&#116;&#101;&#104;&#46;&#109;&#101;"><StyledFontAwesomeIcon icon={faEnvelope} fixedWidth />Email</a></ProfileLink>
          </ProfileLinks>
        </DialogContent>
        <DialogButton onClick={handleConnectDialogButtonClick}>Return</DialogButton>
      </ConnectDialog>
    );

    setDialogContent(dialogContent);
    setIsDialogToggled(true);
  };
  
  const handleSiteHeaderClick = (): void => {
    dispatch(close());

    // Reset navigation animations on re-render
    resetAnimations();
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
    // We can ignore the linting issue as React Router has state typed as any; we have assertations as a failsafe
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else if (location.state?.isForcedHomeNavigation === true) {
      navigate('/', { replace: true });
      dispatch(close());
      resetAnimations();
    }
    else if (!isPageOpen) {
      setPageTitle('');
    }
  });

  return (
    <LayoutContext.Provider value={{ isDialogToggled: isDialogToggled, setIsDialogToggled, setDialogContent }}>
      <GlobalStyle />
      <Wrapper>
        <NavWrapper $isNavOpen={isNavOpen} $isPageOpen={isPageOpen || isFromInternalNav}>
          <StyledSiteHeader $isVisible={isNavOpen && !isPageOpen}>
            <a onClick={handleSiteHeaderClick}>Alvin Teh</a>
          </StyledSiteHeader>
          <Nav $isNavOpen={isNavOpen}>
            <NavList $isPageOpen={isPageOpen}>
              {navItems}
            </NavList>
          </Nav>
        </NavWrapper>
        <MenuLink onClick={handleMenuLinkClick} $isNavOpen={isNavOpen} $isPageOpen={isPageOpen}>Menu</MenuLink>
        <ConnectLink onClick={handleConnectLinkClick}>Connect</ConnectLink>
        <Main $isPageOpen={isPageOpen} $currentPageIndex={currentPageIndex}>
            {children}
            <Dialog>
              {dialogContent}
            </Dialog>
        </Main>
      </Wrapper>
    </LayoutContext.Provider>
  );
};

export default Layout;
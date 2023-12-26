import { useRef } from 'react';

import { ParallaxPageWrapper } from '../../components/static';
import ScrollPrompt from '../../components/ScrollPrompt';
import CasualDiningScene from './scenes/CasualDiningScene';
import CookScene from './scenes/CookScene';
import DrinksScene from './scenes/DrinksScene';
import FineDiningScene from './scenes/FineDiningScene';
import MapScene from './scenes/MapScene';
import TitleScene from './scenes/TitleScene';

const Culinary = () => {
  const pageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  return (
    <ParallaxPageWrapper ref={pageRef}>
      <TitleScene />
      <FineDiningScene />
      <CasualDiningScene />
      <DrinksScene />
      <MapScene />
      <CookScene />
      <ScrollPrompt pageRef={pageRef} />
    </ParallaxPageWrapper>
  );
};

export default Culinary;
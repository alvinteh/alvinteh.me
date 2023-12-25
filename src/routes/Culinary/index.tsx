import { useRef } from 'react';

import { ParallaxPageWrapper } from '../../components/static';
import ScrollPrompt from '../../components/ScrollPrompt';
import CasualDiningScreen from './screens/CasualDiningScreen';
import CookScreen from './screens/CookScreen';
import DrinksScreen from './screens/DrinksScreen';
import FineDiningScreen from './screens/FineDiningScreen';
import MapScreen from './screens/MapScreen';
import TitleScreen from './screens/TitleScreen';

const Culinary = () => {
  const pageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  return (
    <ParallaxPageWrapper ref={pageRef}>
      <TitleScreen />
      <FineDiningScreen />
      <CasualDiningScreen />
      <DrinksScreen />
      <MapScreen />
      <CookScreen />
      <ScrollPrompt pageRef={pageRef} />
    </ParallaxPageWrapper>
  );
};

export default Culinary;
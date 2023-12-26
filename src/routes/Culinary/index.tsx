import { useEffect, useRef } from 'react';

import { ParallaxPageWrapper } from '../../components/static';
import ScrollPrompt from '../../components/ScrollPrompt';
import PageContext from '../../utils/PageContext';
import CasualDiningScene from './scenes/CasualDiningScene';
import CookScene from './scenes/CookScene';
import DrinksScene from './scenes/DrinksScene';
import FineDiningScene from './scenes/FineDiningScene';
import MapScene from './scenes/MapScene';
import TitleScene from './scenes/TitleScene';
import { setPageTitle } from '../../utils/PageUtils';

const Culinary = () => {
  const titleSuffix = 'Culinary';
  const pageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  useEffect((): void => {
    setPageTitle(titleSuffix);
  });

  return (
    <PageContext.Provider value={{ titleSuffix }}>
      <ParallaxPageWrapper ref={pageRef}>
        <TitleScene />
        <FineDiningScene />
        <CasualDiningScene />
        <DrinksScene />
        <MapScene />
        <CookScene />
        <ScrollPrompt pageRef={pageRef} />
      </ParallaxPageWrapper>
    </PageContext.Provider>
  );
};

export default Culinary;
import { useRef } from 'react';

import ParallaxScreen from '../../../../components/ParallaxScreen';
import SceneBackground from './images/scene-drinks.jpg'

const DrinksScene = () => {
  // Screen refs and nodes
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  return (
    <ParallaxScreen
      innerRef={screenRef}
      backgroundImage={SceneBackground}
      title="Cocktail Bar Experiences"
    >
    </ParallaxScreen>
  );
};

export default DrinksScene;
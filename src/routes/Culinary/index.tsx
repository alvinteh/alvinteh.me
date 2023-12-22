import { ParallaxPageWrapper } from '../../components/static';
import ScrollPrompt from '../../components/ScrollPrompt';
import CasualDiningScreen from './screens/CasualDiningScreen';
import CookScreen from './screens/CookScreen';
import DrinksScreen from './screens/DrinksScreen';
import FineDiningScreen from './screens/FineDiningScreen';
import TitleScreen from './screens/TitleScreen';

const Culinary = () => {
  return (
    <ParallaxPageWrapper>
      <TitleScreen />
      <FineDiningScreen />
      <CasualDiningScreen />
      <DrinksScreen />
      <CookScreen />
      <ScrollPrompt />
    </ParallaxPageWrapper>
  );
};

export default Culinary;
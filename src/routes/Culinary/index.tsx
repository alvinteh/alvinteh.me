import Page from '../../components/Page';
import CasualDiningScene from './scenes/CasualDiningScene';
import CookScene from './scenes/CookScene';
import DrinksScene from './scenes/DrinksScene';
import FineDiningScene from './scenes/FineDiningScene';
import MapScene from './scenes/MapScene';
import TitleScene from './scenes/TitleScene';

const Culinary = () => {
  return (
    <Page titleSuffix="Culinary" shouldHaveScrollPrompt={true} isMobileReady={false}>
      <TitleScene sceneIndex={0} />
      <FineDiningScene sceneIndex={1} />
      <CasualDiningScene sceneIndex={2} />
      <DrinksScene sceneIndex={3} />
      <MapScene sceneIndex={4} />
      <CookScene sceneIndex={5} />
    </Page>
  );
};

export default Culinary;
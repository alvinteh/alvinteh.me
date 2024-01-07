import PageBase from '../../components/PageBase';
import CasualDiningScene from './scenes/CasualDiningScene';
import CookScene from './scenes/CookScene';
import DrinksScene from './scenes/DrinksScene';
import FineDiningScene from './scenes/FineDiningScene';
import MapScene from './scenes/MapScene';
import TitleScene from './scenes/TitleScene';

const Culinary = () => {
  return (
    <PageBase titleSuffix="Culinary" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
      <FineDiningScene sceneIndex={1} />
      <CasualDiningScene sceneIndex={2} />
      <DrinksScene sceneIndex={3} />
      <MapScene sceneIndex={4} />
      <CookScene sceneIndex={5} />
    </PageBase>
  );
};

export default Culinary;
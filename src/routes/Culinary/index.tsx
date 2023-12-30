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
      <TitleScene />
      <FineDiningScene />
      <CasualDiningScene />
      <DrinksScene />
      <MapScene />
      <CookScene />
    </PageBase>
  );
};

export default Culinary;
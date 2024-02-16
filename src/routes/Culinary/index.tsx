import Page from '../../components/Page';
import { PageMeta } from '../../components/Page/types';
import CasualDiningScene from './scenes/CasualDiningScene';
import CookScene from './scenes/CookScene';
import DrinksScene from './scenes/DrinksScene';
import FineDiningScene from './scenes/FineDiningScene';
import MapScene from './scenes/MapScene';
import TitleScene from './scenes/TitleScene';

const Culinary = () => {
  const meta: PageMeta = {
    title: 'Culinary',
    description: 'Explore dining experiences and recipes from around the world with Alvin',
    image: '/images/og-culinary.jpg',
  };

  return (
    <Page meta={meta} shouldHaveScrollPrompt={true}>
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
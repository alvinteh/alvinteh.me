import Page from '../../components/Page';
import { PageMeta } from '../../components/Page/types';
import LifeScene from './scenes/LifeScene';
import PoetryScene from './scenes/PoetryScene';
import TitleScene from './scenes/TitleScene';

const Literary = () => {
  const meta: PageMeta = {
    title: 'Literary',
    description: 'Engage your mind with philosophical topics through literature written by Alvin',
    image: '/images/og-literary.jpg',
  };

  return (
    <Page meta={meta} shouldHaveScrollPrompt={true} isMobileReady={false}>
      <TitleScene sceneIndex={0} />
      <LifeScene sceneIndex={1} />
      <PoetryScene sceneIndex={2} />
    </Page>
  );
};

export default Literary;
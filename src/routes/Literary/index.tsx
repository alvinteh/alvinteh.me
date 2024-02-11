import Page from '../../components/Page';
import LifeScene from './scenes/LifeScene';
import PoetryScene from './scenes/PoetryScene';
import TitleScene from './scenes/TitleScene';

const Literary = () => {
  return (
    <Page titleSuffix="Literary" shouldHaveScrollPrompt={true} isMobileReady={false}>
      <TitleScene sceneIndex={0} />
      <LifeScene sceneIndex={1} />
      <PoetryScene sceneIndex={2} />
    </Page>
  );
};

export default Literary;
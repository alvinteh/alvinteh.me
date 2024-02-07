import Page from '../../components/Page';
import LifeScene from './scenes/LifeScene';
import TitleScene from './scenes/TitleScene';

const Literary = () => {
  return (
    <Page titleSuffix="Literary" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
      <LifeScene sceneIndex={1} />
    </Page>
  );
};

export default Literary;
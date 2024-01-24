import Page from '../../components/Page';
import TitleScene from './scenes/TitleScene';

const Literary = () => {
  return (
    <Page titleSuffix="Literary" shouldHaveScrollPrompt={false}>
      <TitleScene sceneIndex={0} />
    </Page>
  );
};

export default Literary;
import Page from '../../components/Page';
import BuilderScene from './scenes/BuilderScene';
import TitleScene from './scenes/TitleScene';

const Technology = () => {
  return (
    <Page titleSuffix="Technology" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
      <BuilderScene sceneIndex={1} />
    </Page>
  );
};

export default Technology;
import Page from '../../components/Page';
import TitleScene from './scenes/TitleScene';
import WriteupScene from './scenes/WriteupScene';

const Technology = () => {
  return (
    <Page titleSuffix="Technology" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
      <WriteupScene sceneIndex={1} />
    </Page>
  );
};

export default Technology;
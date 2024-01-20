import Page from '../../components/Page';
import TitleScene from './scenes/TitleScene';

const Visual = () => {
  return (
    <Page titleSuffix="Technology" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
    </Page>
  );
};

export default Visual;
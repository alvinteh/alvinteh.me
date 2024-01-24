import Page from '../../components/Page';
import MainScene from './scenes/MainScene';

const About = () => {
  return (
    <Page titleSuffix="About" shouldHaveScrollPrompt={false}>
      <MainScene sceneIndex={0} />
    </Page>
  );
};

export default About;
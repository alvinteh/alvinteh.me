import Page from '../../components/Page';
import MainScene from './scenes/MainScene';

const About = () => {
  return (
    <Page titleSuffix="About" shouldHaveScrollPrompt={false}>
      <MainScene />
    </Page>
  );
};

export default About;
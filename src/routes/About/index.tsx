import PageBase from '../../components/PageBase';
import MainScene from './scenes/MainScene';

const About = () => {
  return (
    <PageBase titleSuffix="About" shouldHaveScrollPrompt={false}>
      <MainScene />
    </PageBase>
  );
};

export default About;
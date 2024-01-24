import Page from '../../components/Page';
import CompaniesScene from './scenes/CompaniesScene';
import TechStackScene from './scenes/TechStackScene';
import TitleScene from './scenes/TitleScene';
import WriteupScene from './scenes/WriteupScene';

const Technology = () => {
  return (
    <Page titleSuffix="Technology" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
      <WriteupScene sceneIndex={1} />
      <CompaniesScene sceneIndex={2} />
      <TechStackScene sceneIndex={3} />
    </Page>
  );
};

export default Technology;
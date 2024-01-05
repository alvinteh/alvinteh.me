import PageBase from '../../components/PageBase';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';

const Visual = () => {
  return (
    <PageBase titleSuffix="Visual" shouldHaveScrollPrompt={true}>
      <TitleScene />
      <WorldScene />
    </PageBase>
  );
};

export default Visual;
import PageBase from '../../components/PageBase';
import TitleScene from './scenes/TitleScene';

const Visual = () => {
  return (
    <PageBase titleSuffix="Visual" shouldHaveScrollPrompt={true}>
      <TitleScene />
    </PageBase>
  );
};

export default Visual;
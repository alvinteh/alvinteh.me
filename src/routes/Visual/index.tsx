import PageBase from '../../components/PageBase';
import StatsScene from './scenes/StatsScene';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';

const Visual = () => {
  return (
    <PageBase titleSuffix="Visual" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
      <WorldScene sceneIndex={1} />
      <StatsScene sceneIndex={2} />
    </PageBase>
  );
};

export default Visual;
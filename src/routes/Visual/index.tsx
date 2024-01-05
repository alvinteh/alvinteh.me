import PageBase from '../../components/PageBase';
import StatsScene from './scenes/StatsScene';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';

const Visual = () => {
  return (
    <PageBase titleSuffix="Visual" shouldHaveScrollPrompt={true}>
      <TitleScene />
      <WorldScene />
      <StatsScene />
    </PageBase>
  );
};

export default Visual;
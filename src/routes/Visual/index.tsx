import Page from '../../components/Page';
import GalleryScene from './scenes/GalleryScene';
import StatsScene from './scenes/StatsScene';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';

const Visual = () => {
  return (
    <Page titleSuffix="Visual" shouldHaveScrollPrompt={true}>
      <TitleScene sceneIndex={0} />
      <GalleryScene sceneIndex={1} />
      <WorldScene sceneIndex={2} />
      <StatsScene sceneIndex={3} />
    </Page>
  );
};

export default Visual;
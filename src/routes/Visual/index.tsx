import Page from '../../components/Page';
import GalleryScene from './scenes/GalleryScene';
import StatsScene from './scenes/StatsScene';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';

const Visual = () => {
  return (
    <Page titleSuffix="Visual" shouldHaveScrollPrompt={true} isMobileReady={false}>
      <TitleScene sceneIndex={0} />
      <WorldScene sceneIndex={1} />
      <GalleryScene sceneIndex={2} />
      <StatsScene sceneIndex={3} />
    </Page>
  );
};

export default Visual;
import Page from '../../components/Page';
import { PageMeta } from '../../components/Page/types';
import GalleryScene from './scenes/GalleryScene';
import StatsScene from './scenes/StatsScene';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';

const Visual = () => {
  const meta: PageMeta = {
    title: 'Visual',
    description: 'See more of Alvin\'s adventures around the world through his photography.',
    image: '/images/og-visual.jpg',
  };

  return (
    <Page meta={meta} shouldHaveScrollPrompt={true} isMobileReady={false}>
      <TitleScene sceneIndex={0} />
      <WorldScene sceneIndex={1} />
      <GalleryScene sceneIndex={2} />
      <StatsScene sceneIndex={3} />
    </Page>
  );
};

export default Visual;
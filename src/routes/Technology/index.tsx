import Page from '../../components/Page';
import { PageMeta } from '../../components/Page/types';
import BuilderScene from './scenes/BuilderScene';
import TitleScene from './scenes/TitleScene';

const Technology = () => {
  const meta: PageMeta = {
    title: 'Technology',
    description: 'Learn about Alvin\'s professional technology experience as an architect, developer and product craftsperson.',
    image: '/images/og-technology.jpg',
  };

  return (
    <Page meta={meta} shouldHaveScrollPrompt={true} isMobileReady={false}>
      <TitleScene sceneIndex={0} />
      <BuilderScene sceneIndex={1} />
    </Page>
  );
};

export default Technology;
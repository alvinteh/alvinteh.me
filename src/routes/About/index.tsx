import Page from '../../components/Page';
import { PageMeta } from '../../components/Page/types';
import MainScene from './scenes/MainScene';

const About = () => {
  const meta: PageMeta = {
    title: 'About',
    description: 'Learn more about Alvin, an enthusiast on tech, fashion, food, poetry, games, photography, '
      + 'hiking, philosophy and music.',
    image: '/images/og-about.jpg',
  };

  return (
    <Page meta={meta} shouldHaveScrollPrompt={false}>
      <MainScene sceneIndex={0} />
    </Page>
  );
};

export default About;
import NavItemAboutBackground from './images/navitem-about.jpg';
import NavItemCulinaryBackground from './images/navitem-culinary.jpg';
import NavItemLiteryBackground from './images/navitem-literary.jpg';
import NavItemVisualBackground from './images/navitem-visual.jpg';
import NavItemTechnologyBackground from './images/navitem-technology.jpg';

interface NavItemData {
  slug: string;
  text: string;
  description: string;
  backgroundImage: string;
}

const navItemData: NavItemData[] = [
  {
    slug: 'about',
    text: 'About',
    description: 'Story & Profile',
    backgroundImage: NavItemAboutBackground,
  },
  {
    slug: 'culinary',
    text: 'Culinary',
    description: 'Dining Experiences & Recipes',
    backgroundImage: NavItemCulinaryBackground,
  },
  {
    slug: 'visual',
    text: 'Visual',
    description: 'Still Portraits of the World',
    backgroundImage: NavItemVisualBackground,
  },
  {
    slug: 'literary',
    text: 'Literary',
    description: 'Musings of the Mind',
    backgroundImage: NavItemLiteryBackground,
  },
  {
    slug: 'technology',
    text: 'Technology',
    description: 'Systems Architecture & Code',
    backgroundImage: NavItemTechnologyBackground,
  },
];

export type { NavItemData };
export { navItemData };
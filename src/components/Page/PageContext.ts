import gsap from 'gsap';
import { createContext } from 'react';

interface PageContext {
  titleSuffix: string;
  pageTimeline: gsap.core.Timeline;
  registerScene: (index: number, ref: React.MutableRefObject<HTMLDivElement>, timeline: gsap.core.Timeline) => void;
}

const PageContext = createContext<PageContext>({
  titleSuffix: '',
  pageTimeline: gsap.timeline({}),
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  registerScene: (): void => {},
});

export type { PageContext };
export default PageContext;
import { createContext } from 'react';

interface PageContext {
  pageObserverName: string;
  registerScene: (
    index: number,
    ref: React.MutableRefObject<HTMLDivElement>,
    timeline: gsap.core.Timeline,
    title?: string,
  ) => void;
}

const PageContext = createContext<PageContext>({
  pageObserverName: '',
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  registerScene: (): void => {},
});

export type { PageContext };
export default PageContext;
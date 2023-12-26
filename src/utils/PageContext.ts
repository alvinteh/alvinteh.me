import { createContext } from 'react';

interface PageContext {
  titleSuffix: string,
}

const PageContext = createContext<PageContext>({
  titleSuffix: '',
});

export type { PageContext };
export default PageContext;
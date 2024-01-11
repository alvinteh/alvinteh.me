import { createContext } from 'react';

interface ScrollPromptContext {
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
}

const ScrollPromptContext = createContext<ScrollPromptContext>({
  isEnabled: true,
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setIsEnabled: (): void => {},
});

export type { ScrollPromptContext };
export default ScrollPromptContext;
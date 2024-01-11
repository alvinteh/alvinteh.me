import { createContext } from 'react';

interface LayoutContext {
  isOverlayToggled: boolean;
  setIsOverlayToggled: (isOverlayToggled: boolean) => void;
}

const LayoutContext = createContext<LayoutContext>({
  isOverlayToggled: false,
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setIsOverlayToggled: (): void => {},
});

export type { LayoutContext };
export default LayoutContext;
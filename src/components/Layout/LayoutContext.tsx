import { createContext } from 'react';

interface LayoutContext {
  isDialogToggled: boolean;
  setIsDialogToggled: (isDialogToggled: boolean) => void;
  setDialogContent: (content: React.ReactNode) => void;
}

const LayoutContext = createContext<LayoutContext>({
  isDialogToggled: false,
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setIsDialogToggled: (): void => {},
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setDialogContent: (): void => {},
});

export type { LayoutContext };
export default LayoutContext;
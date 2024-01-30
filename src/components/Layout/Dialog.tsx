import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { cubicBezier } from '../static';
import LayoutContext from './LayoutContext';

interface DialogContentAttrs {
  $x: number;
}

const DialogElement = styled.dialog`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  border: 0;
  padding: 0;
  max-width: none;
  max-height: none;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
`;

const DialogContent = styled.div.attrs<DialogContentAttrs>(({ $x = 0 }) => ({
  style: {
    transform: `translate3d(${$x}px, 0, 0)`,
  }
}))`
  width: 84vw;
  height: 100vh;
`;

const DialogCloseLink = styled.a`
  display: block;
  position: fixed;
  top: 25px;
  left: 50px;
  height: 1rem;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  font-size: 0.8rem;
  font-family: Inter, sans-serif;
  font-weight: 600;
  line-height: 1rem;
  text-transform: uppercase;
  user-select: none;
  z-index: 99;
  transition: all ${cubicBezier} 200ms;

  &:hover {
    color: rgba(128, 128, 128, 1);
  }
`;

const Dialog = ({ children }: { children: React.ReactNode }) => {
  const { isDialogToggled, setIsDialogToggled } = useContext(LayoutContext);
  const [dialogPositionX, setDialogPositionX] = useState<number>(0);
  const dialogRef = useRef<HTMLDialogElement>() as React.MutableRefObject<HTMLDialogElement>;
  const dialogContentRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const handleDialogCloseLinkClick = (): void => {
    setIsDialogToggled(false);
  }

  useEffect(() => {
    const dialogElement: HTMLDialogElement = dialogRef.current;
    // We can ignore the linting error as the dialog's parent is the main element
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const mainElement: HTMLElement = dialogElement.parentElement!;
    const mainElementBounds: DOMRect = mainElement.getBoundingClientRect();

    setDialogPositionX(mainElementBounds.x);

    if (isDialogToggled) {
      dialogElement.showModal();
    }
    else {
      dialogElement.close();
    }
  }, [isDialogToggled]);

  return (
    <DialogElement ref={dialogRef}>
      <DialogContent ref={dialogContentRef} $x={dialogPositionX}>
        {children}
      </DialogContent>
      <DialogCloseLink onClick={handleDialogCloseLinkClick}>Close</DialogCloseLink>
    </DialogElement>
  )
};

export default Dialog;
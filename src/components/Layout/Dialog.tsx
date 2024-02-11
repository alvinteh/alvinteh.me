import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { cubicBezier, fadeInAnimation } from '../static';
import { animationDurations } from '../../utils/AnimationUtils';
import { screenSizes } from '../../utils/ResponsiveUtils';
import LayoutContext from './LayoutContext';

interface DialogXPositionAttrs {
  $x: number;
}

// Note that there's no fade out animation due to an issue with ::backdrop
// In addition, as of time of writing, styled-components does not support @starting-styles, making this
// issue unresolvable (idiomatically) for the time being
// Also note that $x adjustments are due to Chrome "swapping" the dialog positioning context to/fro the parent
// element and the document root
const DialogElement = styled.dialog<{ $x: number}>`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  border: 0;
  padding: 0;
  max-width: none;
  max-height: none;
  width: 84vw;
  height: 100dvh;
  background: none;
  outline: none;
  overflow: visible;
  transform: translate3d(0, 0, 0);
  animation: none;

  &[open] {
    transform: translate3d(${(props) => { return props.$x; }}px, 0, 0);
    animation: ${fadeInAnimation} ${cubicBezier} ${animationDurations.MEDIUM}s;

    &::backdrop {
      animation: ${fadeInAnimation} ${cubicBezier} ${animationDurations.MEDIUM}s;
    }
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.9);
    animation: none;
  }

  @media ${screenSizes.phone} {
    width: 100%;
  }
`;

const DialogContent = styled.div`
  width: 100%;
  height: 100dvh;
  overflow: hidden;
`;

const DialogCloseLink = styled.a.attrs<DialogXPositionAttrs>(({ $x }) => ({
  style: {
    transform: `translate3d(-${$x}px, 0, 0)`,
  }
}))`
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
  transition: all ${cubicBezier} ${animationDurations.XFAST}s;

  &:hover {
    color: rgba(128, 128, 128, 1);
  }
`;

const Dialog = ({ children }: { children: React.ReactNode }) => {
  const { isDialogToggled, setIsDialogToggled } = useContext(LayoutContext);
  const [dialogPositionX, setDialogPositionX] = useState<number>(0);
  const dialogRef = useRef<HTMLDialogElement>() as React.MutableRefObject<HTMLDialogElement>;

  const handleDialogCloseLinkClick = (): void => {
    setIsDialogToggled(false);
  }

  useEffect(() => {
    const dialogElement: HTMLDialogElement = dialogRef.current;
    
    if (isDialogToggled) {
      dialogElement.showModal();
    }
    else {
      dialogElement.close();
    }
  }, [isDialogToggled]);

  useEffect(() => {
    const dialogElement: HTMLDialogElement = dialogRef.current;
    // We can ignore the linting error as the dialog's parent is the main element
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const mainElement: HTMLElement = dialogElement.parentElement!;
    const mainElementBounds: DOMRect = mainElement.getBoundingClientRect();

    setDialogPositionX(mainElementBounds.x);
  }, []);

  return (
    <DialogElement ref={dialogRef} $x={dialogPositionX}>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogCloseLink $x={dialogPositionX} onClick={handleDialogCloseLinkClick}>Close</DialogCloseLink>
    </DialogElement>
  )
};

export default Dialog;
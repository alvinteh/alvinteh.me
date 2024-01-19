import gsap from 'gsap';
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import LayoutContext from '../../../../../components/Layout/LayoutContext';
import ScrollPromptContext from '../../../../../components/ScrollPrompt/ScrollPromptContext';
import { getElementTranslation } from '../../../../../utils/StyleUtils';
import { Image } from '../types';
import { FullImageAttrs, GalleryImage } from './types';
import { galleryItemPadding } from './common';

const FullImageViewerElement = styled.div`
  position: absolute;
  overflow: hidden;
`;

const FullImage = styled.div.attrs<FullImageAttrs>(({ $width, $height, $backgroundImage }) => ({
  style: {
    backgroundImage: $backgroundImage ? `url(${$backgroundImage})` : 'none',
    width: `${$width}px`,
    height: `${$height}px`,
  }
}))`
  position: absolute;
  background-size: cover;
  background-position: center;
`;

const Caption = styled.div`
  position: absolute;
  width: 100%;
  font-family: Lato, sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;
`;

const FullImageViewer = ({ isActive, galleryImage, galleryItemHeight, galleryRef } : {
  isActive: boolean,
  galleryImage: GalleryImage | undefined,
  galleryItemHeight: number,
  galleryRef: React.MutableRefObject<HTMLDivElement>,
}) => {
  const { isOverlayToggled, setIsOverlayToggled, setOverlayContent } = useContext(LayoutContext);
  const { setIsEnabled: setIsScrollPromptEnabled } = useContext(ScrollPromptContext);

  const fullImageViewerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const fullImageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const captionRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  useEffect((): void => {
    if (isActive && galleryImage) {
      const overlayContent: React.ReactNode = (
        <FullImageViewerElement ref={fullImageViewerRef}>
          <FullImage
            ref={fullImageRef}
            $width={Math.round(galleryImage.image.aspectRatio * galleryItemHeight)}
            $height={galleryItemHeight}
            $backgroundImage={galleryImage.image.src}
            onClick={handleClick}
          />
          <Caption ref={captionRef} onClick={handleClick}>{galleryImage.image.caption}</Caption>
        </FullImageViewerElement>
      );

      setIsScrollPromptEnabled(false);
      setOverlayContent(overlayContent);
      setIsOverlayToggled(true);
    }
    else {
      setIsScrollPromptEnabled(true);
      setIsOverlayToggled(false);
    }
  }, [
    isActive,
    galleryImage,
    galleryItemHeight,
    setIsScrollPromptEnabled,
    setIsOverlayToggled,
    setOverlayContent
  ]);

  useEffect((): void => {
    if (!isOverlayToggled || !isActive || !galleryImage) {
      return;
    }

    const image: Image = galleryImage.image;
    // We can ignore the linting error as the element exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const galleryImageElement: HTMLDivElement = document.querySelector(`div[data-id="${galleryImage.id}"]`)!;
    const galleryElement: HTMLDivElement = galleryRef.current;
    const galleryBounds: DOMRect = galleryElement.getBoundingClientRect();
    const galleryTranslate: number[] = getElementTranslation(galleryElement);
    const galleryTranslateX: number = galleryTranslate[0];
    const galleryTranslateY: number = galleryTranslate[1];

    const fullImageViewerElement: HTMLDivElement = fullImageViewerRef.current;

    // Position full image viewer
    fullImageViewerElement.style.top = `0px`;
    fullImageViewerElement.style.width = `${galleryBounds.width}px`;
    fullImageViewerElement.style.left = `${galleryBounds.x - galleryTranslateX}px`;
    fullImageViewerElement.style.height = `${galleryBounds.height}px`;

    const fullImageElement: HTMLDivElement = fullImageRef.current;
    const captionElement: HTMLDivElement = captionRef.current;

    // Calculate image dimensions for all 3 stages
    // Stage 1: same size as gallery image
    // Stage 2: partially zoomed
    // Stage 3: fully zoomed, contained within gallery element
    const bottomHeightBuffer = 40;
    const stage1ImageWidth: number = Math.round(image.aspectRatio * galleryItemHeight);
    const stage1ImageHeight: number = galleryItemHeight;
    const stage3ImageWidth: number = image.aspectRatio >= 1 ? galleryBounds.width :
      Math.round((galleryBounds.height + bottomHeightBuffer) * image.aspectRatio);
    const stage3ImageHeight: number = image.aspectRatio < 1 ? galleryBounds.height - bottomHeightBuffer :
      Math.round(Math.pow(image.aspectRatio / galleryBounds.width, -1));
    const stage2ImageWidth: number = stage1ImageWidth + Math.round(0.75 * (stage3ImageWidth - stage1ImageWidth));
    const stage2ImageHeight: number = stage1ImageHeight + Math.round(0.75 * (stage3ImageHeight - stage1ImageHeight));

    const timeline = gsap.timeline({});

    // Stage 1: start image from gallery image position
    const [galleryImageX, galleryImageY] = getElementTranslation(galleryImageElement);
    const stage1X: number = galleryImageX + galleryTranslateX + galleryItemPadding;
    const stage1Y: number = galleryImageY + galleryTranslateY + galleryItemPadding;

    fullImageElement.style.width = `${stage1ImageWidth}px`;
    fullImageElement.style.height = `${stage1ImageHeight}px`;
    fullImageElement.style.transform = `translate3d(${stage1X}, ${stage1Y}, 0)`;
    captionElement.style.opacity = '0';

    timeline.to(fullImageElement, {
      // Do nothing to simulate a pause
      duration: 0.8,
    });

    // Stage 2: move image to center and scale it partially
    const stage2X: number = Math.round((galleryBounds.width - stage2ImageWidth) / 2);
    const stage2Y: number = Math.round((galleryBounds.height - stage2ImageHeight) / 2);

    timeline.fromTo(fullImageElement,
      {
        width: `${stage1ImageWidth}px`,
        height: `${stage1ImageHeight}px`,
        transform: `translate3d(${stage1X}px, ${stage1Y}px, 0)`,
      },
      {
        width: `${stage2ImageWidth}px`,
        height: `${stage2ImageHeight}px`,
        transform: `translate3d(${stage2X}px, ${stage2Y}px, 0)`,
        ease: 'power1.inOut',
        duration: 0.8,
      }
    );

    // Stage 3: further scale up image and reposition it
    const stage3X: number = Math.round((galleryBounds.width - stage3ImageWidth) / 2);
    const stage3Y: number = image.aspectRatio < 1 ? 0 : Math.round((galleryBounds.height - stage3ImageHeight) / 2);

    captionElement.style.transform = `translate3d(0, ${stage3Y + stage3ImageHeight + 10}px, 0)`;

    timeline.to(fullImageElement, {
      width: `${stage3ImageWidth}px`,
      height: `${stage3ImageHeight}px`,
      transform: `translate3d(${stage3X}px, ${stage3Y}px, 0)`,
      ease: 'power1.inOut',
      duration: 0.8,
    });

    timeline.to(captionElement, {
      opacity: 1,
      ease: 'power1.inOut',
      duration: 0.4,
    });
  }, [isOverlayToggled, isActive, galleryImage, galleryItemHeight, galleryRef]);

  return (
    <></>
  );
};

export default FullImageViewer;
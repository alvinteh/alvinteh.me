import gsap from 'gsap';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { v4 as uuid } from 'uuid';

import LayoutContext from '../../../../../components/Layout/LayoutContext';
import ScrollPromptContext from '../../../../../components/ScrollPrompt/ScrollPromptContext';
import { getElementTranslation } from '../../../../../utils/StyleUtils';
import { Image } from '../types';
import { FullImageAttrs, GalleryImage } from './types';
import { galleryItemPadding } from './common';
import { animationDurations } from '../../../../../utils/AnimationUtils';

interface RelatedImageAttrs {
  $backgroundImage: string;
  $isAnimated: boolean;
}

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

const RelatedImages = styled.ul`
  display: flex;
  position: absolute;
  top: 50%;
  right: 20px;
  margin: 0;
  padding: 0;
  width: 40px;
  flex-direction: column;
  list-style: none;
  transform: translate3d(0, -50%, 0);
`;

const revealAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const RelatedImage = styled.li.attrs<RelatedImageAttrs>(({ $backgroundImage, $isAnimated }) => {
  const style: React.CSSProperties = {
    backgroundImage: `url(${$backgroundImage})`,  
  };

  if (!$isAnimated) {
    style.animation = 'none';
  }
  
  return { style };
})<{ $isActive: boolean }>`
  margin: 0 0 10px;
  border: solid ${(props) => { return props.$isActive ? '#ffffff' : 'transparent'}} 1px;
  border-radius: 5px;
  padding: 0;
  width: 38px;
  height: 38px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  animation: ${revealAnimation} ${animationDurations.FAST}s ${animationDurations.MEDIUM * 2}s ease-in-out both;

  &:hover {
    border-color: #ffffff;
  }

  &:nth-child(1) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 0}s;
  }

  &:nth-child(2) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 1}s;
  }

  &:nth-child(3) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 2}s;
  }

  &:nth-child(4) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 3}s;
  }

  &:nth-child(5) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 4}s;
  }

  &:nth-child(6) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 5}s;
  }

  &:nth-child(7) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 6}s;
  }

  &:nth-child(8) {
    animation-delay: ${animationDurations.MEDIUM * 2 + animationDurations.XXFAST * 7}s;
  }
`;

const FullImageViewer = ({ isActive, galleryImage, galleryItemHeight, galleryRef, relatedImages } : {
  isActive: boolean,
  galleryImage: GalleryImage | undefined,
  galleryItemHeight: number,
  galleryRef: React.MutableRefObject<HTMLDivElement>,
  relatedImages: Image[],
}) => {
  const { isOverlayToggled, setIsOverlayToggled, setOverlayContent } = useContext(LayoutContext);
  const { setIsEnabled: setIsScrollPromptEnabled } = useContext(ScrollPromptContext);
  const [isInitialActiveImage, setIsInitialActiveImage] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<Image>();

  const fullImageViewerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const fullImageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const captionRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const handleFullImageClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const handleRelatedImageClick = (event: React.MouseEvent, relatedImage: Image): void => {
    event.stopPropagation();
    
    setActiveImage(relatedImage);
    setIsInitialActiveImage(false);
  };

  useEffect((): void => {
    if (galleryImage && (!activeImage || !relatedImages.includes(activeImage))) {
      setActiveImage(galleryImage.image);
      setIsInitialActiveImage(true);
    }
  }, [galleryImage, relatedImages, activeImage]);

  useEffect((): void => {
    if (isActive && galleryImage && activeImage) {
      const relatedImageElements: React.ReactNode[] = relatedImages.map((relatedImage: Image): React.ReactNode => {
        return (
          <RelatedImage
            key={uuid()} 
            $backgroundImage={relatedImage.src}
            $isActive={activeImage.src === relatedImage.src}
            $isAnimated={isInitialActiveImage}
            onClick={(event: React.MouseEvent): void => { handleRelatedImageClick(event, relatedImage); }}
          />
        );
      });

      const overlayContent: React.ReactNode = (
        <FullImageViewerElement ref={fullImageViewerRef}>
          <FullImage
            ref={fullImageRef}
            $width={Math.round(activeImage.aspectRatio * galleryItemHeight)}
            $height={galleryItemHeight}
            $backgroundImage={activeImage.src}
            onClick={handleFullImageClick}
          />
          <Caption ref={captionRef} onClick={handleFullImageClick}>{activeImage.caption}</Caption>
          <RelatedImages>
            {relatedImageElements}
          </RelatedImages>
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
    relatedImages,
    activeImage,
    isInitialActiveImage,
    setIsScrollPromptEnabled,
    setIsOverlayToggled,
    setOverlayContent
  ]);

  useEffect((): void => {
    if (!isOverlayToggled || !isActive || !activeImage || !galleryImage) {
      return;
    }

    const image: Image = activeImage;
    
    const galleryElement: HTMLDivElement = galleryRef.current;
    const fullImageViewerElement: HTMLDivElement = fullImageViewerRef.current;
    const fullImageElement: HTMLDivElement = fullImageRef.current;
    const captionElement: HTMLDivElement = captionRef.current;
    const galleryBounds: DOMRect = galleryElement.getBoundingClientRect();
    const bottomHeightBuffer = 40;
    
    const timeline = gsap.timeline({});
    
    const stage3ImageWidth: number = image.aspectRatio >= 1 ? galleryBounds.width :
        Math.round((galleryBounds.height + bottomHeightBuffer) * image.aspectRatio);
    const stage3ImageHeight: number = image.aspectRatio < 1 ? galleryBounds.height - bottomHeightBuffer :
        Math.round(Math.pow(image.aspectRatio / galleryBounds.width, -1));

    if (isInitialActiveImage) {
      // We can ignore the linting error as the element exists
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const galleryImageElement: HTMLDivElement = document.querySelector(`div[data-id="${galleryImage.id}"]`)!;
      const galleryTranslate: number[] = getElementTranslation(galleryElement);
      const galleryTranslateX: number = galleryTranslate[0];
      const galleryTranslateY: number = galleryTranslate[1];

      // Position full image viewer
      fullImageViewerElement.style.top = `0px`;
      fullImageViewerElement.style.width = `${galleryBounds.width}px`;
      fullImageViewerElement.style.left = `${galleryBounds.x - galleryTranslateX}px`;
      fullImageViewerElement.style.height = `${galleryBounds.height}px`;

      // Calculate image dimensions for all 3 stages
      // Stage 1: same size as gallery image
      // Stage 2: partially zoomed
      // Stage 3: fully zoomed, contained within gallery element
      const stage1ImageWidth: number = Math.round(image.aspectRatio * galleryItemHeight);
      const stage1ImageHeight: number = galleryItemHeight;
      const stage2ImageWidth: number = stage1ImageWidth + Math.round(0.75 * (stage3ImageWidth - stage1ImageWidth));
      const stage2ImageHeight: number = stage1ImageHeight + Math.round(0.75 * (stage3ImageHeight - stage1ImageHeight));

      // Stage 1: start image from gallery image position
      const [galleryImageX, galleryImageY] = getElementTranslation(galleryImageElement);
      const stage1X: number = galleryImageX + galleryTranslateX + galleryItemPadding;
      const stage1Y: number = galleryImageY + galleryTranslateY + galleryItemPadding;

      fullImageElement.style.width = `${stage1ImageWidth}px`;
      fullImageElement.style.height = `${stage1ImageHeight}px`;
      fullImageElement.style.transform = `translate3d(${stage1X}, ${stage1Y}, 0)`;
      captionElement.style.opacity = '0';

      // Stage 2: move image to center and scale it partially
      const stage2X: number = Math.round((galleryBounds.width - stage2ImageWidth) / 2);
      const stage2Y: number = Math.round((galleryBounds.height - stage2ImageHeight) / 2);

      timeline.fromTo(fullImageElement,
        {
          width: `${stage1ImageWidth}px`,
          height: `${stage1ImageHeight}px`,
          x: `${stage1X}px`,
          y: `${stage1Y}px`,
        },
        {
          width: `${stage2ImageWidth}px`,
          height: `${stage2ImageHeight}px`,
          x: `${stage2X}px`,
          y: `${stage2Y}px`,
          ease: 'power1.inOut',
          duration: animationDurations.MEDIUM,
        }
      );
    }
    
    // Stage 3: further scale up image and reposition it
    const stage3X: number = Math.round((galleryBounds.width - stage3ImageWidth) / 2);
    const stage3Y: number = image.aspectRatio < 1 ? 0 : Math.round((galleryBounds.height - stage3ImageHeight) / 2);
    const captionElementY: number = stage3Y + stage3ImageHeight + 10;

    const fullImageElementBounds: DOMRect = fullImageElement.getBoundingClientRect();

    if (isInitialActiveImage) {
      captionElement.style.transform = `translate3d(0, ${captionElementY}px, 0)`;

      timeline.to(fullImageElement, {
        width: `${stage3ImageWidth}px`,
        height: `${stage3ImageHeight}px`,
        x: `${stage3X}px`,
        y: `${stage3Y}px`,
        ease: 'power1.inOut',
        duration: animationDurations.MEDIUM,
      });

      timeline.to(captionElement, {
        opacity: 1,
        ease: 'power1.inOut',
        duration: animationDurations.FAST,
      });

      // Note that the related image elements are animated via CSS due to ref issues with children
    }
    else {
      const [orgX, orgY] = getElementTranslation(fullImageElement);
      
      if (orgX !== stage3X || orgY !== stage3Y) {
        timeline.fromTo(fullImageElement, {
          width: fullImageElementBounds.width,
          height: fullImageElementBounds.height,
          x: `${orgX}px`,
          y: `${orgY}px`,
        },
        {
          width: `${stage3ImageWidth}px`,
          height: `${stage3ImageHeight}px`,
          x: `${stage3X}px`,
          y: `${stage3Y}px`,
          ease: 'power1.inOut',
          duration: animationDurations.MEDIUM,
        });

        timeline.to(captionElement, {
          y: `${captionElementY}px`,
          ease: 'power1.inOut',
          duration: animationDurations.MEDIUM,
        }, '<');
      }
    }
  }, [
    isOverlayToggled,
    isInitialActiveImage,
    activeImage,
    isActive,
    galleryImage,
    galleryItemHeight,
    galleryRef,
  ]);

  return (
    <></>
  );
};

export default FullImageViewer;
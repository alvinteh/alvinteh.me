import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';
import React, { createRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import LayoutContext from '../../../../../components/Layout/LayoutContext';
import ScrollPromptContext from '../../../../../components/ScrollPrompt/ScrollPromptContext';
import { Image } from '../types';
import { randomize } from '../../../../../utils/ArrayUtils';
import { getElementTranslation, setElementTranslation } from '../../../../../utils/StyleUtils';

import TestImage from '../data/import-test.png';

interface GalleryImage {
  id : string;
  image: Image;
  x: number;
  y: number;
}

interface GalleryLayoutElement {
  element: HTMLDivElement;
  x: number;
  y: number;
}

interface ImageElementAttrs {
  $backgroundImage: string;
}

interface FullImageAttrs {
  $width: number;
  $height: number;
  $backgroundImage?: string;
}

// Note: we use !important to override GSAP's cursor styles
const GalleryElement = styled.div<{ $isInteractive: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: ${(props) => { return props.$isInteractive ? 'grab' : 'auto !important'; }};
  user-select: none;

  &:active {
    cursor: ${(props) => { return props.$isInteractive ? 'grabbing' : 'auto !important'; }};
  }
`;

const ImageWrapper = styled.div<{ $aspectRatio: number, $padding: number, $height: number }>`
  position: absolute;
  padding: ${(props) => { return props.$padding; }}px;
  height: ${(props) => { return props.$height; }}px;
  aspect-ratio: ${(props) => { return props.$aspectRatio; }};
`;

const ImageElement = styled.div.attrs<ImageElementAttrs>(({ $backgroundImage }) => ({
  style: {
    backgroundImage: `url(${$backgroundImage})`,
  }
}))`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

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

const galleryItemPadding = 5;

const GalleryImage = ({ id, innerRef, image, height, padding, initialX, initialY, isClickable, onClick }: {  
  id: string,
  innerRef: React.RefObject<HTMLDivElement>,
  image: Image,
  height: number,
  padding: number,
  initialX: number,
  initialY: number,
  isClickable: boolean,
  onClick: (id: string) => void,
}) => {
  const style: React.CSSProperties = {
    pointerEvents: isClickable ? 'auto' : 'none',
    transform: `translate3d(${initialX}px, ${initialY}px, 0)`,
  };
  const handleClick = (): void => {
    onClick(id);
  };

  return (
    <ImageWrapper
      data-id={id}
      ref={innerRef}
      $aspectRatio={image.aspectRatio}
      $padding={padding}
      $height={height}
      style={style}
      onClick={handleClick}
    >
      <ImageElement $backgroundImage={image.src} />
    </ImageWrapper>
  );
};

const FullImageViewer = ({ isActive, galleryImage, galleryItemHeight, galleryRef, scrollTop } : {
  isActive: boolean,
  galleryImage: GalleryImage | undefined,
  galleryItemHeight: number,
  galleryRef: React.MutableRefObject<HTMLDivElement>,
  scrollTop: number,
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

    // Ensure gallery top is aligned to screen top
    // Assumption is that the gallery is the same height as the scene (each scene is 100vh tall)
    if (document.documentElement.scrollTop !== scrollTop) {
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }

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
  }, [isOverlayToggled, isActive, galleryImage, galleryItemHeight, galleryRef, scrollTop]);

  return (
    <></>
  );
};

const Gallery = ({ images, itemHeight, scrollTop, isInteractive }: {
  images: Image[],
  itemHeight: number,
  scrollTop: number,
  isInteractive: boolean,
}) => {
  const galleryRef =  useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const galleryImageRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const [, setAlbums] = useState<Record<string, Image[]>>({});
  const [galleryImages, setGalleryImages] = useState<Record<string, GalleryImage>>({});
  const [activeGalleryImage, setActiveGalleryImage] = useState<GalleryImage>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggable, setDraggable] = useState<Draggable>();
  const { isOverlayToggled } = useContext(LayoutContext);

  gsap.registerPlugin(Draggable, InertiaPlugin);

  const getGalleryImageWidth = useCallback((image: Image): number => {
    return Math.round(image.aspectRatio * itemHeight) + galleryItemPadding * 2;
  }, [itemHeight]);

  const galleryImageMaxWidth: number = useMemo((): number => {
    return Math.round(21 / 9 * itemHeight) + galleryItemPadding * 2;
  }, [itemHeight]);

  const galleryImageHeight: number = useMemo((): number => {
    return itemHeight + galleryItemPadding * 2;
  }, [itemHeight]);

  const imagePath: string = useMemo((): string => {
    return `${TestImage.substr(0, TestImage.lastIndexOf('/') + 1)}images/`;
  }, []);

  const handleDrag = useCallback(function(): void {
    // @ts-expect-error We can ignore the linting issue as this is set by GSAP
    const draggable: Draggable = this as Draggable;
    // Note: we do not use .deltaX/Y as those are inaccurate
    const deltaX: number = draggable.endX - draggable.startX;
    const deltaY: number = draggable.endY - draggable.startY;

    const galleryTop: number = draggable.y * -1;
    const galleryBottom: number = galleryTop + galleryRef.current.clientHeight;
    const galleryLeft: number = draggable.x * -1;
    const galleryRight: number = galleryLeft + galleryRef.current.clientWidth;

    const unsortedGalleryLayout: Record<number, GalleryLayoutElement[]> = {};
    let galleryLayout: GalleryLayoutElement[][] = [];
    const galleryImageYs: number[] = [];

    // Build the gallery layout by checking the translate values of each element
    for (const galleryImageRef of galleryImageRefs.current) {
      // We can ignore the linting issue as we have set up this ref
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const galleryImageElement: HTMLDivElement = galleryImageRef.current!;
      const [x, y] = getElementTranslation(galleryImageElement);

      if (!galleryImageYs.includes(y)) {
        galleryImageYs.push(y);
        unsortedGalleryLayout[y] = [];
      }

      unsortedGalleryLayout[y].push({
        element: galleryImageElement,
        x,
        y,
      });
    }

    galleryImageYs.sort((a: number, b: number) => { return a - b});
    
    for (const galleryImageY of galleryImageYs) {
      unsortedGalleryLayout[galleryImageY].sort((a, b) => a.x - b.x); 

      galleryLayout.push(unsortedGalleryLayout[galleryImageY]);
    }

    // Calculate changes to be made
    const updatedGalleryLayoutElements: GalleryLayoutElement[] = [];

    if (deltaY > 0) {
      // Check if first item in each row is within Y bounds, starting with top row
      while (galleryLayout[0][0].y + galleryImageHeight > galleryTop) {
        // Move bottommost items to top edge (using top item's Y)
        const newY: number = galleryLayout[0][0].y - galleryImageHeight;

        galleryLayout[galleryLayout.length - 1].forEach((galleryLayoutElement: GalleryLayoutElement): void => {
          galleryLayoutElement.y = newY;
          updatedGalleryLayoutElements.push(galleryLayoutElement);
        });

        // Update gallery layout
        galleryLayout = galleryLayout.slice(-1).concat(galleryLayout.slice(0, -1));
      }
    }
    else if (deltaY < 0) {
      // Check if first item in each row is within Y bounds, starting with bottom row
      while (galleryLayout[galleryLayout.length - 1][0].y < galleryBottom) {
        // Move topmost items to bottom edge (using bottom item's Y)
        const newY: number = galleryLayout[galleryLayout.length - 1][0].y + galleryImageHeight;

        galleryLayout[0].forEach((galleryLayoutElement: GalleryLayoutElement): void => {
          galleryLayoutElement.y = newY;
          updatedGalleryLayoutElements.push(galleryLayoutElement);
        });

        // Update gallery layout
        galleryLayout = galleryLayout.slice(1).concat(galleryLayout.slice(0, 1));
      }
    }
    if (deltaX > 0) {
      // Check if each item in each row is within X bounds, starting with first/leftmost item
      for (let i = 0; i < galleryLayout.length; i++) {
        while (galleryLayout[i][0].x + galleryLayout[i][0].element.clientWidth > galleryLeft) {
          // Move last/rightmost item to left edge (using leftmost item's X)
          const cmpGalleryLayoutElement: GalleryLayoutElement = galleryLayout[i][0];
          const galleryLayoutElement: GalleryLayoutElement = galleryLayout[i][galleryLayout[i].length - 1];
          const newX: number = cmpGalleryLayoutElement.x - galleryLayoutElement.element.clientWidth;
          galleryLayoutElement.x = newX;
          updatedGalleryLayoutElements.push(galleryLayoutElement);

          // Update gallery layout
          galleryLayout[i] = galleryLayout[i].slice(-1).concat(galleryLayout[i].slice(0, -1));
        }
      }
    }
    else if (deltaX < 0) {
      // Check if last/rightmost item in each row is within X bounds
      for (let i = 0; i < galleryLayout.length; i++) {
        while (galleryLayout[i][galleryLayout[i].length - 1].x < galleryRight) {
          // Move first/leftmost item to right edge (using rightmost item's X)
          const cmpGalleryLayoutElement: GalleryLayoutElement = galleryLayout[i][galleryLayout[i].length - 1];
          const galleryLayoutElement: GalleryLayoutElement = galleryLayout[i][0];
          const newX: number = cmpGalleryLayoutElement.x + cmpGalleryLayoutElement.element.clientWidth;
          galleryLayoutElement.x = newX;
          updatedGalleryLayoutElements.push(galleryLayoutElement);

          // Update gallery layout
          galleryLayout[i] = galleryLayout[i].slice(1).concat(galleryLayout[i].slice(0, 1));
        }
      }
    }

    // Perform DOM updates
    for (const galleryLayoutElement of updatedGalleryLayoutElements) {
      setElementTranslation(galleryLayoutElement.element, { x: galleryLayoutElement.x, y: galleryLayoutElement.y });
    }
  }, [galleryImageHeight]);

  const handleDragStart = useCallback(function(event: MouseEvent) {
    // Technically speaking, the condition below should not be needed as we kill the draggable, but it has been
    // been retained for safety
    if (!isInteractive) {
      // @ts-expect-error We can ignore the linting issue as this is set by GSAP
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.endDrag(event);
      return;
    }

    setIsDragging(true);
  }, [isInteractive]);

  const handleDragEnd = (): void => {
    setIsDragging(false);
  };

  const handleGalleryImageClick = useCallback((id: string): void => {
    if (!isInteractive) {
      return;
    }

    if (isDragging) {
      return;
    }

    setActiveGalleryImage(galleryImages[id]);
  }, [isInteractive, galleryImages, isDragging]);

  useEffect((): void => {
    const galleryElement: HTMLDivElement = galleryRef.current;
    const galleryWidth: number = galleryElement.clientWidth;
    const galleryHeight: number = galleryElement.clientHeight;
    
    const albums: Record<string, Image[]> = {};
    let albumCovers: Image[] = [];

    // Create dictionary of album names to images
    for (const image of images) {
      const { caption, src, albumName, aspectRatio, isAlbumCover } = image;

      // Create album if it doess not already exist
      // We can ignore the linting issue as we are populating the dictionary
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!albums[albumName]) {
        albums[albumName] = [];
      }

      // Create a new image object with the adjusted src
      const updatedImage: Image = {
        caption,
        albumName,
        src: `${imagePath}${src}`,
        aspectRatio,
        isAlbumCover,
      };

      albums[albumName].push(updatedImage);

      // Add to album covers if applicable
      if (isAlbumCover) {
        albumCovers.push(updatedImage);
      }
    }

    albumCovers = randomize(albumCovers) as Image[];

    const galleryImages: Record<string, GalleryImage> = {};
    let albumCoversIndex = 0;
    
    // Populate gallery with album images, buffering an additional image outside the gallery viewport
    for (let currentY = -galleryImageHeight; currentY < galleryHeight + galleryImageHeight;
      currentY += galleryImageHeight) {
      
      for (let currentX = -galleryImageMaxWidth; currentX < galleryWidth + galleryImageMaxWidth;
        currentX += getGalleryImageWidth(albumCovers[albumCoversIndex]), albumCoversIndex++) {
        
        // Repeat images
        if (albumCoversIndex === albumCovers.length) {
          albumCoversIndex = 0;
        }

        const galleryImage: GalleryImage = {
          id: uuid().split('-')[0],
          image: albumCovers[albumCoversIndex],
          x: currentX,
          y: currentY,
        };

        galleryImages[galleryImage.id] = galleryImage;
      }
    }

    setAlbums(albums);
    setGalleryImages(galleryImages);
  }, [images, itemHeight, imagePath, galleryImageHeight, galleryImageMaxWidth, getGalleryImageWidth]);

  useEffect((): void => {
    if (isOverlayToggled) {
      return;
    }

    setActiveGalleryImage(undefined);
  }, [isOverlayToggled, setActiveGalleryImage]);

  useEffect((): void => {
    if (!draggable) {
      return;
    }

    if (!isInteractive) {
      draggable.kill();
    }
  }, [draggable, isInteractive]);

  useGSAP((): void => {
    if (Object.keys(galleryImages).length === 0) {
      return;
    }

    if (!isInteractive) {
      return;
    }

    setDraggable((Draggable.create(galleryRef.current, {
      type: 'x,y',
      inertia: true,
      zIndexBoost: false,
      throwResistance: 1250,
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
      onThrowUpdate: handleDrag,
    }))[0]);
  }, [galleryImages, isInteractive, handleDragStart, handleDrag]);

  const imageElements = [];
  
  for (let i = 0, galleryImageValues = Object.values(galleryImages); i < galleryImageValues.length; i++) {
    const galleryImage = galleryImageValues[i];
    galleryImageRefs.current[i] = createRef<HTMLDivElement>();

    imageElements.push(<GalleryImage
      key={galleryImage.id}
      id={galleryImage.id}
      innerRef={galleryImageRefs.current[i]}
      image={galleryImage.image}
      padding={galleryItemPadding}
      height={itemHeight}
      initialX={galleryImage.x}
      initialY={galleryImage.y}
      isClickable={!isDragging}
      onClick={handleGalleryImageClick}
    />);
  }

  return (
    <>
      <GalleryElement ref={galleryRef} $isInteractive={isInteractive}>
        {imageElements}
      </GalleryElement>
      <FullImageViewer
        isActive={!!activeGalleryImage}
        galleryImage={activeGalleryImage}
        galleryItemHeight={itemHeight}
        galleryRef={galleryRef}
        scrollTop={scrollTop}
      />
    </>
  )
};

export default Gallery;
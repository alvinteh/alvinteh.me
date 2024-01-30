import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';
import React, { createRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import LayoutContext from '../../../../../components/Layout/LayoutContext';
import { Image } from '../types';
import { randomize } from '../../../../../utils/ArrayUtils';
import { getElementTranslation, setElementTranslation } from '../../../../../utils/StyleUtils';
import { galleryItemPadding } from './common';
import FullImageViewer from './FullImageViewer';
import { GalleryImage, ImageElementAttrs } from './types';

interface GalleryLayoutElement {
  element: HTMLDivElement;
  x: number;
  y: number;
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

const Gallery = ({ images, itemHeight, isInteractive }: {
  images: Image[],
  itemHeight: number,
  isInteractive: boolean,
}) => {
  const galleryRef =  useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const galleryImageRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const [albums, setAlbums] = useState<Record<string, Image[]>>({});
  const [galleryImages, setGalleryImages] = useState<Record<string, GalleryImage>>({});
  const [activeGalleryImage, setActiveGalleryImage] = useState<GalleryImage>();
  const [activeAlbumImages, setActiveAlbumImages] = useState<Image[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggable, setDraggable] = useState<Draggable>();
  const { isDialogToggled: isOverlayToggled } = useContext(LayoutContext);

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

    const galleryImage: GalleryImage = galleryImages[id];

    setActiveGalleryImage(galleryImage);
    setActiveAlbumImages(albums[galleryImage.image.albumName]);
  }, [isInteractive, albums, galleryImages, isDragging]);

  const handlePress = (event: MouseEvent): void => {
    // Note we need this event handler to prevent the page observer from impacting performance
    event.stopPropagation();
  };

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
        src,
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
  }, [images, itemHeight, galleryImageHeight, galleryImageMaxWidth, getGalleryImageWidth]);

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
      onPress: handlePress,
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
        relatedImages={activeAlbumImages}
      />
    </>
  )
};

export default Gallery;
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Image } from '../types';

interface GalleryImage {
  id : string;
  image: Image;
  x: number;
  y: number;
}

interface ImageElementProps {
  $backgroundImage: string;
}

const GalleryElement = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const ImageWrapper = styled.div<{ $aspectRatio: number, $padding: number, $height: number }>`
  position: absolute;
  padding: ${(props) => { return props.$padding; }}px;
  height: ${(props) => { return props.$height; }}px;
  aspect-ratio: ${(props) => { return props.$aspectRatio; }};
`;

const ImageElement = styled.div.attrs<ImageElementProps>(({ $backgroundImage }) => ({
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

const DebugLabel = styled.div`
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  color: #ffffff;
  font-size: 2rem;
  text-align: center;
`;

const GalleryImage = ({ id, image, height, padding, x, y }: {
  id: string
  image: Image,
  height: number,
  padding: number,
  x: number,
  y: number
}) => {
  const style: React.CSSProperties = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
  };

  return (
    <ImageWrapper $aspectRatio={image.aspectRatio} $padding={padding} $height={height} style={style}>
      <ImageElement $backgroundImage={image.src} />
      {!import.meta.env.PROD && <DebugLabel>{id}</DebugLabel>}
    </ImageWrapper>
  );
};

const Gallery = ({ images, itemHeight }: { images: Image[], itemHeight: number }) => {
  const galleryRef =  useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [galleryImages, setGalleryImages] = useState<Record<string, GalleryImage>>({});
  const [galleryLayout, setGalleryLayout] = useState<GalleryImage[][]>([]);

  const galleryItemPadding = 5;

  gsap.registerPlugin(Draggable, InertiaPlugin);

  const getGalleryImageWidth = useCallback((image: Image): number => {
    return Math.round(image.aspectRatio * itemHeight) + galleryItemPadding * 2;
  }, [itemHeight]);

  const galleryImageMaxWidth: number = useMemo((): number => {
    return Math.round(21 / 9 * itemHeight) + galleryItemPadding * 2;
  }, [itemHeight]);

  const galleryImageHeight = useMemo((): number => {
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

    const newGalleryImages: Record<string, GalleryImage> = Object.assign({}, galleryImages);
    const updatedGalleryImages: GalleryImage[] = [];
    let newGalleryLayout: GalleryImage[][] = galleryLayout.slice();

    if (deltaY > 0) {
      // Check if first item in each row is within Y bounds, starting with top row
      while (newGalleryLayout[0][0].y + galleryImageHeight > galleryTop) {
        // Move bottommost items to top edge (using top item's Y)
        const newY: number = newGalleryLayout[0][0].y - galleryImageHeight;

        newGalleryLayout[newGalleryLayout.length - 1].forEach((galleryImage: GalleryImage): void => {
          galleryImage.y = newY;
          updatedGalleryImages.push(galleryImage);
        });

        // Update gallery layout
        newGalleryLayout = newGalleryLayout.slice(-1).concat(newGalleryLayout.slice(0, -1));
      }
    }
    else if (deltaY < 0) {
      // Check if first item in each row is within Y bounds, starting with bottom row
      while (newGalleryLayout[newGalleryLayout.length - 1][0].y < galleryBottom) {
        // Move topmost items to bottom edge (using bottom item's Y)
        const newY: number = newGalleryLayout[newGalleryLayout.length - 1][0].y + galleryImageHeight;

        newGalleryLayout[0].forEach((galleryImage: GalleryImage): void => {
          galleryImage.y = newY;
          updatedGalleryImages.push(galleryImage);
        });

        // Update gallery layout
        newGalleryLayout = newGalleryLayout.slice(1).concat(newGalleryLayout.slice(0, 1));
      }
    }
    if (deltaX > 0) {
      // Check if each item in each row is within X bounds, starting with first/leftmost item
      for (let i = 0; i < newGalleryLayout.length; i++) {
        while (newGalleryLayout[i][0].x + getGalleryImageWidth(newGalleryLayout[i][0].image) > galleryLeft) {
          // Move last/rightmost item to left edge (using leftmost item's X)
          const cmpGalleryImage: GalleryImage = newGalleryLayout[i][0];
        
          const galleryImage: GalleryImage = newGalleryLayout[i][newGalleryLayout[i].length - 1];
          galleryImage.x = cmpGalleryImage.x - getGalleryImageWidth(galleryImage.image);
          updatedGalleryImages.push(galleryImage);

          // Update gallery layout
          newGalleryLayout[i] = newGalleryLayout[i].slice(-1).concat(newGalleryLayout[i].slice(0, -1));
        }
      }
    }
    else if (deltaX < 0) {
      // Check if last/rightmost item in each row is within X bounds
      for (let i = 0; i < newGalleryLayout.length; i++) {
        while (newGalleryLayout[i][newGalleryLayout[i].length - 1].x < galleryRight) {
          // Move first/leftmost item to right edge (using rightmost item's X)
          const cmpGalleryImage: GalleryImage = newGalleryLayout[i][newGalleryLayout[i].length - 1];

          const galleryImage: GalleryImage = newGalleryLayout[i][0];
          galleryImage.x = cmpGalleryImage.x + getGalleryImageWidth(cmpGalleryImage.image);
          updatedGalleryImages.push(galleryImage);

          // Update gallery layout
          newGalleryLayout[i] = newGalleryLayout[i].slice(1).concat(newGalleryLayout[i].slice(0, 1));
        }
      }
    }

    // Update state
    if (updatedGalleryImages.length > 0) {
      if (!import.meta.env.PROD) {
        console.info('Updated gallery layout', newGalleryLayout);
      }

      for (const galleryImage of updatedGalleryImages) {
        newGalleryImages[galleryImage.id] = galleryImage;
      }

      setGalleryImages(newGalleryImages);
      setGalleryLayout(newGalleryLayout);
    }
  }, [galleryImages, galleryLayout, galleryImageHeight, getGalleryImageWidth]);

  useEffect((): void => {
    const galleryElement: HTMLDivElement = galleryRef.current;
    const galleryWidth: number = galleryElement.clientWidth;
    const galleryHeight: number = galleryElement.clientHeight;
    
    const galleryImages: Record<string, GalleryImage> = {};
    const galleryLayout: GalleryImage[][] = [];
    let imagesIndex = 0;
    
    // Populate gallery with images, buffering an additional image outside the gallery viewport
    for (let currentY = -galleryImageHeight; currentY < galleryHeight + galleryImageHeight;
      currentY += galleryImageHeight) {
      const galleryImageRow: GalleryImage[] = [];
      
      for (let currentX = -galleryImageMaxWidth; currentX < galleryWidth + galleryImageMaxWidth;
        currentX += getGalleryImageWidth(images[imagesIndex]), imagesIndex++) {
        
        // Repeat images
        if (imagesIndex === images.length) {
          imagesIndex = 0;
        }

        const galleryImage: GalleryImage = {
          id: uuid().split('-')[0],
          image: images[imagesIndex],
          x: currentX,
          y: currentY,
        };

        galleryImages[galleryImage.id] = galleryImage;
        galleryImageRow.push(galleryImage);
      }

      galleryLayout.push(galleryImageRow);
    }

    setGalleryImages(galleryImages);
    setGalleryLayout(galleryLayout);
  }, [images, itemHeight, galleryImageHeight, galleryImageMaxWidth, getGalleryImageWidth]);

  useGSAP((): void => {
    if (Object.keys(galleryImages).length === 0) {
      return;
    }

    Draggable.create(galleryRef.current, {
      type: 'x,y',
      inertia: true,
      zIndexBoost: false,
      onDragEnd: handleDrag,
    });
  }, [galleryImages]);

  const imageElements = Object.values(galleryImages).map((galleryImage: GalleryImage) => {
    return <GalleryImage
      key={galleryImage.id}
      id={galleryImage.id}
      image={galleryImage.image}
      padding={galleryItemPadding}
      height={itemHeight}
      x={galleryImage.x}
      y={galleryImage.y}
    />;
  });

  return (
    <GalleryElement ref={galleryRef}>
      {imageElements}    
    </GalleryElement>
  )
};

export default Gallery;
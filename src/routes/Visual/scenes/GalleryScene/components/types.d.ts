import { Image } from '../types';

interface GalleryImage {
  id : string;
  image: Image;
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

export type {
  GalleryImage,
  GalleryLayoutElement,
  ImageElementAttrs,
  FullImageAttrs,
};
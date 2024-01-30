import { copyFile, mkdir, readdir, stat, rmdir, writeFile } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import { Album, Image } from '../../routes/Visual/scenes/GalleryScene/types';

const round = (n: number, decimalPlaces: number): number => {
  return  Math.trunc(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

const decimalPlaces = 3;

const aspectRatios: number[] = [
  round(2/3, decimalPlaces),
  round(3/4, decimalPlaces),
  round(9/16, decimalPlaces),

  1,

  round(3/2, decimalPlaces),
  round(4/3, decimalPlaces),
  round(16/9, decimalPlaces),
  round(21/9, decimalPlaces),
];

const main = async (
  sourceImageFolderPath: string,
  destinationImageFolderPath: string,
  destinationJsonPath: string,
): Promise<void> => {
  const cwd: string = dirname(fileURLToPath(import.meta.url));

  const albums: Record<string, Album>= {};
  const images: Image[] = [];
  let orgImageFilenames: string[] = [];

  // Get list of images
  console.log(`Obtaining list of files from ${sourceImageFolderPath}...`);  

  try {
    orgImageFilenames = await readdir(`${cwd}/${sourceImageFolderPath}`);
  }
  catch (e) {
    console.error(`There was an issue obtaining the list of files (${(e as Error).message}).`);
    return;
  }

  // Remove and recreate destination folder
  try {
    const folder = `${cwd}/${destinationImageFolderPath}`;
    // We can ignore this linting issue as stat might fail if the folder doesn't exist
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (await stat(folder)) {
      await rmdir(folder, { recursive: true });
      await mkdir(folder);
    }
  }
  catch (e) {
    console.error(`There was an issue removing and re-creating the destination folder (${(e as Error).message}).`);
    return;
  }

  // Process each image
  for (const orgImageFilename of orgImageFilenames) {
    console.log(`Processing from ${orgImageFilename}...`);

    // Sample image filename: 20160414 Others - 01 Manhattan Street.jpg
    // Split image filename into tokens
    const orgImageTokens: string[] = orgImageFilename.split(' - ');

    // Determine the album details
    const albumName: string = orgImageTokens[0].split(' ').slice(1).join(' ');

    // Create an album if it does not already exist
    // We can ignore this linting error as we populate the albums dictionary
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!albums[albumName]) {
      const id = uuid();

      albums[albumName] = {
        id,
        name: albumName,
        imageCount: 0,
      };

      // Create folder for album
      console.log(`Creating album folder ${id}...`);
      try {
        await mkdir(`${cwd}/${destinationImageFolderPath}/${id}`);
      }
      catch (e) {
        console.error(`There was an issue creating an album folder (${(e as Error).message}).`)
        break;
      }
    }

    const album: Album = albums[albumName];
    const imageFilename = `${album.imageCount++}.jpg`;
    const caption: string = orgImageTokens[1].split(' ').slice(1).join(' ').replace(/.jpg$/g, '');
    const src = `${album.id}/${imageFilename}`;
    let aspectRatio = -1;

    // Determine aspect ratio of image
    console.log(`Checking aspect ratio of ${orgImageFilename}...`);
    try {
      const metadata: sharp.Metadata = await sharp(`${cwd}/${sourceImageFolderPath}/${orgImageFilename}`).metadata();

      if (!metadata.width || !metadata.height) {
        throw new Error(`Could not read image metadata`);
      }

      const rawAspectRatio: number = round(metadata.width / metadata.height, decimalPlaces);
      
      if (aspectRatios.includes(rawAspectRatio)) {
        aspectRatio = rawAspectRatio;
      }
      else {
        // Take care of edge cases that are a couple of pixels off
        for (const cmpAspectRatio of aspectRatios) {
          if (Math.abs(cmpAspectRatio - rawAspectRatio) <= 2 * Math.pow(10, -decimalPlaces)) {
            aspectRatio = cmpAspectRatio;
            break;
          }
        }
      }
      
      if (aspectRatio === -1) {
        console.log(metadata.width, metadata.height, rawAspectRatio);
        throw new Error(`Image aspect ratio (${metadata.width} x ${metadata.height}, ${rawAspectRatio}) does not match`
          + ' any expected aspect ratios');
      }
    }
    catch (e) {
      console.error(`There was an issue opening the file (${(e as Error).message}).`)
      break;
    }

    // Copy image from original folder to destination folder
    console.log(`Copying ${orgImageFilename}...`);
    try {
      await copyFile(
        `${cwd}/${sourceImageFolderPath}/${orgImageFilename}`,
        `${cwd}/${destinationImageFolderPath}/${src}`
      );
    }
    catch (e) {
      console.error(`There was an issue copying the file (${(e as Error).message}).`)
      break;
    }

    // Update images array
    images.push({
      caption,
      src,
      aspectRatio,
      albumName,
      isAlbumCover: false,
    });
  }

  // Save data to file
  try {
    await writeFile(`${cwd}/${destinationJsonPath}`, JSON.stringify(images, null, 2), { flag: 'w+' });
  }
  catch (e) {
    console.error(`There was an issue saving the image data JSON (${(e as Error).message}).`);
  }

  console.log('Done');
};

void main(
  '../../../public/gallery-images-org',
  '../../../public/gallery-images',
  '../../routes/Visual/scenes/GalleryScene/data/image-data.json'
);
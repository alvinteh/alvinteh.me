import { readdir, rename } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import sharp from 'sharp';

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

const getAspectRatio = async (image: sharp.Sharp): Promise<number> => {
  const metadata: sharp.Metadata = await image.metadata();
  let aspectRatio = -1;

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
  
  return aspectRatio;
};

const main = async (imageFolderPath: string): Promise<void> => {
  const fullImageFolderPath = `${dirname(fileURLToPath(import.meta.url))}/${imageFolderPath}/`;

  let imageFilenames: string[] = [];

  // Get list of images
  console.log(`Obtaining list of files from ${fullImageFolderPath}...`);  

  try {
    imageFilenames = await readdir(`${fullImageFolderPath}`, { recursive: true });
    
    // Filter non-JPG images
    imageFilenames = imageFilenames.filter((imageFilename: string): boolean => {
      return imageFilename.endsWith('.jpg');
    });

    console.log(imageFilenames);
  }
  catch (e) {
    console.error(`There was an issue obtaining the list of files (${(e as Error).message}).`);
    return;
  }

  // Process each image
  for (const imageFilename of imageFilenames) {
    try {
      const image: sharp.Sharp = sharp(`${fullImageFolderPath + imageFilename}`);

      // Determine aspect ratio of image
      console.log(`Checking aspect ratio of ${imageFilename}...`);
      const aspectRatio: number = await getAspectRatio(image);

      if (aspectRatio === -1) {
        throw new Error(`The aspect ratio for ${imageFilename} does not match any expected aspect ratios`);
      }
      
      // Resize image and set quality
      console.log(`Optimizing ${imageFilename}...`);
      const resizeOptions: sharp.ResizeOptions = {};
      resizeOptions[aspectRatio >= 1 ? 'width' : 'height'] = 2560;
      image.resize(resizeOptions);
      image.jpeg({ quality: 80 });
      await image.toFile(fullImageFolderPath + imageFilename + '.new');
    
      // Rename new file
      console.log(`Renaming file ${imageFilename}...`);
      await rename(`${fullImageFolderPath + imageFilename}.new`, `${fullImageFolderPath + imageFilename}`);
    }
    catch (e) {
      console.error(`There was an issue processing the file (${(e as Error).message}).`)
      break;
    }
  }
  
  console.log('Done');
};

void main('../routes/Visual/scenes/GalleryScene/data/images');
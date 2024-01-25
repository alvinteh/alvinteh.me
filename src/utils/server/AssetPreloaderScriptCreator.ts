import { readdirSync, readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const AssetPreloaderCreator = {
  getPrePreloaderScript: (): string => {
    const srcPath: string = dirname(fileURLToPath(`${import.meta.url}/../../`));
    const ignoredFolders: string[] = ['original-images'];

    try {
      // Get list of images
      let assets: string[] = readdirSync(`${srcPath}`, { recursive: true }) as string[];
      
      // Filter non-JPG/PNG/SVG assets and assets in ignored folders
      assets = assets.filter((asset: string): boolean => {
        return ((asset.endsWith('.jpg') || asset.endsWith('.png') || asset.endsWith('.svg')) &&
        !ignoredFolders.some((ignoredFolder: string): boolean => { return asset.includes(ignoredFolder); }));
      })
      .map((asset: string): string => {
        return `/src/${asset.replace(/\\/g, '/')}`;
     });

      // Create script string
      const imageUrlsScript: string[] = assets.map((asset: string): string => {
        return `imageUrls.push('${asset.replace(/'/g, '\\')}');`;
      });

      const preloaderScript = `
        <script>
        const isPreloaded = localStorage.getItem('isPreloaded');
        window.paceOptions = {
          restartOnPushState: false,
          ajax: false,
        };

        if (isPreloaded) {
          // window.paceOptions.startOnPageLoad = false;
        }
        else {
          const preloadImage = (imageUrl) => {
            return new Promise((resolve, reject) => {
              const image = new Image();
              image.onload = resolve;
              image.onerror = (e) => {
                console.log('error', imageUrl, e);
                reject(e);

              };
              image.src = imageUrl;
            });
          };

          const imageUrls = [];
          ${imageUrlsScript.join('\n')}

          Promise.all(imageUrls.map((imageUrl) => { preloadImage(imageUrl); }));
        }
        </script>
      `;

      return preloaderScript;
    }
    catch (e) {
      console.error(`There was an issue obtaining the list of assets (${(e as Error).message}).`);
      return '';
    }
  },
  getPreloaderLibScript: (): string => {
    return `<script>${readFileSync('./node_modules/pace-js/pace.min.js', 'utf-8')}</script>`;
  },
  getPostPreloaderScript: (): string => {
    return `
      <script>
      if (!isPreloaded) {
        Pace.on('done', () => {
          localStorage.setItem('isPreloaded', 1);
        });
      }
      </script>
    `;
  },
};

export default AssetPreloaderCreator;
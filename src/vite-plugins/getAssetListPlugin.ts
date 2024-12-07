import { OutputAsset, OutputChunk, OutputOptions } from 'rollup';

export default (exportVariableName: string, exportChunkName: string) => ({
    name: 'getAssetList',
    generateBundle(_options: OutputOptions, bundle: Record<string, OutputAsset | OutputChunk>): void {
        let chunkToModify: OutputChunk;
        const allAssetFileNames: string[] = [];

        Object.values(bundle).forEach((asset) => {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            if (asset.name === exportChunkName && asset.type === 'chunk') {
              chunkToModify = asset;
            }

            allAssetFileNames.push(asset.fileName);
        });

        // @ts-expect-error We can ignore this linting issue as we do try to initialize chunkToModify
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!chunkToModify) {
          throw new Error(`Could not find the chunk "${exportChunkName}".`);
        }

        chunkToModify.code = `
          window.${exportVariableName} = ${JSON.stringify(allAssetFileNames)};
          
          if (window.caches) {
            window.caches.open('site-cache').then((cache) => {
              cache.addAll(window.assets);
            })
          }

          ${chunkToModify.code}
        `;
    },
})
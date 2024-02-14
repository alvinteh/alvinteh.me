import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';

import AssetPreloaderScriptCreator from './src/utils/server/AssetPreloaderScriptCreator';
import getAssetListPlugin from './src/vite-plugins/getAssetListPlugin';

export default defineConfig({
  build: {
    assetsInlineLimit: 256,
  },
  plugins: [
    react(),
    svgr({ svgrOptions: { ref: true }}),
    getAssetListPlugin('assets', 'index'),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          preloaderInitScript: AssetPreloaderScriptCreator.getPreloaderInitScript(),
          preloaderLibScript: AssetPreloaderScriptCreator.getPreloaderLibScript(),
          preloaderRunScript: AssetPreloaderScriptCreator.getPreloaderRunScript(),
        }
      }
    }),
  ],
});
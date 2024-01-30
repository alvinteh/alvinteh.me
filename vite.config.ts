import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';

import AssetPreloaderScriptCreator from './src/utils/server/AssetPreloaderScriptCreator';

export default defineConfig({
  build: {
    assetsInlineLimit: 256,
  },
  plugins: [
    react(),
    svgr({ svgrOptions: { ref: true }}),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          prePreloaderScript: AssetPreloaderScriptCreator.getPrePreloaderScript(),
          preloaderLibScript: AssetPreloaderScriptCreator.getPreloaderLibScript(),
          postPreloaderScript: AssetPreloaderScriptCreator.getPostPreloaderScript(),
        }
      }
    })
  ],
});
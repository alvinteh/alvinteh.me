import { readFileSync } from 'fs';

const AssetPreloaderCreator = {
  getPreloaderInitScript: (): string => {
    return `
      <script>
      const isPreloaded = localStorage.getItem('isPreloaded');
      window.paceOptions = {
        restartOnPushState: false,
        ajax: false,
      };

      if (isPreloaded) {
        window.paceOptions.startOnPageLoad = false;
      }
      </script>
    `;
  },
  getPreloaderLibScript: (): string => {
    return `<script>${readFileSync('./node_modules/pace-js/pace.min.js', 'utf-8')}</script>`;
  },
  getPreloaderRunScript: (): string => {
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
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'arcoblue-6': '#f85959',
          },
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    envDir: './env',
  });
};

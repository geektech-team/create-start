import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import clear from './plugins/rollup-plugin-clear.js';

const mode = process.env.MODE;
const isProd = mode === 'prod';

export default {
  input: `lib/index.ts`,
  output: [
    {
      file: 'dist/index.js',
      exports: 'named',
      format: 'es',
      // sourcemap: !isProd,
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      // tsconfigOverride: { compilerOptions: { sourceMap: !isProd } },
    }),
    clear('dist'),
    copy({
      targets: [
        {
          src: ['lib/strategies', '!**/*.ts'],
          dest: 'dist',
        },
      ],
    }),
    isProd && terser(),
  ],
};

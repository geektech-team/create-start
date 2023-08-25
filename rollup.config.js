import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";

const mode = process.env.MODE;
const isProd = mode === "prod";

export default {
  input: `lib/index.ts`,
  output: [
    {
      file: "dist/index.js",
      exports: "named",
      format: "es",
      // sourcemap: !isProd,
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      // tsconfigOverride: { compilerOptions: { sourceMap: !isProd } },
    }),
    copy({
      targets: [
        {
          src: ["lib/strategies", "!**/*.ts"],
          dest: "dist",
        },
        // {
        //   src: "src/strategies/common",
        //   dest: "dist",
        // },
      ],
    }),
    isProd && terser(),
  ],
};

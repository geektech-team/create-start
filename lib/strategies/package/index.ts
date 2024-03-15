import * as path from "path";
import { CreateOption } from "../../creator.type";
import { CreatorStrategy, Variant } from "../../creator.type";
import { trueColor } from "kolorist";
import { copy } from "@/utils/file";

export class PackageCreaterStrategy implements CreatorStrategy {
  public name: string = "Package";
  public path: string = "package";
  public color = trueColor(237, 41, 69);
  public variants?: Variant[] | undefined = [
  ];
  public devDependencies = {
    "@rollup/plugin-terser": "^0.4.3",
    "@types/node": "^20.4.5",
    "rollup": "^3.27.0",
    "rollup-plugin-typescript2": "^0.35.0",
    "tslib": "^2.6.1",
    "typescript": "^5.1.6",
    eslint: "^8.36.0",
    '@geektech/eslint-plugin': "^1.1.1",
  };
  public scripts = {
    "dev": "rollup -w -c rollup.config.js --environment MODE:dev",
    "build": "rollup -c rollup.config.js --environment MODE:prod",
    "lint-staged": "lint-staged",
  };
  public lintStaged = {
    "*.{js,ts}": ["eslint --fix"],
  };
  pre(option: CreateOption): void {
    copy(option.packageRoot + "strategies/package/package.json", option.root + '/package.json')
  }
  create(option: CreateOption): void {
  }
  post(option: CreateOption): void {
    console.log(`  npm run dev`);
  }
}

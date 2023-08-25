import { CreateOption } from "../../creater.type";
import * as fs from "fs";
import * as path from "path";
import { CreaterStrategy, Variant } from "../../creater.type";
import { green } from "kolorist";
import { execSync } from "child_process";

export class VueCreaterStrategy implements CreaterStrategy {
  public name: string = "Vue";
  public path: string = "vue";
  public color = green;
  public variants?: Variant[] | undefined = [
    // {
    //   name: "vue-ts",
    //   display: "TypeScript",
    //   color: magenta,
    // },
  ];
  public devDependencies = {
    eslint: "^8.36.0",
    '@geektech/eslint-plugin': "^1.0.3",
    '@geektech/svg2icon': "^1.0.6"
  };
  public scripts = {
    "lint-staged": "lint-staged",
    "svg2icon": "svg2icon",
  };
  public lintStaged = {
    "*.{js,ts}": ["eslint --fix"],
  };
  pre(): void {
    // throw new Error("Method not implemented.");
  }
  create(option: CreateOption): void {
    execSync(`npm create vite ${option.projectName} -- --template vue-ts`);
  }
  post(option: CreateOption): void {
    console.log(`  npm install`);
    console.log(`  npm run dev`);
  }
}

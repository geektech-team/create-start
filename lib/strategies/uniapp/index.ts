import { CreateOption } from "../../creater.type";
import { CreaterStrategy, Variant } from "../../creater.type";
import { trueColor } from "kolorist";
import { execSync } from "child_process";

export class UniappCreaterStrategy implements CreaterStrategy {
  public name: string = "Uniapp";
  public path: string = "uniapp";
  public color = trueColor(66, 185, 131);
  public variants?: Variant[] | undefined = [
    // {
    //   name: "vue-ts",
    //   display: "TypeScript",
    //   color: magenta,
    // },
  ];
  public devDependencies = {
    eslint: "^8.36.0",
    '@geektech/eslint-plugin': "^1.0.6",
    '@geektech/svg2icon': "^1.0.7"
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
    execSync(`npx degit dcloudio/uni-preset-vue#vite-ts ${option.projectName} --force`);
  }
  post(option: CreateOption): void {
    console.log(`  npm install`);
    console.log(`  npm run dev:\${platform}`);
  }
}

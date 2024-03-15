import { CreateOption } from "../../creator.type";
import { CreatorStrategy, Variant } from "../../creator.type";
import { trueColor } from "kolorist";
import { execSync } from "child_process";

export class VueCreaterStrategy implements CreatorStrategy {
  public name: string = "Vue";
  public path: string = "vue";
  public color = trueColor(66, 184, 131);
  public variants?: Variant[] | undefined = [
    // {
    //   name: "vue-ts",
    //   display: "TypeScript",
    //   color: magenta,
    // },
  ];
  public dependencies = {
    axios: "^1.6.2",
    '@geektech/utils': "^2.2.0",
    "vue-router": "^4.2.5",
    "@arco-design/web-vue": "^2.53.3",
  };
  public devDependencies = {
    eslint: "^8.36.0",
    '@geektech/eslint-plugin': "^1.0.6",
    '@geektech/svg2icon': "^1.0.7",
    "less": "^4.2.0",
    "vitest": "^1.1.1",
  };
  public scripts = {
    "lint-staged": "lint-staged",
    "svg2icon": "svg2icon",
    "test": "vitest"
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
    console.log(`  npm run dev`);
  }
}

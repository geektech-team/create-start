import { CreateOption, CreaterStrategy } from "./creater.type";
import * as fs from "fs";
import * as path from "path";
import minimist from "minimist";
import { copy, emptyDir, hasDir } from "./utils/file";
import { PromptsStep } from "./prompts-step";
import { green } from "kolorist";
import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;
const cwd = process.cwd();

export interface Variant {
  name: string;
  display: string;
  color: (str: string | number) => string;
}

export class Creater {
  private strategy?: CreaterStrategy;
  public dependencies = {};
  public devDependencies = {
    "@commitlint/cli": "^17.4.4",
    "@commitlint/config-conventional": "^17.6.7",
    "@geektech/commitlint-config": "^0.0.2",
    prettier: "^3.0.0",
    husky: "^8.0.3",
    "lint-staged": "^13.2.3",
  };
  public scripts = {
    "lint-staged": "lint-staged",
    prepare: "husky install",
  };
  public lintStaged = {
    "*.{js,jsx,ts,tsx,vue,css,less,json,md}": ["prettier --write"],
  };

  constructor(public strategies: CreaterStrategy[]) {
    this.init();
  }

  async init() {
    const { framework, overwrite, projectName, variant } =
      await this.getPromptsResult();
    this.setStrategy(framework.name);
    const createOption = {
      projectName,
      packageRoot: __dirname,
      root: path.join(cwd, projectName),
      template: variant,
      overwrite,
      framework,
      packageJson: {}
    };
    await this.pre(createOption);
    await this.create(createOption);
    await this.post(createOption);
  }

  setStrategy(strategyName: string) {
    this.strategy = this.strategies.find(
      (strategy) => strategy.name === strategyName
    );
  }

  pre(option: CreateOption) {
    if (option.overwrite) {
      emptyDir(option.root, [".git"]);
    } else if (!fs.existsSync(option.root)) {
      fs.mkdirSync(option.root);
    }
    this.strategy?.pre && this.strategy.pre(option);
  }

  async create(option: CreateOption) {
    console.log(green(`\Constructing project in ${option.root}...`));
    await this.strategy?.create(option);
    this.initPackage(option);
    this.initExtraFiles(option);
  }

  post(option: CreateOption) {
    const cwd = process.cwd();
    console.log(`\nDone. Now run:\n`);
    console.log(`  cd ${path.relative(cwd, option.root)}`);
    const hasInitGit = hasDir('.git', option.root);
    if(!hasInitGit) {
      console.log(`  First of all, you have to init git file`);
      console.log(`  Run: git init`);
      console.log(`  Run: git remote add origin <origin git path>`);
    }
    console.log(`  npm run install`);
    this.strategy?.post && this.strategy.post(option);
  }

  async getPromptsResult() {
    const argv = minimist(process.argv.slice(2), {
      string: ["_"],
    });
    const targetDir: string = argv._[0];
    let template = argv.template || argv.t;
    const defaultProjectName = targetDir || "project-starter";
    const templates = this.strategies
      .map((f) => (f.variants && f.variants?.map((v) => v.name)) || [f.name])
      .reduce((a, b) => a.concat(b), []);
    const promptsStep = new PromptsStep(targetDir);
    promptsStep.addProjectNameStep(defaultProjectName);
    promptsStep.addOverwriteStep();
    promptsStep.addOverwriteCheckerStep();
    promptsStep.addPackageNameStep();
    promptsStep.addFrameworkStep(this.strategies, templates, template);
    promptsStep.addVariantStep();
    const result = await promptsStep.excute();
    if (targetDir) {
      result.projectName = targetDir;
    }
    return result;
  }

  initPackage(option: CreateOption) {
    const targetPackagePath = path.join(option.root, `package.json`);
    const packageJson = JSON.parse(fs.readFileSync(targetPackagePath, "utf8"));
    packageJson.name = option.projectName;
    packageJson.dependencies = {
      ...packageJson.dependencies ?? {},
      ...this.dependencies ?? {},
      ...(this.strategy.dependencies ?? {}),
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies ?? {},
      ...this.devDependencies ?? {},
      ...(this.strategy.devDependencies ?? {}),
    };
    packageJson.scripts = {
      ...packageJson.scripts ?? {},
      ...this.scripts ?? {},
      ...(this.strategy.scripts ?? {}),
    };
    packageJson["lint-staged"] = {
      ...packageJson.lintStaged ?? {},
      ...this.lintStaged ?? {},
      ...(this.strategy.lintStaged ?? {}),
    };
    option.packageJson = packageJson;
    fs.writeFileSync(targetPackagePath, JSON.stringify(packageJson, null, 2));
  }

  initExtraFiles(option: CreateOption) {
    copy(option.packageRoot + "strategies/common", option.root);
    const sourcePath = option.packageRoot +
      `strategies/${option.framework.path}/extra`;
    if (fs.existsSync(sourcePath)) {
      copy(sourcePath, option.root);
    }
  }
}

import { CreateOption } from "../../creater.type";
// import * as fs from "fs";
// import * as path from "path";
import { CreaterStrategy, Variant } from "../../creater.type";
import { red } from "kolorist";
import { spawnSync } from "child_process";

export class NestCreaterStrategy implements CreaterStrategy {
  public name: string = "Nest";
  public path: string = "nest";
  public color = red;
  public variants?: Variant[] | undefined = [];
  public dependencies = {
    "@geektech/nest-core": "^1.0.1",
  };
  public devDependencies = {};
  public scripts = {
    dev: "nest start --watch",
  };
  public lintStaged = {};
  pre(option: CreateOption): void {
    // throw new Error("Method not implemented.");
  }
  async create(option: CreateOption) {
    return spawnSync("npx", ["@nestjs/cli@10.0.0", "new", option.projectName], {
      stdio: "inherit",
      shell: true,
      cwd: process.cwd(),
    });
  }
  post(option: CreateOption): void {
    // fs.unlinkSync(path.resolve(option.root, ".prettierrc"));
    console.log(`  npm run dev`);
  }
}

import { CreateOption } from "../../creator.type";
// import * as fs from "fs";
// import * as path from "path";
import { CreatorStrategy, Variant } from "../../creator.type";
import { trueColor } from "kolorist";
import { spawnSync } from "child_process";

export class NestCreaterStrategy implements CreatorStrategy {
  public name: string = "Nest";
  public path: string = "nest";
  public color = trueColor(237, 41, 69);
  public variants?: Variant[] | undefined = [];
  public dependencies = {
    "@geektech/nest-core": "^3.2.0",
  };
  public devDependencies = {};
  public scripts = {
    dev: "nest start --watch",
    "g:mo": "nest g mo",
    "g:co": "nest g co",
    "g:s": "nest g s",
    "g:r": "nest g resource"
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

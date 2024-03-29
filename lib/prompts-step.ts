import * as fs from 'fs';
import { red } from 'kolorist';
import { reset } from 'kolorist';
import { exit } from 'process';
import prompts from 'prompts';
import { CreatorStrategy } from './creator.type';
import { isEmpty } from './utils/file';
import { isValidPackageName, toValidPackageName } from './utils/package';

export interface PromptsResult {
  framework: CreatorStrategy;
  overwrite: string;
  packageName: string;
  projectName: string;
  variant: string;
}

export class PromptsStep {
  private steps: any[] = [];

  constructor(private targetDir: string) {}

  addStep(options) {
    this.steps.push(options);
  }

  addProjectNameStep(projectName: string) {
    this.addStep({
      type: this.targetDir ? null : 'text',
      name: 'projectName',
      message: reset('Project name:'),
      initial: projectName,
      onState: state => (this.targetDir = state.value.trim() || projectName),
    });
  }

  addOverwriteStep() {
    this.addStep({
      type: () =>
        !fs.existsSync(this.targetDir) || isEmpty(this.targetDir)
          ? null
          : 'confirm',
      name: 'overwrite',
      message: () =>
        (this.targetDir === '.'
          ? 'Current directory'
          : `Target directory "${this.targetDir}"`) +
        ` is not empty. Remove existing files and continue?`,
    });
  }

  addOverwriteCheckerStep() {
    this.addStep({
      type: (_, answers) => {
        if (answers?.overwrite === false) {
          throw new Error(red('✖') + ' Operation cancelled');
        }
        return null;
      },
      name: 'overwriteChecker',
      message: red('✖') + ' Operation cancelled',
    });
  }

  addPackageNameStep() {
    this.addStep({
      type: () => (isValidPackageName(this.targetDir) ? null : 'text'),
      name: 'packageName',
      message: reset('Package name:'),
      initial: () => toValidPackageName(this.targetDir),
      validate: dir => isValidPackageName(dir) || 'Invalid package.json name',
    });
  }

  addFrameworkStep(strategys: CreatorStrategy[]) {
    this.addStep({
      type: 'select',
      name: 'framework',
      message: () => {
        return reset('Select a framework:');
      },
      initial: 0,
      choices: strategys.map(framework => {
        return {
          title: framework.color(framework.name),
          value: framework,
        };
      }),
    });
  }

  addVariantStep(strategy?: CreatorStrategy) {
    this.addStep({
      type: framework =>
        (framework?.variants || strategy?.variants)?.length ? 'select' : null,
      name: 'variant',
      message: reset('Select a variant:'),
      choices: (framework: CreatorStrategy) =>
        (framework?.variants || strategy?.variants).map(variant => {
          const variantColor = variant.color;
          return {
            title: variantColor(variant.name),
            value: variant.name,
          };
        }),
    });
  }

  async excute(): Promise<PromptsResult> {
    let result: PromptsResult;
    try {
      result = await prompts(this.steps, {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      });
    } catch (cancelled) {
      red(cancelled.message);
      exit();
    }
    return result as PromptsResult;
  }
}

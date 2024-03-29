interface KeyValue {
  [key: string]: string | string[];
}

export interface Variant {
  name: string;
  display: string;
  color: (str: string | number) => string;
}

export interface CreatorStrategy {
  name: string;
  path: string;
  color: (str: string | number) => string;
  dependencies?: KeyValue;
  devDependencies?: KeyValue;
  scripts?: KeyValue;
  lintStaged?: KeyValue;
  variants?: Variant[];
  pre?(option: CreateOption): void;
  create(option: CreateOption): void;
  post?(option: CreateOption): void;
}

export interface CreateOption {
  projectName: string;
  packageRoot: string;
  root: string;
  template: string;
  framework: CreatorStrategy;
  overwrite: string;
  packageJson: any
}

import * as fs from "fs";
import * as path from "path";

export function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

export function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, {
    recursive: true,
  });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}
export function isEmpty(path) {
  return fs.readdirSync(path).length === 0;
}

export function emptyDir(dir: string, excludes?: string[]) {
  if (
    !fs.existsSync(dir) ||
    excludes?.find((dirName) => dir.endsWith(dirName))
  ) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (excludes?.find((fileName) => file.endsWith(fileName))) {
      continue;
    }
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs, excludes);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

export function hasDir(dirName: string, checkDirectory: string) {
  if (fs.existsSync(checkDirectory)) {
    for (const file of fs.readdirSync(checkDirectory)) {
      if (file === dirName) {
        const abs = path.resolve(checkDirectory, file);
        if (fs.lstatSync(abs).isDirectory()) return true;
      }
    }
  }
  return false;
}

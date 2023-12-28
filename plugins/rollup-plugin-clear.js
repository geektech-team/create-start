import * as fs from "fs";
import * as path from "path";

export default function clear(dirs) { 
  function emptyDir(dir, excludes) {
    if (
      !fs.existsSync(dir) ||
      excludes?.find(dirName => dir.endsWith(dirName))
    ) {
      return;
    }
    for (const file of fs.readdirSync(dir)) {
      if (excludes?.find(fileName => file.endsWith(fileName))) {
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
  return {
    name: 'clear', // this name will show up in logs and errors
    buildStart() {
      if(typeof dirs === 'string') {
        emptyDir(dirs)
      } else {
        dirs.forEach(dir => emptyDir(dir));
      }
      return null; // other ids should be handled as usually
    },
  };
}

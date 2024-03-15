import { NestCreaterStrategy } from "./strategies/nest";
import { Creator } from "./creator";
import { VueCreaterStrategy } from "./strategies/vue";
import { UniappCreaterStrategy } from "./strategies/uniapp";
import { PackageCreaterStrategy } from "./strategies/package";

const strategies = [new NestCreaterStrategy(), new VueCreaterStrategy(), new UniappCreaterStrategy(), new PackageCreaterStrategy()];

export default new Creator(strategies);

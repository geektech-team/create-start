import { NestCreaterStrategy } from "./strategies/nest";
import { Creater } from "./creater";
import { VueCreaterStrategy } from "./strategies/vue";
import { UniappCreaterStrategy } from "./strategies/uniapp";
import { PackageCreaterStrategy } from "./strategies/package";

const strategies = [new NestCreaterStrategy(), new VueCreaterStrategy(), new UniappCreaterStrategy(), new PackageCreaterStrategy()];

export default new Creater(strategies);

import { NestCreaterStrategy } from "./strategies/nest";
import { Creater } from "./creater";
import { VueCreaterStrategy } from "./strategies/vue";
import { UniappCreaterStrategy } from "./strategies/uniapp";

const strategies = [new NestCreaterStrategy(), new VueCreaterStrategy(), new UniappCreaterStrategy()];

export default new Creater(strategies);

import { NestCreaterStrategy } from "./strategies/nest";
import { Creater } from "./creater";
import { VueCreaterStrategy } from "./strategies/vue";

const strategies = [new NestCreaterStrategy(), new VueCreaterStrategy()];

new Creater(strategies);
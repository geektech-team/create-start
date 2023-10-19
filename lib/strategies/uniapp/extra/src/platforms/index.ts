import { Bridge } from "./bridge";
import { H5Bridge } from "./h5-bridge";
import { MPWeiXinBridge } from "./mp-weixin-bridge";

export class Platform {
  private bridge: Bridge;

  constructor() {
    // #ifdef H5
    this.bridge = new H5Bridge();
    // #endif
    // #ifdef MP-WEIXIN
    this.bridge = new MPWeiXinBridge();
    // #endif
  }
}

export const platform = new Platform();

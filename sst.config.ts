import { SSTConfig } from "sst";
import { Stacks } from "./stacks/stacks";

export default {
  config(_input) {
    return {
      name: "cronyism",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Stacks);
  }
} satisfies SSTConfig;

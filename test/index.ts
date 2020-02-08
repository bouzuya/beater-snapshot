import { Test, run } from "./helpers";
import { tests as jsonTests } from "./json";

const tests: Test[] = [...jsonTests];

run(tests).catch(e => {
  console.error(e);
  process.exit(1);
});

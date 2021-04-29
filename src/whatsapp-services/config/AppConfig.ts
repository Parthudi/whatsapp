import nconf from "nconf";

const currentEnv = process.env.NODE_ENV || "development";
nconf.argv()
    .env()
    .file({ file: "dist/config/env/" + currentEnv+".json" });
export default nconf;
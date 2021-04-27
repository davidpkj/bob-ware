import * as dotenv from "dotenv";

dotenv.config();

import { webserver } from "./webserver/server";
// import { intercom } from "./intercom/server";

webserver();
// intercom();
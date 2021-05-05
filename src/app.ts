import * as dotenv from "dotenv";

dotenv.config();

import { webserver } from "./webserver/server";
import { bartbot } from "./bart-the-bartender/client";
// import { intercom } from "./intercom/server";

webserver();
bartbot();
// intercom();
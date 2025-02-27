import express from "express";
import cors from "cors";

import { PORT } from "./config/index.js";

const app = express();

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));

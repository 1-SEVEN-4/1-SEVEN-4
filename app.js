import express from 'express';
import cors from 'cors';

import { PORT } from './config/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));

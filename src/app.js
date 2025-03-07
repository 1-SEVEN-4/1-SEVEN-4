/* eslint-disable prettier/prettier */
import express from 'express';
import cors from 'cors';
import { PORT } from './config/index.js';
import groupMemberRouters from './routes/member.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/groups', groupMemberRouters);

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`));

import express from 'express'
import cors from 'cors'
import groupRoute from './routes/groupRoute.js'

import { PORT } from './config/index.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/groups', groupRoute)

app.listen(PORT || 3000, () => console.log(`server on ${PORT}`))

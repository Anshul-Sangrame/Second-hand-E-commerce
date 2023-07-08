import express from 'express'
import cors from 'cors'
import router, { publicRouter } from './routes/router.js'
import 'dotenv/config'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// user Router
app.use(publicRouter)
app.use(router)

app.listen(process.env.PORT, () => {
  console.log(`Backend is running at port ${process.env.PORT}`)
})
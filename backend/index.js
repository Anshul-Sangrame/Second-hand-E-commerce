import express from 'express'
import cors from 'cors'
import router from './routes/router.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// user Router
app.use(router)

app.listen(5000, () => {
  console.log("Backend is running at port 5000")
})
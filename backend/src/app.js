import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'

app.use(
  cors({
    origin: clientOrigin,
  }),
)

app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app

import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/Product.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({
  origin: 'http://localhost:5000', // or whatever your frontend URL is
  credentials: true
}));
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/', authRoutes)

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
})
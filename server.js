import path from 'path';
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
const PORT = process.env.PORT || 8000;
import connectDB from './config/connectDB.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';
import cors from 'cors'

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}


app.use(cors(corsOptions)) // Use this after the variable declaration

//DB Connection
connectDB();

//middleware to parse json content
app.use(express.json());

//loading routes in server
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(uploadRoutes);

const __dirname = path.resolve(); // in es modules we have to mimic __dirname files, normally not required


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API Server is running...');
});

//Errors handling middleware


app.use(errorHandler);
app.use(notFound);
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode at PORT: ${PORT}`.white.bold);
});
//# sourceMappingURL=server.js.map
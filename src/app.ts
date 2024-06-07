import express from 'express';
import type { Application } from 'express';
import mongoose from 'mongoose';
import cityRouter from './routes/cityRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import userRouter from './routes/userRoutes.js';
import driverRouter from './routes/driverRoutes.js';
import cors from 'cors';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();

    this.connectToDatabase()
      .then(() => {
        console.log('Database connnected');
      })
      .catch((e) => {
        console.error('unable to connect');
      });
    this.app.listen(5000, () => {
      console.log(`Server is running on port ${5000}`);
    });
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: 'https://demologinfront.onrender.com',
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', 'https://demologinfront.onrender.com');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  private routes(): void {
    this.app.use('/api/v1/category', categoryRouter);
    this.app.use('/api/v1/city', cityRouter);
    this.app.use('/api/v1/users', userRouter);
    this.app.use('/api/v1/driver', driverRouter);

    // this.app.use('/user/loginverify', router);
  }

  private async connectToDatabase(): Promise<void> {
    const MONGO_URI: string = 'mongodb+srv://saniyafathima:eQ7kix203RsIlt7p@cluster0.piqskmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(MONGO_URI);
  }
}

export default new App().app;

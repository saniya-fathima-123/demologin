import express from "express";
import type { Application } from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.connectToDatabase()
      .then(() => {
        console.log("Database connnected");
      })
      .catch((e) => {
        console.error("unable to connect");
      });
    this.app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/user/users", router);
    this.app.use("/user", router);
    this.app.use("/user/login", router);
    this.app.use("/user/loginverify", router);
  }

  private async connectToDatabase(): Promise<void> {
    const MONGO_URI: string =
      "mongodb+srv://ashishkumar:6xwy0z9WLmLi5MZi@cluster0.y1zfhr8.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(MONGO_URI);
  }
}

export default new App().app;

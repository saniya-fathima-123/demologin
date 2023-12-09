import { Router } from "express";
import userController from "../controllers/UserController.js";

const router: Router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", userController.getUsers);
router.post("/registers", userController.createRegistration); // POST request for creating a user registration
router.post("/otpgenerates", userController.otpgenerate);
router.post("/otpverification", userController.verifyOtp);

export default router;

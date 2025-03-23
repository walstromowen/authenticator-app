import express from "express";
import { test, registerUser, loginUser, getProfile} from "../controllers/authControllers.js";
import cors from 'cors';

const authRouter = express.Router();


authRouter.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
)

authRouter.get('/test', test);
authRouter.get('/profile', getProfile)
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)

export default authRouter;
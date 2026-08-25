import {Router} from "express"
import { getProfile, getUsers, searchUsers, updateProfile } from "../controllers/userController";
import upload from "../middlewares/upload";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.use(authMiddleware)

userRouter.get("/", getUsers)
userRouter.get("/search", searchUsers)
userRouter.get("/profile", authMiddleware, getProfile)
userRouter.put("/profile", upload.single("avatar"),authMiddleware, updateProfile)

export default userRouter;
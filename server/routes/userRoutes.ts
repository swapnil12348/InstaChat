import {Router} from "express"
import { getProfile, getUsers, searchUsers, updateProfile } from "../controllers/userController";
import upload from "../middlewares/upload";
import { authMiddleware } from "../middlewares/auth";

const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.get("/search", searchUsers)
userRouter.get("/profile", getProfile)
userRouter.put("/profile", upload.single("avatar"),authMiddleware, updateProfile)

export default userRouter;
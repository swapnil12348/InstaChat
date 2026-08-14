import {Router} from "express"
import { getProfile, getUsers, searchUsers, updateProfile } from "../controllers/userController";
import upload from "../middlewares/upload";

const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.get("/search", searchUsers)
userRouter.get("/profile", getProfile)
userRouter.put("/profile", upload.single("avatar"), updateProfile)

export default userRouter;
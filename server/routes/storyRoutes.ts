import {Router} from "express"
import upload from "../middlewares/upload";
import { createStory, getStories } from "../controllers/storyController";
import { authMiddleware } from "../middlewares/auth";

const storyRouter = Router();

storyRouter.use(authMiddleware)

storyRouter.post('/',upload.single("file"),createStory)
storyRouter.get('/',getStories)

export default storyRouter;
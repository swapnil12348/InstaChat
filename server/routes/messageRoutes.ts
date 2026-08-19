import {Router} from "express"
import { getConversations, getMessages, getOrCreateConversation, sendMessage } from "../controllers/messageController";
import upload from "../middlewares/upload";

const messageRouter = Router()

messageRouter.get('/conversations',getConversations)
messageRouter.get('/conversations/:conversationId/messages', getMessages)
messageRouter.get('/conversations/with/:targetUserId', getOrCreateConversation)
messageRouter.post('/send',upload.single("file"), sendMessage)
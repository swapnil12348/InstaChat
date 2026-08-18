
import { AuthRequest } from "../middlewares/auth";
import Conversation from "../models/Conversation";
import { Response } from "express"

// helper : find convoersation between two users

async function findConversation(userId:string, otherId:string){
    return Conversation.findOne({
        $and: [
            {participants: {$elemMatch: {$eq: userId}}},
            {participants: {$elemMatch: {$eq:otherId}}},
            {$expr: {$eq: [{$size: "$participants"}, 2]}}

        ]
    } as any)
}

// start or get a conversatrion with a userController
export const getOrCreateConversation = async (req:AuthRequest, res:Response) => {
    const userId = req.user!.id;
    const targetUserId = String(req.params.targetUserId)

    let conversation : any = await findConversation(userId, targetUserId);

    if (conversation) {
        await conversation.populate("participants", "name email handle avatar isOnline lastSeen");
        await conversation.populate("lastMessage")
        
    }else{
        conversation = await Conversation.create({participants:[userId, String(targetUserId)]})
        await conversation.populate("participants", "name email handle avatar isOnline lastSeen")
    }

    const other = (conversation.participants as any[]).find((p: any)=>String(p._id !== userId));

    res.json({
        success:true,
        conversation: {
            _id:conversation._id, 
            participant:other, 
            lastMessage: conversation.lastMessage},
    })
    
}

//get all conversations for the current user
export const getConversations = async (req:AuthRequest, res:Response) => {
    const userId = req.user!.id;
    const conversations = await Conversation.find({participants: {$in: [userId]}}).populate("participants", "name email handle avatar isOnline lastSeen").populate("lastMessage").sort({updatedAt : -1})

    const shaped = conversations.map((c)=>{
        const other = (c.participants as any[]).find((p:any)=>String(p._id) !==userId);
        return {_id: c._id, isGroup: false, participant:other, lastMessage:c.lastMessage, updatedAt:c.updatedAt}

    })

    res.json({success:true, conversations:shaped})
    
}

//send a Message
export const sendMessgae = async (req:AuthRequest, res:Response) => {
    
}

//get all messages in a conversation
export const getMessages = async(req:AuthRequest, res:Response)=>{

}
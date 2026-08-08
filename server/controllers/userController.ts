// get all user

import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import User from "../models/User";

export const getUsers = async(req: AuthRequest, res: Response)=>{
    const users = await User.find({_id:{$ne: req.user!.id}}).select("name email handle avatar bio isOnline lastSeen")
    res.json({success:true, users})
}

// search user by name email or handle

export const searchUsers = async (req:AuthRequest, res:Response)=>{

    const {query} = req.query;
    if (!query || typeof query !== "string") {
        res.json({success:true, users:[]})
        return
    }

    const regex = new RegExp(query, "i");
    const users = await User.find({

    })


    res.json({success:true,users})

}
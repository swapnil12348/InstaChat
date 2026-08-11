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
        _id: {$ne: req.user!.id},
        $or:[{name:regex}, {email:regex}, {handle:regex}]

    }).select("name email handle avatar bio isOnline lastSeen").limit(20);


    res.json({success:true,users})

}

// get current users profile

export const getProfile = async(req:AuthRequest,  res:Response) =>{
    const user = await User.findById(req.user!.id);
    if (!user) {
        res.status(404).json({success: false, message: "User not found"})
    }
    res.json({success: true, user})
}


//update profile (name, bio, handle, avatar)
export const updateProfile = async (req:AuthRequest, res:Response) => {
    const {name, bio, handle} = req.body;
    const file = req.file;
    
}
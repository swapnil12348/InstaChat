import {Request, Response, NextFunction} from "express"
import{clerkMiddleware, clerkClient, requireAuth, getAuth} from'@clerk/express'
import User from "../models/User";



export interface AuthRequest extends Request{
    user?: {id: string, name: string, email: string}
}


export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const {userId} = getAuth(req)
        if (!userId) {
            res.status(401).json({success: false, message: "Unauthenticated"})
        }

        //check if user exists locally on Mongodb

        let localUser= await User.findById(userId)

        if (!localUser) {
            // lazy sync: fetch details from clerk api
            
        }
        
    } catch (error) {
        
    }
    
}
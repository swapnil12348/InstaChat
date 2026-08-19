import mongoose, {Document, Model, Schema} from "mongoose"

export interface IStory extends Document{
    user:string;
    mediaUrl:string;
    mediaType:"image" | "video";
    createdAt: Date;
}

const StorySchema = new Schema<IStory>({
    user:{type:String, ref:"User", required:true}
})
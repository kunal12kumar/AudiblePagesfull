import mongoose from "mongoose";
const {Schema}=mongoose;

const audiofile=new mongoose.Schema({
    Audio:{type:String,required:true}
})

export const saveaudiofile=mongoose.model('saveaudiofile',audiofile);
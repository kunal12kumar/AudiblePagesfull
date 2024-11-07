import mongoose from "mongoose";
const {Schema}=mongoose;


const userpdf=new mongoose.Schema({
    Title:{type:String,required:true},
    File:{type:String,required:true}
})

export const saveuserpdf=mongoose.model('saveuserpdf',userpdf);
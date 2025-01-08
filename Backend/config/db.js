import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://Damayanti:77389414@cluster0.j7m3h.mongodb.net/cafeteria_project').then(()=>console.log("DB CONNECTED"));
}
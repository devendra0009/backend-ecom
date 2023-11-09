import mongoose from "mongoose"

export const dbConnect=async()=>{
    // console.log(process.env.DB_URI);
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Database connected!')
    } catch (error) {
        console.log(error);
    }
}
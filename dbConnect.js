import mongoose from "mongoose"

export const dbConnect=async()=>{
    // console.log(process.env.DB_URI);
    try {
        await mongoose.connect(process.env.DB_URI);
        // await mongoose.connect('mongodb+srv://davendra:davendra123@cluster0.iqvciiu.mongodb.net/?retryWrites=true&w=majority');
        console.log('Database connected!')
    } catch (error) {
        console.log(error);
    }
}
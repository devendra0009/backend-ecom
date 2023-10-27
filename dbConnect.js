import mongoose from "mongoose"

export const dbConnect=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/ecom');
        // await mongoose.connect('mongodb+srv://davendra:davendra123@cluster0.iqvciiu.mongodb.net/?retryWrites=true&w=majority');
        console.log('Database connected!')
    } catch (error) {
        console.log(error);
    }
}
import mongoose from "mongoose";


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CC || '');
        console.log('Database connected');
    } catch (error) {
        console.log(error)
        throw new Error('Database connection error')
    }
}


export default dbConnection;
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        //console.log("mongo_uri: ",process.env.MONGO_URI); //this line is added to check is the connection is defined or not
        const conn = await mongoose.connect(process.env.MONGO_URI) //this is where we use .env to connect to the db use MONGO_UTI
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log("Error connection to MongoDB:",error.message)
        process.exit(1) //1 is failure of connection to mongodb database,If the status code is 0 then it means success
    };
}
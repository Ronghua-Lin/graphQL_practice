const mongoose=require('mongoose')
const {MONGO_URL}=process.env


const connectDB= async()=>{
    const conn=await mongoose.connect(MONGO_URL,{
        dbName:"graphQL_practice"
    })
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold)
}


module.exports=connectDB
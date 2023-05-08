const mongoose=require('mongoose')

const PorjectSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        emus:['Not Started','In Progress','Completed']
    },
    ClientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client"
    }
})

module.exports=mongoose.model('Project',PorjectSchema)
const mongoose=require("mongoose")
const userss=mongoose.Schema(
    {
        name: {type:String,required:true},
        email: {type:String,required:true},
        username: {type:String,required:true},
    }
)
const User=mongoose.model("User",userss)
module.exports=User
const mongoose=require("mongoose")
const transaction=mongoose.Schema(
    {
        user: {type:String,required:true},
        seller: {type:String,required:true},
        amount: {type:Number,required:true}
    },{
        timestamps:true
})

const List=mongoose.model("List",transaction)
module.exports=List
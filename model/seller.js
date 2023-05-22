const mongoose=require("mongoose")
const seller=mongoose.Schema(
    {
        name: {type:String},
        image: {type:String},
        status: {type:String},
        item: {type:[{
            id:{type:Number},
            name: {type:String},
            price:{type:Number}

        }]}
    }
)
const Seller=mongoose.model("Seller",seller)
module.exports=Seller
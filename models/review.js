const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let reviewSchema = new Schema({
    rating:Number,
    comment:String,

    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

})

module.exports=mongoose.model("Review", reviewSchema)
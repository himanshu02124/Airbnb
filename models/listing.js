
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
// }

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    url:String,
    file:String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },

  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"Review"
  }],

  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

module.exports = mongoose.model("Listing", listingSchema);

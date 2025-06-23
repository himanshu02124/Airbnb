const mongoose = require("mongoose")
const initData = require("./data.js")
const listing = require("../models/listing");


async function main() {
 await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
}
main().then(()=>{
  console.log("connected to DB")
})
.catch(err => console.log(err));

 
const initDB = async ()=>{
  await listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:'6847e2260c9acc4cd03e987d'}))
    await listing.insertMany(initData.data)
    console.log("data was initialized")

}
initDB()
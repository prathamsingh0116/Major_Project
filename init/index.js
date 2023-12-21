const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


//database connect 
const url = "mongodb://127.0.0.1:27017/wanderlust"
main().then(() => {
    console.log("Connected to DB");
})
async function main(){
    await mongoose.connect(url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner : "6564e17b534c290f3beeeb3e",
}))
    await Listing.insertMany(initData.data);
    console.log("Data was initalize");
}

initDB();
require('dotenv').config();

const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connecting successfully hhhh');
    }catch(error){
        console.log('failllllllllll');
    }
}
module.exports={connect};
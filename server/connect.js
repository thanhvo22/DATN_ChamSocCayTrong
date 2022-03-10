require('dotenv').config();

const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect(
            `mongodb+srv://thanhvo22:2212@chamsoccaytrong-v1.owuep.mongodb.net/chamsoccaytrong_v1?retryWrites=true&w=majority`
          );
        console.log('connecting successfully hhhh');
    }catch(error){
        console.log('failllllllllll');
    }
}
module.exports={connect};


// const dbConnect = async () => {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://thanhvo22:2212@chamsoccaytrong-v1.owuep.mongodb.net/chamsoccaytrong_v1?retryWrites=true&w=majority`
//     );

//     console.log("mongodb connected!");
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };
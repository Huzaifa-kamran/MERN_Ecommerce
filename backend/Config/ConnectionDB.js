const mongoose = require('mongoose');

// Connect to MongoDB
const connectionDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.DB);
        connection? console.log(`Mongo Atlas is connected with ${process.env.PORT}`): console.log(`Error while connecting Mongo Atlas with ${process.env.PORT}`) 
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {connectionDB};
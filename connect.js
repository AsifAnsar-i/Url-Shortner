const mongoose = require('mongoose');   

async function connectToMongoDB(url) {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
    
}

module.exports = connectToMongoDB;
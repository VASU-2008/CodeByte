const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/veyora_healthcare';
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\n⚠️  [MongoDB Connection Error]: ${error.message}`);
        console.error(`👉  Reason: No MongoDB instance is listening on port 27017.`);
        console.error(`👉  Fix Options:`);
        console.error(`    1. Start local MongoDB: Run 'net start MongoDB' in Admin PowerShell or run 'mongod'`);
        console.error(`    2. Or use MongoDB Atlas (Cloud): Add your free Atlas URI to server/.env:`);
        console.error(`       MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/veyora_healthcare\n`);
    }
};

module.exports = connectDB;
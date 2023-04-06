const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const URL = `mongodb://127.0.0.1:27017`;

        console.log(process.env.MONGO_URI);
        const connection = await mongoose.connect(
            URL,
            {
                keepAlive: true,
                keepAliveInitialDelay: 300000,
                socketTimeoutMS: 2000000,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = connectDB;
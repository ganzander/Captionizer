const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

const connectToDatabase = async () => {
    if (cached.conn)
        return cached.conn;

    if (!MONGO_URL)
        throw new Error("missing mongodb database url");

    cached.promise = cached.promise || mongoose.connect(MONGO_URL, {
        bufferCommands: false
    });

    cached.conn = await cached.promise;

    return cached.conn;
};

module.exports = connectToDatabase;

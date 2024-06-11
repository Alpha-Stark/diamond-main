// installed mongoose and mongodb
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };
// let cached = (global as any).mongoose || { conn: null, promise: null };
/** Initialized cached variable. Here we attempt to retreive the mongoose proprty from the global object.
   In nodeJs, "(global as any). " provide a space to store global variables.
   This cached variable in intent to hold a cached connection to our database.
*/

const connectToDatabase = async () => {
    // connect with database
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    } //as this .connect return a promise, we store it in cached.promise.

    cached.conn = await cached.promise; // That promised is then awaited to get the main connection, because we want the cached.conn to be a final fetched things, then we awaited the promise to get connection.  //just like respose.json()
    console.log("Connected to database");
    return cached.conn; // We then return this connection to be used from different location. if needed, simultaneously too.
};

module.exports = { connectToDatabase };

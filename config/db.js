const mongoose = require('mongoose');
// import { MONGOURI } from "./secrets";
// const MONGOURI = require('./secrets');
const { MONGO_URI } = require('./secrets');

console.log(MONGO_URI);

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true
        });
        console.log('Connected to DB!');
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
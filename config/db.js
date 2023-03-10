const mongoose = require('mongoose');
const { MONGO_URI } = require('./secrets');

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
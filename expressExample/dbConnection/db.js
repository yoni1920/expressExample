const mongoose = require('mongoose');
const mongodbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'web-tar-four';

mongoose.connect(`${mongodbURL}/${dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log(`MongoDB database - ${dbName} connection established successfully`)
});

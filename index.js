const connectToMongoDB = require('./controllers/dbConnection');
const collectData = require('./controllers/collectData');
const pushDataToDatabase = require('./controllers/pushData');

require('dotenv').config();

connectToMongoDB(process.env.DB_URI).then(() => {
    collectData.getTotalDataFromAPI().then((result) => {
        pushDataToDatabase(result[0], result[1])
})}).catch( (error) => {
    console.error(error);
});

console.log("Completed Task");

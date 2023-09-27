const connectToMongoDB = require('./controllers/dbConnection');
const collectData = require('./controllers/collectData');
const pushDataToDatabase = require('./controllers/pushData');

require('dotenv').config();

async function main(){
    try {
        await connectToMongoDB(process.env.DB_URI);
        const result = await collectData.getTotalDataFromAPI();
        await pushDataToDatabase(result[0], result[1]);
        
        console.log("Completed Task");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
main();
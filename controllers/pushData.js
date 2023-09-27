const LeaderboardFifteen = require("../model/leaderboardFifteen");
const LeaderboardSixty = require("../model/leaderboardSixty");

async function pushDataToDatabase(lbFifteen, lbSixty) {
    console.log("Pushing data to database");
    console.log(lbFifteen.length, " - 15 sec", lbSixty.length, " - 60 sec");

    await saveEntriesToDatabaseFifteen(lbFifteen);
    await saveEntriesToDatabaseSixty(lbSixty);
}

async function saveEntriesToDatabaseSixty(lbSixty) {
    let count = 0;
    let errors = [];

    const savePromises = lbSixty.map(async (element) => {
        try {
            const newEntry = await LeaderboardSixty.create({
                wpm: element.wpm,
                raw: element.raw,
                acc: element.acc,
                con: element.consistency,
                ts: element.timestamp,
                uid: element.uid,
                r: element.rank
            });
            count++; // Increment count for each successful entry
            if (count % 100 == 0){
                console.log(`Successfully saved ${count} entries to leaderboard60 database`);
            }
        } catch (error) {
            console.log(error);
            errors.push(error);
        }
    });

    await Promise.all(savePromises);

    if (errors.length > 0) {
        console.error(`Encountered ${errors.length} errors while saving to leaderboard60 database.`);
    } else {
        console.log(`Successfully saved ${count} entries to leaderboard60 database`);
    }

    console.log(`Successfully saved ${count} entries to leaderboard60 database`);
}

async function saveEntriesToDatabaseFifteen(lbFifteen) {
    let count = 0;
    let errors = [];

    const savePromises = lbSixty.map(async (element) => {
        try {
            const newEntry = await LeaderboardFifteen.create({
                wpm: element.wpm,
                raw: element.raw,
                acc: element.acc,
                con: element.consistency,
                ts: element.timestamp,
                uid: element.uid,
                r: element.rank
            });
            count++; // Increment count for each successful entry
            if (count % 100 == 0){
                console.log(`Successfully saved ${count} entries to leaderboard15 database`);
            }
        } catch (error) {
            console.log(error);
        }
    });

    await Promise.all(savePromises);

    if (errors.length > 0) {
        console.error(`Encountered ${errors.length} errors while saving to leaderboard15 database.`);
    } else {
        console.log(`Successfully saved ${count} entries to leaderboard15 database`);
    }

    console.log(`Successfully saved ${count} entries to leaderboard15 database`);
}

module.exports = pushDataToDatabase;
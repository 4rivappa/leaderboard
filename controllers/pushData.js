const LeaderboardFifteen = require("../model/leaderboardFifteen");
const LeaderboardSixty = require("../model/leaderboardSixty");

async function pushDataToDatabase(lbFifteen, lbSixty) {
    console.log("Pushing data to database");
    console.log(lbFifteen.length, " - 15 sec", lbSixty.length, " - 60 sec");

    saveEntriesToDatabaseFifteen(lbFifteen);
    saveEntriesToDatabaseSixty(lbSixty);
}

async function saveEntriesToDatabaseSixty(lbSixty) {
    let count = 0;

    for (const element of lbSixty) {
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
        }
    }

    console.log(`Successfully saved ${count} entries to leaderboard60 database`);
}

async function saveEntriesToDatabaseFifteen(lbFifteen) {
    let count = 0;

    for (const element of lbFifteen) {
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
    }

    console.log(`Successfully saved ${count} entries to leaderboard15 database`);
}

module.exports = pushDataToDatabase;
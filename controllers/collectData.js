const axios = require('axios');

var leaderboardSixtySeconds = [];
var leaderboardFifteenSeconds = [];

async function getTotalDataFromAPI() { 
  try {
    let skip = 0;
    let limit = 50;
    let limitCount = 50;
    var apiUrl = `http://api.monkeytype.com/leaderboards/daily?language=english&mode=time&mode2=60&skip=${skip}&limit=${limitCount}&daysBefore=1`;
    
    while (limit <= 1000) {
        apiUrl = `http://api.monkeytype.com/leaderboards/daily?language=english&mode=time&mode2=60&skip=${skip}&limit=${limitCount}&daysBefore=1`;
        console.log(apiUrl)
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const data = response.data;
            // console.log(response.data.data[0])
            // console.log(typeof(response.data.data));
            leaderboardSixtySeconds = leaderboardSixtySeconds.concat(data.data);
        } else {
            console.error(`API request failed with status code ${response.status}`);
        }
        skip += 50;
        limit += 50;
    }

    skip = 0;
    limit = 50;
    limitCount = 50;
    var apiUrl = `http://api.monkeytype.com/leaderboards/daily?language=english&mode=time&mode2=15&skip=${skip}&limit=${limitCount}&daysBefore=1`;
    
    while (limit <= 1000) {
        apiUrl = `http://api.monkeytype.com/leaderboards/daily?language=english&mode=time&mode2=15&skip=${skip}&limit=${limitCount}&daysBefore=1`;
        console.log(apiUrl)
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const data = response.data;
            // console.log(response.data.data[0])
            // console.log(typeof(response.data.data));
            leaderboardFifteenSeconds = leaderboardFifteenSeconds.concat(data.data);
        } else {
            console.error(`API request failed with status code ${response.status}`);
        }
        skip += 50;
        limit += 50;
    }
    return [leaderboardFifteenSeconds, leaderboardSixtySeconds];
  } catch (error) {
    console.error('Error making API request:', error.message);
  }
}

module.exports = { getTotalDataFromAPI, leaderboardSixtySeconds, leaderboardFifteenSeconds};
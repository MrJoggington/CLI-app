require("dotenv").config();
var fs = require('fs')
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify)
var input = process.argv[2]
var method = process.argv.splice(3).join(" ")

// =========== commands needed ================
// concert-this
//spotify-this-song
//movie-this
//do-what-it-says
//=============================================

switch (input) {
    case "concert-this":
        concert()
        break;
    case "spotify-this-song":
        song()
        break;
    case "movie-this":
        movie()
        break;
    case "what-it-do-baby":
        doThing()
        break;
}
function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + method + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var concertData = response.data[i];
            var conDate = moment(concertData.datetime).format("MM/DD/YYYY")
            console.log(`
            =================== Venue Details ===============\n
            Name: ${concertData.venue.name}\n
            Country: ${concertData.venue.country}\n
            City: ${concertData.venue.city}\n
            Date: ${conDate}\n
            =====================================================\n
            `)
        }
    })
}
function movie() {
    axios.get("http://www.omdbapi.com/?t=" + method + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(function (response) {
        var movieData = response.data
        console.log(
            "\n Movie: " + movieData.Title,
            "\n Year of Release: " + movieData.Year,
            "\n Imdb rating: " + movieData.Ratings.imdbRating,
            "\n Rotten Tomatoes: " + movieData.Ratings[1],
            "\n Country of production: " + movieData.Country,
            "\n Language: " + movieData.Language,
            "\n Actors: " + movieData.Actors,
            "\n Plot of the Movie: " + movieData.Plot
        )
    })
}
function song() {
    spotify.search({ type: 'track', query: method, limit: 1 }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log(`
                Artist: ${songData.artists[0].name}\n
                Song: ${songData.name}\n
                Preview Url: ${songData.preview_url}\n
                Album: ${songData.album.name}\n
                =============================================
                `)
            }
        } else {
            console.log('Error occurred.');
        }
    });

}
function doThing() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            console.log('error occurred: ' + error)
        } else {
            var txt = data.split(',');

            song(txt[1]);
        }
    });
}

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
    case "do-what-it-says":
        doThing()
        break;
}
function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + method + "/events?app_id=codingbootcamp").then(function (response) {
        var concertData = response.data
        console.log(concertData)
    })
}
function movie() {
    axios.get("http://www.omdbapi.com/?t=" + method + "&y=&plot=short&tomatoes=True&apikey=trilogy").then(function (response) {
        var movieData = response.data
        console.log(movieData)
    })
}
function song() {
    spotify.search({ type: 'track', query: method, limit: 1 }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song: " + songData.name);
                //spotify preview link
                console.log("Preview URL: " + songData.preview_url);
                //album name
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");
            }
        } else {
            console.log('Error occurred.');
        }
    });

}
function doThing() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            console.log('error occuerred: ' + error)
        } else {
            var txt = data.split(',');

            song(txt[1]);
        }
    });
}

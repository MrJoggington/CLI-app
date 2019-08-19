require("dotenv").config();
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
        break;
    case " spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
}



/**
 * WatchController
 *
 * @description :: Server-side logic for managing watches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var reddit = require("./RedditController.js");
var $ = require('cheerio');
module.exports = {
    index: function(request, response) {
        var sub = request.param('subreddit');
        var videos = sails.controllers.reddit.getGfys(sub).then(function(data) {
            console.log("------------------------------------------");
            console.log(data);

            return response.view('watch', {

                mp4Url: data[0]
            });

        });


    },
    getCurrentSub: function(req) {
        var sub = req.param("subreddit");
        return sub;
    }
};

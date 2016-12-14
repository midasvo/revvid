/**
 * RedditController
 *
 * @description :: Server-side logic for managing reddits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
var Q = require('q');

module.exports = {

    getGfys: function(req, res) {

        var sub = req.param("subreddit");

        var subredditJSON = sails.controllers.reddit.getSubredditJSON(sub).then(function(response) {
            var amount = response.data.children.length;
            var children = response.data.children;
            for (var i = 0; i < amount; i++) {
                if (children[i].data.domain === "gfycat.com") {
                    console.log(children[i].data.url);
                    var mp4 = sails.controllers.reddit.getGfyMP4(children[i].data.url).then(function(response) {
                        console.log(response); // push to array
                        return res.send(response); // To see result on browser

                    });
                }
            }

        });
    },

    getSubredditJSON: function(subredditname) {
        var deferred = Q.defer();
        console.log("getting JSON for: " + subredditname);
        request('https://www.reddit.com/r/' + subredditname + '/new.json', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = sails.controllers.reddit.parseJSON(body);
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    },

    parseJSON: function(json) {
        return JSON.parse(json);
    },

    getUrlFromJsonNode: function(node) {

    },
    getGfyMP4: function(gfy) {
        var deferred = Q.defer();
        var gfyname = gfy.substring('https://gfycat.com'.length);

        var jsonurl = "https://gfycat.com/cajax/get/" + gfyname;

        request(jsonurl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                deferred.resolve(JSON.parse(body)["gfyItem"]["mp4Url"]);
            }
        });
        return deferred.promise;
    }
};

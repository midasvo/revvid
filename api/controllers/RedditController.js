/**
 * RedditController
 *
 * @description :: Server-side logic for managing reddits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
var Q = require('q');
var RedditApi = require('reddit-oauth');
var sleep = require('sleep');
module.exports = {

    getVideoSources: function(children) {

        var amount = children.length;
        console.log("Received " + amount + " posts");
        var array = [];
        var promises = [];
        for (var i = 0; i < amount; i++) {
            var deferred = Q.defer();

            /*            console.log("Checking if post origin is gfycat...");
             */
            if (children[i].data.domain === "gfycat.com") {
                /*                console.log("Found gfycat!");
                                console.log("Retrieving mp4..");
                */

                var prom = sails.controllers.reddit.getGfyMP4(children[i].data.url).then(function(result) {
                    return result;
                });
                promises.push(prom);

            } else {
                /*                console.log(children[i].data.domain + " is not gfycat, skipping.");
                 */
            }
        }
        return Q.all(promises);
    },

    /*
function get_all_the_things(things) {
    var the_promises = [];

    things.forEach(function(thing) {
        var deferred = Q.defer();
        get_a_thing(thing, function(result) {
            deferred.resolve(result);
        });
        the_promises.push(deferred.promise);
    });

    return Q.all(the_promises);
}
    */

    getGfys: function(sub) {
        var deferred = Q.defer();
        var deferred1 = Q.defer();

        console.log("Retrieving gfys from sub: " + sub);

        sails.controllers.reddit.getSubredditJSON(sub).then(function(response) {
            console.log("Retrieved JSON");
            return response.data;

        }).then(function(data) {
            /*            console.log(data.children[1].data);
             */
            sails.controllers.reddit.getVideoSources(data.children).then(function(eg) {
                console.log(eg);
                deferred1.resolve(eg);

            });
        });

        return deferred1.promise;
    },

    getSubredditJSON: function(subredditname) {
        var deferred = Q.defer();
        /*        console.log("getting JSON for: " + subredditname);
         */
        /*        https: //www.reddit.com/r/porninfifteenseconds/.json?limit=1000000000000
         */
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
        var jsonurl = "https://gfycat.com/cajax/get" + gfyname;
        /*        console.log("Preparing mp4 retrieval for " + gfy + ", request url is: " + jsonurl);
         */
        request(jsonurl, function(error, response, body) {
            /*            console.log("Request finished for: " + jsonurl);
             */
            if (!error && response.statusCode == 200) {
                /*                console.log("Finished with status code: " + response.statusCode)
                 */
                var gfyItem = JSON.parse(body)["gfyItem"];
                /*                console.log("Attempted parse result: " + gfyItem["mp4Url"]);
                 */
                deferred.resolve(gfyItem["mp4Url"]);
            } else {
                /*                console.log("Request finished with error code : " + error + ", for " + jsonurl);
                 */
            }
        });
        return deferred.promise;
    }
};

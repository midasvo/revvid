/**
 * RedditController
 *
 * @description :: Server-side logic for managing reddits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getHelloWorld: function (req, res) {


		// get subreddit json
var request = require('request');
request('https://www.reddit.com/r/soccer/new.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var json = JSON.parse(body);
  	console.log(json.data.children[9].data);
  	for(var i = 0; i < json.data.children.length; i++) {
/*  		var url =json.data.children[0].data;
*/
/*console.log(json.data.children[i].data.domain);
*/  		if(json.data.children[i].data.domain == "gfycat.com") {
  			var url = json.data.children[i].data;
		request(url, function (error, response, body1) {
		  if (!error && response.statusCode == 200) {
/*		  	  		console.log(json1["gfyItem"]["mp4Url"]);
*/		  	  		console.log(body1);



				var jsonP = JSON.parse(body1);
				console.log(body1);

		  }
		})  		}





  	}

	




   // console.log(body) // Show the HTML for the Google homepage.
  }
})
		// parse json

		//filter gfy links

		// for each get gfy descr






           console.log("Hello World !"); // To see result on console
           return res.send("Hello World !"); // To see result on browser
}
};


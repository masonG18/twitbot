// app.js
//created separately

var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

//Setting up simple search parameters
var params = {
	q: '#nodejs',
	count: 5,
	result_type: 'recent',
	lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {
	if(!err) {
		//looping through the returned tweets
		for(let i = 0; i < data.statuses.length; i++){
			//grabbing the tweet ID from the data
			let id = {id: data.statuses[i].id_str}
			//Attempt to favorite the selected tweet
			T.post('favorites/create', id, function(err, response) {
				//if favoriting fails, log the error
				if(err) {
					console.log(err[0].message);
				}
				//if successful, log the url of the tweet
				else {
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
				}
			});
		}
	}
	else {
		console.log(err);
	}
});

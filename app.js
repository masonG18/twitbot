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


//TODO: fix tweetId errors
var tweetId = 'masong18';

client.post('statuses/retweet/' + tweetId, function(err, tweet, response) {
	if(!err) {
		console.log(tweet);
	}
});

var params = {
	q: 'berniesanders',
	count: 20,
	result_type: 'recent',
	lang: 'en'
}

//TODO: fix tweet searching
client.get('search/tweets', params, function(err, tweets, response) {
	console.log(tweets);
});

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

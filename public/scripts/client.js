/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { json } = require("express/lib/response");

$(document).ready(function() {

  //loads tweets in tweet-container
  const loadtweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json"
    }).then(function (tweets) {
      console.log("success:", tweets);
      renderTweets(tweets);
    })

    $("#tweet-form")[0].reset()

  };

  //loads tweets hardcoded in initial DB
  loadtweets();
  
  //event handler for submit action (related to the form element/not to the button element)
  const handleSubmit = event => {
    event.preventDefault();
    const tweetText = $("#tweet-text").serialize()
    // const safeText = $("tweet-text")
    // console.log("Tweet text:", safeText)

    if (tweetText === "" || tweetText === null || tweetText === "text=") {
      // window.alert("Cannot submit an empty tweet.")
      $( "#error-message" ).slideUp( "slow", function() {
        // Animation complete.
      })
      $( "#error-message" ).slideDown( "slow", function() {
          // Animation complete.
        });
    } else if ((tweetText.length - 5) > 140) {
      console.log(tweetText.length)
      //window.alert("Your tweet exceeds the maximum character limit.");
      $( "#error-message" ).slideUp( "slow", function() {
        // Animation complete.
      })
      $( "#error-message" ).slideDown( "slow", function() {
        // Animation complete.
      });
    } else {
      $( "#error-message" ).slideUp( "slow", function() {
        // Animation complete.
      })

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: tweetText
      }).then(function () {
        $("#tweets-container").empty()
        loadtweets();
      })
    

    }
    
    
  };
  
  //submit takes 'event' argument by default - don't have to explicitly write (event)
  $("#tweet-form").submit(handleSubmit);


  

  // createTweetElement function: takes in a tweet object; returns a tweet <article> element containing the entire HTML structure of the tweet.
  const createTweetElement = function(tweet) {
   
    const user = tweet.user;
    const avatar = user.avatars;
    const name = user.name;
    const handle = user.handle;
    const content = tweet.content.text;
    const timestamp = tweet.created_at;
    const formattedTimestamp = timeago.format(timestamp);

    const safeContent = escape(content);
    // console.log("this is safe content:", safeContent, "type of:", typeof safeContent)
  
    const $tweet = $(`<article class="tweet">
            <header>
              <div class="tweet-header-item-multi">
                <img src="${avatar}">
                <div>${name}</div>
              </div>
              <div class="tweet-header-item">${handle}</div>
            </header>
            <p>${safeContent}</p>
            <footer>
              <div>${formattedTimestamp}</div>
              <div class="icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`);
  
    return $tweet;
  };

  //function to prevent cross-site scripting (XSS)
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  
  //renderTweets function: takes in an array of tweet objects and appends each one to the #tweets-container.
  
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
    
    // console.log(document.getElementById("tweets-container").textContent)
  };


  



/*

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc
*/


});


// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

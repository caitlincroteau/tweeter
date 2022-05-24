/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //submit takes 'event' argument by default - don't have to explicitly write (event)
  $("#tweet-form").submit(handleSubmit);

  //loads tweets hardcoded in initial DB
  loadtweets();

});

//loads tweets in tweet-container
const loadtweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json"
  }).then(function (tweets) {
    console.log("success:", tweets);
    renderTweets(tweets);
  })

  $("#tweet-form")[0].reset();
  $(".counter").val("140");
  //is this formatted correctly??

};


//event handler for submit action (related to the form element/not to the button element)
const handleSubmit = function (event) {
  event.preventDefault();
  const tweetText = $("#tweet-text").val();


  //checks for null and empty string
  if (!tweetText) {
    $("#error").slideUp("slow", function () {
      $("span.error").text("Error: Tweet field cannot be left blank. Please enter tweet content.")
    })
    $("#error").slideDown("slow", function () {
    });
    return;
  }
  
  //checks character length
  if ((tweetText.length) > 140) {
    $("#error").slideUp("slow", function () {
      $("span.error").text("Error: Cannot exceed max of 140 characters.")   
    })
    $("#error").slideDown("slow", function () {
    });
    return;
  }

  //ensures there is no error message when posting a validated tweet
  $("#error").slideUp("slow", function () {
  })
  
  //seralize data before sending it
  const form = $(this);
  const data = form.serialize();
  
  //post request
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: data
  }).then(function () {
    loadtweets();
  })

};

// createTweetElement function: takes in a tweet object; returns a tweet <article> element containing the entire HTML structure of the tweet.
const createTweetElement = function (tweet) {

  const user = tweet.user;
  const avatar = user.avatars;
  const name = user.name;
  const handle = user.handle;
  const content = tweet.content.text;
  const timestamp = tweet.created_at;
  const formattedTimestamp = timeago.format(timestamp);

  //prevent XXS
  const safeContent = escapeStr(content);
  
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
const escapeStr = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//renderTweets function: takes in an array of tweet objects and appends each one to the #tweets-container.
const renderTweets = function (tweets) {
  $("#tweets-container").empty()

  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
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

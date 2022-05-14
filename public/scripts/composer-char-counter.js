$(document).ready(function() {

  $('#tweet-text').on("input", function() {
    const maxCharacters = 140;
    let characters = $(this).val();
    let currentCharacters = maxCharacters - characters.length;

    const parent = $("textarea").parent();
    let counter = $(parent).find("output.counter");
    counter.text(currentCharacters);

    if (counter.text() < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});


// const tweetText = document.getElementById("tweet-text");

// tweetText.addEventListener("input", (event) => {
//   console.log(event);
//   console.log("An input event has happened!");
  
// });
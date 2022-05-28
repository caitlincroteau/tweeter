$(document).ready(function() {

  //counter
  $('#tweet-text').on("input", function() {
    const maxCharacters = 140;
    let characters = $(this).val();
    let currentCharacters = maxCharacters - characters.length;

    const parent = $(this).parent();
    let counter = $(parent).find("output.counter");
    counter.text(currentCharacters);

    if (counter.text() < 0) {
      counter.css("color", "red");
      return;
    }

    counter.css("color", "black");
  });

  //compose tweet button
  $(".nav-item-multi").click(function() {
    $("#tweet-form").slideToggle("slow", function() {
      $("#tweet-text").focus();
    });
  });
  
});

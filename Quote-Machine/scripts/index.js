// -------------------------------------------------------
// Intro quote
var tweet = "";
var urlAPI= "https://talaikis.com/api/quotes/random/";

$.ajax({
  url: urlAPI,
  data: {},
  success: function(result) {
    tweet = result.quote;

    $("#quote").html('"' + result.quote + ' "');
    $("#author").html("- " + result.author);
  }
});

// -------------------------------------------------------
// Quote button function
$(function() {
  $("#quote-button").click(function() {
    $("#quote,#author").animate(
      {
        opacity: "0"
      },
      000,
      function() {}
    );

    $.ajax({
      url: urlAPI,
      data: {},
      success: function(result) {
        tweet = result.quote;

        $("#quote").html('"' + result.quote + ' "');
        $("#author").html("- " + result.author);
        $("#quote,#author").animate(
          {
            opacity: "1"
          },
          1000,
          function() {}
        );
      }
    });
  });
});

// -------------------------------------------------------
// Tweet function to open in new window

$("#twitter").on("click", function() {
  console.log(tweet);
  window.open(
    "https://twitter.com/intent/tweet?text=" + tweet + "%20%23quotes"
  );
});

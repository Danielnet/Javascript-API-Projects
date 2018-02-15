$(document).ready(function() {
  
  // Main function. 
  // Checks if browser supports geolocation. 
  // Runs getlocation() and weatherAPI GET-request
  if (navigator.geolocation) {
    getLocation();
  } else {
    $(".weather-title").text("browser does not support geolocation");
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var stringXY =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        latitude +
        "&lon=" +
        longitude;

      $.ajax({
        url: stringXY,
        data: {},
        success: function(result) {
          degree = Math.round(result.main.temp);
          $(".weather-degree").text(degree + "°");
          $(".weather-title").text(result.name);
          $(".weather-second-title").text(result.sys.country);
          $(".weather-date").text(
            days[date.getDay()] +
              " " +
              date.getDate() +
              " /" +
              (date.getMonth() + 1)
          );

          $("#weather-icon").attr("src", result.weather[0].icon);
        }
      });
    });
  }

  var degree;
  var date = new Date();
  //change day names for different languages.
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  //-------------------------------------

  // Celcius / Fahrenheit button function
  $("#convertCF").click(function() {
    event.preventDefault();
    if ($(this).text() == "c") {
      $(this).text("f");
      $(".weather-degree").text(degree * 2 + 30 + "°");
    } else {
      $(this).text("c");
      $(".weather-degree").text(degree + "°");
    }
  });
});

//-----------------------------------
//end of document.ready
$(document).ready(function() {
  $(document).on("click", "a", function(e) {
    e.preventDefault();
    var url = $(this).attr("href");
    window.open(url, "_blank");
  });

  var baseUrl = "https://wind-bow.glitch.me/twitch-api/streams/";

  var arr = [
    "ESL_SC2",
    "OgamingSC2",
    "day9tv",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];

  //Render function.
  function renderItem(logo, desc, title, link) {
    var idStr = "hr" + this.i;
    var idI = "i" + this.i;
    $(".bottom-container").append(
      $("<div/>", { class: "container-fluid item", id: this.i }).append(
        $("<div/>", { class: "container" })
          .append($("<img/>", { class: "show-pic  float-left", src: logo }))
          .append(
            $("<a/>", { href: link })
              .append(
                $("<i/>", { class: "fas fa-circle green itemStatus", id: idI })
              )
              .append($("<h5/>", { text: desc }))
          )
          .append($("<p/>", { text: title }))
      )
    );
    $(".bottom-container").append(
      $("<hr/>", { class: "hr.style14", id: idStr })
    );
  }

  //Main function : runs get requests and render functions
  function renderFromButton() {
    //wipe items for new render
    $(".item").remove();
    $("hr").remove();

    var buttonInfo = this.id;
console.log(buttonInfo);
    for (i = 0; i < arr.length; i++) {
      var endUrl = baseUrl + arr[i];

      //this will run if user is offline, to gather offline data
      function getProfilePicIfOffline() {
        endUrl = "https://wind-bow.glitch.me/twitch-api/channels/" + arr[i];
        var offlineData = "";
        $.ajax({
          dataType: "json",
          url: endUrl,
          async: false,
          success: function(result) {
            offlineData = result;
          }
        });
        return offlineData;
      }

      //render items
      $.ajax({
        dataType: "json",
        url: endUrl,
        async: false,
        success: function(result) {
          id = i;
          if (result.stream != null) {
            //Streamer is online
            var title = result.stream.game;
            var logo = result.stream.channel.logo;
            var link = result.stream.channel.url;

            if (buttonInfo == "all" || buttonInfo == "online" || buttonInfo == undefined) {
              renderItem(logo, arr[i], title, link);
            }
          }

          if (result.stream == null) {
            //streamer is offline
            var offlineResult = getProfilePicIfOffline();
            var title = "Offline";
            var logo = offlineResult.logo;
            var link = offlineResult.url;

            if (buttonInfo == "all" || buttonInfo == "offline" || buttonInfo == undefined) {
              renderItem(logo, arr[i], title, link);
              $("#i" + id).remove();
            }
          }
        }
      });
    }
  }
  //default render on page load. show all items both online and offline
renderFromButton();
  
  //all BUTTON triggers
  $("#all").on("click", renderFromButton);
  $("#online").on("click", renderFromButton);
  $("#offline").on("click", renderFromButton);
});
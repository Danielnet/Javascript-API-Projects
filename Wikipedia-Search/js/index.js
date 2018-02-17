$(document).ready(function() {
  $("#queryButton").click(function() {
    var datax = $("#usrInput").val();
    var mainURL =
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" +
      datax +
      "&origin=*";

    $.ajax({
      type: "GET",
      async: false,
      url: mainURL,
      datatype: "json",
      success: function(result) {
        $(".search-bar").css("top", "0%");
        $(".inner-container").css("margin-right", "-100%");
        $(".main-container").css("height", "250vh");
        $(".search-bar").css("background", "#1c618c");
        $(".search-bar").css("padding-top", "10%");

        $(".query-result").html("");
        for (var i = 0; i < result[1].length; i++) {
          $(".query-result").append(
            "<div><a href=" +
              result[3][i] +
              "><li>" +
              result[1][i] +
              "</a>" +
              "<p>" +
              result[2][i] +
              "</p></li></div>"
          );
        }
      },
      error: function(e) {
        alert("error");
      }
    });
  });

  $("#reset").click(function() {
    $(".search-bar").css("top", "47%");
    $(".inner-container").css("margin-right", "0");
    //        $(".main-container").css("height", "100vh");
    $(".search-bar").css("background", "none");
    $(".search-bar").css("padding-top", "0px");
    $(".query-result").html("");

    //    $(".search-bar").css("padding-top","0%");
  });
});

$(".query-result").append(
  "<a href=" +
    result[3][i] +
    "><li>" +
    result[1][i] +
    "</li></a>" +
    "<div><p>" +
    result[2][i] +
    "</p></div>"
);
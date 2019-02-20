var sports = ["golf", "tennis", "football", "soccer", "basketball", "baseball"];


function displayGifs() {
    var newSport = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newSport + "&api_key=eJn3ztxEWt9hwOQAzyt9oGNvPxCtBrx6&limit=12";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#add-new").empty();
        console.log(response.data);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var sportImage = $("<img>");
            sportImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(sportImage);

            $("#add-new").prepend(gifDiv);
        }
    });
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < sports.length; i++) {

        var a = $("<button>");
        a.addClass("sport");
        a.attr("data-name", sports[i]);
        a.text(sports[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-button").on("click", function (event) {
    event.preventDefault();
    var newSport = $("#add-input").val().trim();
    sports.push(newSport);
    renderButtons();
});

$(document).on("click", ".sport", displayGifs);

renderButtons();

$(document).ready(function(){
var movies = ["Howls Moving Castle", "Spirited Away", "Princess Mononoke", "My Neighbor Totoro"];

function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#btn-row").empty();

        // Loops through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("mov_btn");
          // Added a data-attribute
          a.attr("data-name", movies[i]);
          // Provided the initial button text
          a.text(movies[i]);
          // Added the button to the buttons-view div
          $("#btn-row").append(a);
        }
      }// end function

$("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        
        var movie = $("#movie-input").val().trim();
        if (movie != "") {

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        }

        else{
            console.log("Woops, Empty form!");
        }

      });


$("body").on("click", ".mov_btn", function() {
    console.log("Clicked");
      var movie = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);//to check for data

        var results = response.data;//eaiser than typing it all out

        for (var i = 0; i < results.length; i++) { //creates the gif and ratings
            var movieDiv = $("<div>");
            var p = $("<p>");

            p.text("Rating: " + results[i].rating);

            var movieImage = $("<img>");

            movieImage.attr("class", "gif");
            movieImage.attr("src", results[i].images.fixed_height_still.url);
            movieImage.attr("alt", "movie Gif");
            movieImage.attr("data-state", "still");
            movieImage.attr("data-animate", results[i].images.fixed_height.url)
            movieImage.attr("data-still", results[i].images.fixed_height_still.url);

            movieDiv.append(p);
            movieDiv.append(movieImage);

            $("#giphy-col").prepend(movieDiv);
        }//end for loop

      });//end after ajax
    });// end btn click event
    $("body").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        var anim = $(this).attr("data-animate");
        var stil = $(this).attr("data-still");

        if (state === "still") {
          $(this).attr("src", anim);
          $(this).attr("data-state", "animate");

        }

        else if (state === "animate") {
          $(this).attr("src", stil);
          $(this).attr("data-state", "still");

        }

        else{console.log("Lol what?");}

    });


renderButtons();
});//end doc
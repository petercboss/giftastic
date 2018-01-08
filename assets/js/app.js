   // Global array and first gif
   var topics = ["Dr. Mabuse", "The Cabinet of Dr. Caligari", "Lillian Gish", "City Lights", "Metropolis", "A Trip To The Moon", "Nosferatu", "Modern Times", "The General"];
   $("#films").html("<img src='https://media.giphy.com/media/AO43S9JqRByQU/giphy.gif' id='first-gif'>");
   
   // Populate buttons
   function populate() {
       $(".buttons").empty();
       for (let i = 0; i < topics.length; i++) {
           var film = topics[i].trim();
           $(".buttons").append("<button class='btn btn-default film-button' data-film='" + film + "'>" + film + "</button>");
       };
   };

   populate();

   // Clicking a button populates the gifs
   $(document).on("click", ".film-button", function() {
       $("#films").empty();
        var filmButton = $(this).attr("data-film");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        filmButton + "+silent&api_key=BIBb7q0yCJlkZ6QPKhgErPghZrMeA3NL&limit=10";
       $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var filmDiv = $("<div class='gifDiv'>");
                    var p = $("<p class='rating'>").text("Rating: " + results[i].rating.toUpperCase());
                    var filmImage = $("<img class='gif' data-state='still'>");
                    var still = results[i].images.original_still.url
                    var animate = results[i].images.original.url
                    filmImage.attr("data-still", still);
                    filmImage.attr("data-animate", animate);
                    filmImage.attr("src", still);
                    filmDiv.append(p);
                    filmDiv.append(filmImage);
                    $("#films").append(filmDiv);
                };
            };
        });
    });

    // Adding a new button
    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        var newFilm = $("#get-film").val().trim();
        if (topics.indexOf(newFilm) < 0 && newFilm !== "") {
            topics.push(newFilm);
            populate();
        };
    });

    // Hitting Enter to add a new button
    $(document).keyup(function(event) {
        if (event.keyCode === 13) { 
            $("#submit-button").click();
        }
    });

    // Animating and pausing the gif
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
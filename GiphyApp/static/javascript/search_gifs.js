//This code is provided by Django. This adds the CSRF Token for security reasons.
function getCookie(name)
{
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?

            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
     beforeSend: function(xhr, settings) {
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});

$(document).ready(function() {
    //This retrieves the GIFs from GiphyAPI and formats them on the page.
    //I would like to improve the formatting, but this will do for now.
    $('#search_button').on('click', function() {
        var search_text = $('#search_text').val();
        // I know I should NOT do this, but I do not know how to put it into an environment variable and get it here.
        var API_key = "g0AcnTZiguOy1gZQnZ7Sws3q2LfJ869b";

        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=" + search_text + "&rating=g&api_key=g0AcnTZiguOy1gZQnZ7Sws3q2LfJ869b",
            type: "GET",
            success: function(response) {
                column_heights = [];
                for (i = 0; i < Math.floor(response.data.length / 5); i++) {
                    column_heights.push(0);
                }

                //Create a gif for each image retrieved.
                $("#gif_container").empty();
                for (i = 0; i < response.data.length; i++) {
                  if (i % 5 == 0) {
                    $('#gif_container').append('<div id="row' + Math.floor(i / 5) + '"class="row"></div>');

                  }

                  $('#row' + Math.floor(i / 5)).append('<div class="col-sm"><a id="a' + i + '"href="' + response.data[i].url +
                  '"><img id="img' + i + '"alt="' + response.data[i].title + '" src="' + response.data[i].images.fixed_width.url +
                  '"></a> <div><input type=text" class="small_text" placeholder="Category" id="category' + i +'"></input><button id="button' + i + '" class="save_buttons">Save</button></div> </div>');

                  //Kind of separate from the logic, but lets avoid another loop...
                  column_heights[i % 5] += parseInt(response.data[i].images.fixed_width.height);
                }

                //Adjust the height of where the GIFs show up on the screen.
                var max = column_heights.reduce(function(a, b) {
                    return Math.max(a, b);
                });
                var height_value = 100 + ((max) / 20);
                $("#gif_container").css("height", height_value + "vh");
            }
        });
    });

    //This is what is called when the save button is clicked. This will tell Django to save the GIF to their profile
    $('body').on('click','button.save_buttons',function(){
        var button_id = this.id
        var category = $("#" + this.id.replace("button", "category")).val();
        var a = $("#" + this.id.replace("button", "a")).attr("href");
        var img = $("#" + this.id.replace("button", "img")).attr("src");
        $.ajax({
            url: "/save_gif/",
            type: "POST",

            data: {"category": category,
                   "gif_url": a,
                   "gif": img},
            success: function(response) {
                $('#' + button_id).replaceWith('<button disabled id="' + button_id + '" class="save_buttons">Saved!</button>')
            }
        });
    });
});
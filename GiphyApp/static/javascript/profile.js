function formatGifs(links, gifs, heights, isSearch) {
    //Create a gif for each image retrieved.
    column_heights = [];
    $("#gif_container").empty();
    for (i = 0; i < links.length; i++) {
      if (i % 5 == 0) {
        $('#gif_container').append('<div id="row' + Math.floor(i / 5) + '"class="row"></div>');
      }

      //isSearch determines whether or not to show controls underneath each image and the height of the images
      if (isSearch) {
          var height = 100
          $('#row' + Math.floor(i / 5)).append('<div class="col-sm"><a id="a' + i + '"href="' + links[i] +
          '"><img id="img' + i + '" src="' + gifs[i] +
          '"></a> <div><input type=text" class="small_text" placeholder="Category" id="category' + i +'"></input><button id="button' + i + '" class="save_buttons">Save</button></div> </div>');
          }
      else {
          var height = 70
          $('#row' + Math.floor(i / 5)).append('<div class="col-sm"><a id="a' + i + '"href="' + links[i] +
          '"><img id="img' + i + '" src="' + gifs[i] + '"></a> </div>');
      }

      //Kind of separate from the logic, but lets avoid another loop...
      column_heights[i % 5] += parseInt(heights[i]);
    }

    //Adjust the height of where the GIFs show up on the screen.
    var max = column_heights.reduce(function(a, b) {
        return Math.max(a, b);
    });
    var height_value = height + ((max) / 20);
    $("#gif_container").css("height", height_value + "vh");
}

$(document).ready(function() {
/* We need to clean up the mess that the Jinja template has trouble solving... */
var links = $('.links').map( function() {
    return $(this).attr('href');
}).get();

var gifs = $('.gifs').map( function() {
    return $(this).attr('src');
}).get();

var heights = $('.gifs').map( function() {
    return $(this).height();
}).get();


formatGifs(links, gifs, heights, false);

$('#search_button').on('click', function() {

    var search_text = $('#search_text').val();

    $.ajax({
        url: "/search_gif_category/",
        type: "GET",
        data: {"category": search_text},
        success: function(response) {
            links = []
            gifs = []
            heights = [200]
            console.log(response)
            for (i = 0; i < response.length; i++) {
                links.push(response[i].gif_path);
                gifs.push(response[i].gif_url);
            }

            formatGifs(links, gifs, heights, false);
        }
    });
});
});
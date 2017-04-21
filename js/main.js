(function() {
    requestPopularMovies();
    requestTopRatedMovies();
    //Handler for clickin on poster
    $(document).on("click", ".movie-poster", function(event) {
        var id = $(this).attr('movie-id');
        $.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: 'http://api.themoviedb.org/3/movie/' + id + '?api_key=bab007b9a6288af1455b8cee1f4f9d36',
            param: {},
            success: function(data) {
                if (data) {
                    $('#movieName').html(data.original_title);
                    $('#poster-modal').attr('src', 'https://image.tmdb.org/t/p/w342/' + data.poster_path);
                    $('#movie-overview').html(data.overview);
                    $.each(data.genres, function(key, value) {
                        $('#movie-gener').html($('#movie-gener').html() + value.name + ',');
                    });
                    $('#movie-original-lang').html(data.original_language);
                    $('#movie-release-date').html(data.release_date);

                    //request trailer
                    $.ajax({
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: 'http://api.themoviedb.org/3/movie/' + id + '/videos?api_key=bab007b9a6288af1455b8cee1f4f9d36',
                        param: {},
                        success: function(data) {
                            if (data) {
                                $('#movie-trailer').attr('src', $('#movie-trailer').attr('src') + data.results[0].key);
                            }
                        },
                        fail: function() {

                        }
                    });
                    //-------
                }
            },
            fail: function() {

            }
        });
    });
    //Click event listener for the navba item
    $('.nav-item').on('click', function() {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });

    $("#tab-popular").on('click', function(){
        $('#posters-conatiner').empty();
        requestPopularMovies();
    });

    $("#tab-top-rated").on('click', function(){
        $('#posters-conatiner').empty();
        requestTopRatedMovies();
    });

    $("#tab-home").on('click', function(){
        $('#posters-conatiner').empty();
        requestPopularMovies();
        requestTopRatedMovies();
    });

})();

function requestPopularMovies(){
    //Fetch all of the movie posters once the page finish loading
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: 'http://api.themoviedb.org/3/movie/popular?api_key=bab007b9a6288af1455b8cee1f4f9d36',
        param: {},
        success: function(data) {
            if (data) {
                var posters_container = $('#posters-conatiner');
                $('#posters-conatiner').append('<div class="d-flex flex-wrap flex-row poster-row">');
                $.each(data.results, function(key, value) {
                    $('.poster-row:last').append('<div class="p-2"><a movie-id="' + value.id + '" hre="#" data-toggle="modal" data-target="#movieDetails" class="movie-poster"><img class="poster" src="https://image.tmdb.org/t/p/w185/' + value.poster_path + '"></a></div>');
                });
                $('#posters-conatiner').append('</div>');
            }
        },
        fail: function() {

        }
    });
}


function requestTopRatedMovies(){
    //Fetch all of the movie posters once the page finish loading
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: 'http://api.themoviedb.org/3/movie/top_rated?api_key=bab007b9a6288af1455b8cee1f4f9d36',
        param: {},
        success: function(data) {
            if (data) {
                var posters_container = $('#posters-conatiner');
                $('#posters-conatiner').append('<div class="d-flex flex-wrap flex-row poster-row">');
                $.each(data.results, function(key, value) {
                    $('.poster-row:last').append('<div class="p-2"><a movie-id="' + value.id + '" hre="#" data-toggle="modal" data-target="#movieDetails" class="movie-poster"><img class="poster" src="https://image.tmdb.org/t/p/w185/' + value.poster_path + '"></a></div>');
                });
                $('#posters-conatiner').append('</div>');
            }
        },
        fail: function() {

        }
    });
}
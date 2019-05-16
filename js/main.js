
$(document).ready(() => {
    $('#search-form').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    var promise1 = axios.get('http://www.omdbapi.com/?apikey=fea6300d&s='+searchText);
    promise1.then(function (response) {
    let movies = response.data.Search;
    let output = "";
    $.each(movies, (_index, movie) => { 
        output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            `;
            });
        $('#movies').html(output);
    });
}
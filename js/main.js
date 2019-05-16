
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

function movieSelected(id) {
    sessionStorage.setItem('movieID',id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieID = sessionStorage.getItem('movieID');
    var promise1 = axios.get('http://www.omdbapi.com/?apikey=fea6300d&i='+movieID);
    promise1.then(function (response) {
    let movie = response.data;
    let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
            </div>
        </div>
     `;
     $('#movie').html(output);
    });
}
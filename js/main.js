
$(document).ready(() => {
    $('#search-form').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    var promise1 = axios.get('http://www.omdbapi.com/?apikey=fea6300d&t=');
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
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre</strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released</strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated</strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating</strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director</strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer</strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors</strong>${movie.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                <p>${movie.Plot}</p>
                <hr/>
                <a href="http://imdb.com/title/${movie.ID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-success">Search Again</a>
            </div>
        </div>
     `;
     $('#movie').html(output);
    });
}

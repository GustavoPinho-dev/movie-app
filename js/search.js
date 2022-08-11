// API Key
const APIKey = '991b866bce0bab02c20676c8e86ec795'

// Base URL
const baseURL = `https://api.themoviedb.org/3/`

const imgPath = "https://image.tmdb.org/t/p/w1280"

const searchAPI = `${baseURL}search/movie?&api_key=${APIKey}&language=pt-BR&query=`
const searchSeriesAPI = `${baseURL}search/tv?&api_key=${APIKey}&language=pt-BR&query=`

const trailerMovieAPI = (id) => `${baseURL}movie/${id}/videos?api_key=${APIKey}&language=pt-BR`
const trailerSerieAPI = (id) => `${baseURL}tv/${id}/videos?api_key=${APIKey}&language=pt-BR`

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

const btnMovies = document.getElementById('option-movies')
const btnSeries = document.getElementById('option-series')

var optionSearch

async function getMovies(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

    showMovies(respData.results)
}

function showMovies(movies) {  
    
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, id, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${imgPath + poster_path}"
                alt="${title}"
            />
            <span class="movie-list-item-title">${title}</span>
            <p class="movie-list-item-desc">
                <span>${overview}</span>
                <button class="movie-list-item-button">TRAILER</button>
            </p>
        `;

        main.appendChild(movieEl);

        movieEl.addEventListener('click', (e) => {
            e.preventDefault()

            getData(id, movie)
        })
    });

}

async function getSeries(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

    showSeries(respData.results)
}

function showSeries(series) {  
    
    // clear main
    main.innerHTML = "";

    series.forEach((serie) => {
        const { poster_path, original_name, id, overview } = serie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${imgPath + poster_path}"
                alt="${original_name}"
            />
            <span class="movie-list-item-title">${original_name}</span>
            <p class="movie-list-item-desc">
                <span>${overview}</span>
                <button class="movie-list-item-button">TRAILER</button>
            </p>
        `;

        main.appendChild(movieEl);

        movieEl.addEventListener('click', (e) => {
            e.preventDefault()

            getData(id, serie)
        })
    });

}

function closeDiv() {
    const details = document.getElementById('details')

    details.style.display = 'none'
}

function optionMovies() {
    optionSearch = 0
    btnMovies.classList.toggle('option-selected')
    btnSeries.classList.toggle('option-selected')

    search.value = ''
    main.innerHTML = "";
}

function optionSeries() {
    optionSearch = 1
    btnMovies.classList.toggle('option-selected')
    btnSeries.classList.toggle('option-selected')

    search.value = ''
    main.innerHTML = "";
}

async function getData(id, data) {

    var respData
    
    if (!optionSearch) {
        const respMovie = await fetch(trailerMovieAPI(id));
        respData = await respMovie.json();
    } else if (optionSearch) {
        const respSerie = await fetch(trailerSerieAPI(id));
        respData = await respSerie.json();
    }

    const details = document.getElementById('details')

    if (respData.results[0]) {

        const key = respData.results[0].key

        details.style.display = 'block'

        details.innerHTML = `
            
            <iframe class="trailer" src="https://www.youtube.com/embed/${key}" frameBorder="0"></iframe>
            <div class="description">
                ${data.overview}
                <button id="close" onclick="closeDiv()" class="btnClose">
                    Close
                </button>
            </div>  
        `
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm) {
        if (optionSearch) {
            getSeries(searchSeriesAPI + searchTerm)
        } else if (!optionSearch) {
            getMovies(searchAPI + searchTerm)
        }

        search.value = ''
    }
})
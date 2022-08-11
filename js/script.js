// API Key
const APIKey = '991b866bce0bab02c20676c8e86ec795'

// Base URL
const baseURL = `https://api.themoviedb.org/3/`

// URL to get the most popular movies
const APIUrl = `${baseURL}discover/movie?sort_by=popularity.desc&api_key=${APIKey}&page=1&language=pt-BR`

const imgPath = "https://image.tmdb.org/t/p/w1280"
const searchAPI = `${baseURL}search/movie?&api_key=${APIKey}&language=pt-BR&query=`

const trailerAPI = (id) => `${baseURL}movie/${id}/videos?api_key=${APIKey}&language=pt-BR`

const topRatedAPI = `${baseURL}movie/top_rated?api_key=${APIKey}&language=pt-BR&page=1`

const imagesAPI = (id) => `${baseURL}movie/${id}/images?api_key=${APIKey}`

const upComingAPI = `${baseURL}movie/upcoming?api_key=${APIKey}&language=pt-BR&page=1`

const list = document.getElementById('movie-list')
const listRated = document.getElementById('movie-list-top-rated')
const listUpcoming = document.getElementById('upcoming-list')

const form = document.getElementById('form')

getMovies(APIUrl)
getFeaturedMovie(APIUrl)
getUpComing(upComingAPI)
getTopRated()

async function getFeaturedMovie(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

    const featuredMovie = respData.results[0]
    
    showFeaturedMovie(featuredMovie)
    
}

async function showFeaturedMovie(featuredMovie) {
    const featuredContainer = document.getElementById('featured')

    const { poster_path, overview, id} = featuredMovie
    
    const respLogo = await fetch(imagesAPI(id));
    const respDataLogo = await respLogo.json();

    const logos = respDataLogo.logos
    var logoURL

    logos.forEach(logo => {
        const { iso_639_1, file_path } = logo

        if(iso_639_1 === 'en') {
            logoURL = file_path
        }
    })

    featuredContainer.innerHTML = `
        <div 
            id="featured-content" 
            class="featured-content" 
            style="background: linear-gradient(to bottom, rgba(0,0,0,0), #151515), url('${imgPath + poster_path}');
            background-size: cover;"
        >
            <img class="featured-title" src="${imgPath + logoURL}" alt="">
            <p class="featured-desc">${overview}</p>
            <button class="featured-button">TRAILER</button>
        </div>
    `
}

async function getMovies(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

    showMovies(respData.results)
}

async function showMovies(movies) {  
    
    movies.forEach(movie => {
        const { poster_path, original_title, overview, id} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')

        movieEl.innerHTML = `
            <img class="movie-list-item-img" src="${imgPath + poster_path}" alt="${original_title}">   
            <span class="movie-list-item-title">${original_title}</span>    
            <p class="movie-list-item-desc">
                <span>${overview}</span>
                <button class="movie-list-item-button">TRAILER</button>
            </p>
        `

        list.appendChild(movieEl)
        
        movieEl.addEventListener('click', (e) => {
            e.preventDefault()

            getData(id, movie)
        })
    })

}

async function getUpComing(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

    showUpComingMovies(respData.results)
}

async function showUpComingMovies(movies) {
    movies.forEach(movie => {
        const { poster_path, original_title, overview, id} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')

        movieEl.innerHTML = `
            <img class="movie-list-item-img" src="${imgPath + poster_path}" alt="${original_title}">   
            <span class="movie-list-item-title">${original_title}</span>    
            <p class="movie-list-item-desc">
                <span>${overview}</span>
                <button class="movie-list-item-button">TRAILER</button>
            </p>
        `

        listUpcoming.appendChild(movieEl)
        
        movieEl.addEventListener('click', (e) => {
            e.preventDefault()

            getData(id, movie)
        })
    })
}

async function getTopRated() {
    const respRated = await fetch(topRatedAPI)
    const respDataTopRated = await respRated.json()

    showTopRatedMovies(respDataTopRated.results)
}

async function showTopRatedMovies(movies) {
    movies.forEach(movie => {

        const { poster_path, original_title, overview, id} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')

        movieEl.innerHTML = `
            <img class="movie-list-item-img" src="${imgPath + poster_path}" alt="${original_title}">   
            <span class="movie-list-item-title">${original_title}</span>    
            <p class="movie-list-item-desc">
                <span>${overview}<span>
                <button class="movie-list-item-button">TRAILER</button>
            </p>
        `

        listRated.appendChild(movieEl)
        
        movieEl.addEventListener('click', (e) => {
            e.preventDefault()

            getData(id, movie)
        })
    })
}

function closeDiv() {
    const details = document.getElementById('details')

    details.style.display = 'none'
}

async function getData(id, data) {

    const resp = await fetch(trailerAPI(id));
    const respData = await resp.json();

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


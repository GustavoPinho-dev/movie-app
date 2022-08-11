// API Key
const APIKey = '991b866bce0bab02c20676c8e86ec795'

// Base URL
const baseURL = `https://api.themoviedb.org/3/`

const imgPath = "https://image.tmdb.org/t/p/w1280"

const imagesAPI = (id) => `${baseURL}tv/${id}/images?api_key=${APIKey}`

const trailerAPI = (id) => `${baseURL}tv/${id}/videos?api_key=${APIKey}&language=pt-BR`

const topRatedAPI = `${baseURL}tv/top_rated?api_key=${APIKey}&language=pt-BR&page=1`

const seriesAPI = `${baseURL}tv/popular?api_key=${APIKey}&language=pt-BR&page=1`

const featuredContainer = document.getElementById('featured')

const listSeries = document.getElementById('serie-list')
const listRated = document.getElementById('serie-list-top-rated')
const listUpcoming = document.getElementById('upcoming-list')

getFeaturedSerie(seriesAPI)
getSeries(seriesAPI)
getTopRated(topRatedAPI)

async function getFeaturedSerie(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

    const featuredSerie = respData.results[0]
    
    showFeaturedSerie(featuredSerie)
    
}

async function showFeaturedSerie(featuredSerie) {
    
    const { poster_path, title, vote_average, overview, id} = featuredSerie
    
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

async function getSeries(url) {
    const respSeries = await fetch(url)
    const respDataSeries = await respSeries.json()

    showSeries(respDataSeries.results)
}

async function showSeries(series) {
    series.forEach(serie => {
        const { poster_path, name, overview, id} = serie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')

        movieEl.innerHTML = `
            <img class="movie-list-item-img" src="${imgPath + poster_path}" alt="${name}">   
            <span class="movie-list-item-title">${name}</span>    
            <p class="movie-list-item-desc">
                <span>${overview}</span>
                <button class="movie-list-item-button">TRAILER</button>
            </p>
        `

        listSeries.appendChild(movieEl)
        
        movieEl.addEventListener('click', (e) => {
            e.preventDefault()

            getData(id, serie)
        })
    })
}

async function getTopRated(url) {
    const respRated = await fetch(url)
    const respDataTopRated = await respRated.json()

    console.log(respDataTopRated);

    showTopRatedSeries(respDataTopRated.results)
}

async function showTopRatedSeries(series) {
    series.forEach(serie => {

        const { poster_path, original_name, overview, id} = serie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie-list-item')

        movieEl.innerHTML = `
            <img class="movie-list-item-img" src="${imgPath + poster_path}" alt="${original_name}">   
            <span class="movie-list-item-title">${original_name}</span>    
            <p class="movie-list-item-desc">
                <span>${overview}<span>
                <button class="movie-list-item-button">TRAILER</button>
            </p>
        `

        listRated.appendChild(movieEl)
        
        movieEl.addEventListener('click', (e) => {
            e.preventDefault()

            getData(id, serie)
        })
    })
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

function closeDiv() {
    const details = document.getElementById('details')

    details.style.display = 'none'
}
const arrows = document.querySelectorAll('.arrow')
const movieLists = document.querySelectorAll('.movie-list')

arrows.forEach((arrow, i) => {
    const itemNumber = 20
    let clickCounter = 0
    arrow.addEventListener('click', () => {
        const ratio = Math.floor(window.innerWidth / 300)
        clickCounter++
        if(itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
            movieLists[i].style.transform = `translateX(${
                movieLists[i].computedStyleMap().get("transform")[0].x.value - 350
            }px)`;
        } else {
            movieLists[i].style.transform = 'translateX(0)'
            clickCounter = 0
        }
    })
})

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,#option-movies,#option-series,.search,.option-search"
);

ball.addEventListener('click', () => {
    items.forEach(item => {
        item.classList.toggle('active')
    })
    ball.classList.toggle('active')
})

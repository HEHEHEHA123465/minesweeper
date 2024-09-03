document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
//creating the variables
    let width = 10
    let bombamount = 20
    let squares = [ ]
    let isgameover = false
//main function
    function createboard() {
        const bombsarray = Array(bombamount).fill('bomb')
        const emptyarray = Array(width * width - bombamount).fill('valid')
        const gamearray = emptyarray.concat(bombsarray)
        const shuffledarray = gamearray.sort(() => Math.random() - 0.5)
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledarray[i])
            grid.appendChild(square)

            squares.push(square)
            square.addEventListener('click', function() {
                click(square)
            })
        }
//checking the adjacent squares
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isleftedge = (i % width === 0)
            const isrightdge = (i % width === width - 1)

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isleftedge && squares[i - 1].classList.contains('bomb')) total++
                if (i > 9 && !isrightdge && squares[i +1 - width].classList.contains('bomb')) total++
                if (i > 10 && squares[i - width].classList.contains('bomb')) total++ 
                if (i > 11 && !isleftedge && squares[i - 1 - width].classList.contains('bomb')) total++
                if (i < 98 && !isrightdge && squares[i + 1].classList.contains('bomb')) total++
                if (i < 90 && !isleftedge && squares[i - 1 + width].classList.contains('bomb')) total++
                if (i < 88 && !isrightdge && squares[i + 1 + width].classList.contains('bomb')) total++
                if (i < 89 && squares[i + width].classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)
                console.log(squares[i])
            }
        }
    }
    createboard();

// checking the action on click
function click(square) {
    let currentid = square.id
    if (isgameover) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return 
    if (square.classList.contains('bomb')) {
        gameover();
    } else {
        let total = square.getAttribute('data')
        if (total != 0){
            square.classList.add('checked')
        square.innerHTML = total
        return
        } 
        checksquare(square, currentid)
    }
    square.classList.add('checked')
}

function checksquare(square, currentid) {
    const isleftedge = (currentid % width === 0)
    const isrightdge = (currentid % width === width - 1)


    setTimeout(() => {
if (currentid > 0 && !isleftedge) {
    const newid = squares[parseInt(currentid) - 1].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
if (currentid > 9 && !isrightdge) {
    const newid = squares[parseInt(currentid) + 1 - width].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
if (currentid > 10) {
    const newid = squares[parseInt(currentid) - width].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
if (currentid > 11 && !isleftedge) {
    const newid = squares[parseInt(currentid) - 1 - width].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
if (currentid < 98 && !isrightdge) {
    const newid = squares[parseInt(currentid) + 1].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
if (currentid < 90 && !isleftedge) {
    const newid = squares[parseInt(currentid) - 1 + width].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
if (currentid < 88 && !isrightdge) {
    const newid = squares[parseInt(currentid) + 1 + width].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
if (currentid < 89) {
    const newid = squares[parseInt(currentid) + width].id
    const newsquare = document.getElementById(newid)
    click(newsquare)
}
        
    }, 10);
}


function gameover(square) {
    alert('game over!')
    isgameover = true

    squares.forEach(square => {
        if (square.classList.contains('bomb')) {
            square.innerHTML = '💣'
        }
    })
}








})
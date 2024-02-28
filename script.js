let cells = document.querySelectorAll('.cells');
let restart = document.querySelector('.res-game');
let comp_play = document.querySelector('.comp-play');
let statustxt = document.querySelector('.status')
let Player = 'X';
gamerun = false;
let winningPatters = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]
computerplayer=false;
let gameboard = ['', '', '', '', '', '', '', '', '']
window.onload = function () {
    startGame()
}

function startGame() {
    cells.forEach(cell => cell.addEventListener('click', clickCell))
    restart.addEventListener('click', resGame)
    comp_play.addEventListener('click', modeChange)
    statustxt.innerHTML = `${Player}'s turn`
    gamerun=true;
}

function clickCell() {
    this.classList.add('active')//which cell is clicked
    let cellIndex = this.getAttribute('cellIndex');//get its cellIndex value
    console.log(cellIndex)
   
    if (gameboard[cellIndex]!= '' || gamerun==false) {
        return;
    }
    if(gamerun && computerplayer==true){
        // console.log('computers move')
        compMove()
    }
    updateBoard(this, cellIndex)
    checkwinner();
}

function updateBoard(cellboard, index) {
    // console.log(Player)
    gameboard[index] = Player
    console.log(gameboard)
    cellboard.innerHTML = Player
}

function checkwinner() {
    let roundWon = false
    for (let i = 0; i < winningPatters.length; i++) {
        let condition = winningPatters[i]//condition = [1,4,7]

        let cellA = gameboard[condition[0]] // cella = gameboard[1]
        let cellB = gameboard[condition[1]]//cellb = gameboard[4]
        let cellC = gameboard[condition[2]]//cell c = gameboard[7]

        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            cells[condition[0]].classList.add('wins')
            cells[condition[1]].classList.add('wins')
            cells[condition[2]].classList.add('wins')

            roundWon = true
            break;
        }
    }
    if (roundWon) {
        
        statustxt.innerHTML = `Congratulation ${Player}'s won the Game!!!!!!`
        gamerun=false;
    }
    else if (!gameboard.includes('')) {
        statustxt.innerHTML = `It's a DRAW!!!`
    }
    else {
        ChangePlayer()
    }

}

function ChangePlayer() {
    Player = Player=='X'?'O':'X'
    statustxt.innerHTML= `${Player}'s turn`    
}

function resGame() {
    Player='X';
    gameboard = ['', '', '', '', '', '', '', '', '']
    statustxt.innerHTML= `${Player}'s turn`
    gamerun=true
    computerplayer=false
    cells.forEach(cell=>cell.innerHTML='')
    cells.forEach(cell=>cell.classList.remove('active'))
    cells.forEach(cell=>cell.classList.remove('wins'))
}

function modeChange() {
    resGame()
    computerplayer=true
    compMove()
}

function compMove(){

    if(computerplayer && gamerun==true){
        let index
        
        do{
            index = Math.floor(Math.random()*9)
        }while(gameboard[index]!=='')
       
        if(gameboard[index]==''){
            console.log(index)
            setTimeout(()=>{
                cells[index].innerHTML=Player
                gameboard[index]=Player
                console.log(gameboard)
                cells[index].classList.add('active');
                
                checkwinner()
                
            },1000)
        }
        
    }
    
}


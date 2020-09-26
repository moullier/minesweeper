document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector(".grid");
    let width = 10;
    let bombAmount = 20;
    let squares = [];

    // create game board
    function createBoard() {

        // generate array with random bomb locations
        const bombsArray = Array(bombAmount).fill("bomb");
        const emptyArray = Array(width*width - bombAmount).fill("empty");
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for(let i = 0; i < width*width; i++) {
            const square = document.createElement("div");
            square.setAttribute("id", i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);
        }

        // add numbers to board
        for(let i = 0; i < squares.length; i++) {
            const isLeftEdge = i % width === 0;
            const isRightEdge = i % width === width - 1;

        }
    }

    createBoard();

})
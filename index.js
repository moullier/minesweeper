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

            // listener for click
            square.addEventListener("click", function(e) {
                click(square);
            })
        }

        // add numbers to board
        for(let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = i % width === 0;
            const isRightEdge = i % width === width - 1;
            console.log(i);

            if(squares[i].classList.contains("empty")) {
                // check square to left for bomb
                if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) {
                    total++;
                }

                // check square to upper right for bomb
                if(i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains("bomb")) {
                    total++;
                }

                // check square above for bomb
                if(i > 9 && squares[i - width].classList.contains("bomb")) {
                    total++;
                }
                
                // check square to upper left for bomb
                if(i > 10 && !isLeftEdge && squares[i - 1 - width].classList.contains("bomb")) {
                    total++;
                }

                // check square to right for bomb
                if(i < 99 && !isRightEdge && squares[i + 1].classList.contains("bomb")) {
                    total++;
                }

                // check square to lower left for bomb
                if(i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains("bomb")) {
                    total++;
                }

                // check square to lower right for bomb
                if(i < 90 && !isRightEdge && squares[i + 1 + width].classList.contains("bomb")) {
                    total++;
                }

                // check square below for bomb
                if(i < 90 && squares[i + width].classList.contains("bomb")) {
                    total++;
                }

                squares[i].setAttribute("data", total);
                squares[i].innerHTML = total;

                console.log(squares[i]);
            }
        }
    }

    createBoard();


    // click on square actions
    function click(square) {
        if(square.classList.contains("bomb")) {
            alert("game over");
        } else {
            let total = square.getAttribute("data");
            if (total != 0) {
                square.classList.add("checked");
                square.innerHTML = total;
                return;
            }
        }
    }




})
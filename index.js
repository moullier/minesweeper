document.addEventListener('DOMContentLoaded', () => {

    try {
    
        MicroModal.init({
          awaitCloseAnimation: true,// set to false, to remove close animation
          onShow: function(modal) {
            console.log("micromodal open");
          },
          onClose: function(modal) {
            console.log("micromodal close");
          }
        });
        
      } catch (e) {
        console.log("micromodal error: ", e);
    }

    const grid = document.querySelector("#gameBoard");
    let width = 10;
    let bombAmount = 10;
    let flags = 0;
    let squares = [];
    let isGameOver = false;
    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", function(e) {
        startNewGame();
    })

    function startNewGame() {
        console.log("new game started");
        flags = 0;
        squares = [];
        isGameOver = false;
        grid.innerHTML = "";
        createBoard();
    }

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

            // right click action
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square);
            }
        }

        // add numbers to board
        for(let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = i % width === 0;
            const isRightEdge = i % width === width - 1;
            //console.log(i);

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
                // squares[i].innerHTML = total;

                //console.log(squares[i]);
            }
        }
    }

    createBoard();


    function addFlag(square) {

        if(isGameOver) {
            return;
        }
        if(!square.classList.contains("checked") && flags < bombAmount) {
            //toggle if square has flag
            if(!square.classList.contains("flag")) {
                square.classList.add("flag");
                square.innerHTML = "🚩";
                flags++;
                checkForWin();
            } else {
                square.classList.remove("flag");
                square.innerHTML = "";
                flags--;
            }
        } else if(!square.classList.contains("checked") && flags === bombAmount) {
            if(square.classList.contains("flag")) {
                square.classList.remove("flag");
                square.innerHTML = "";
                flags--;
            }

        }

    }


    // click on square actions
    function click(square) {
        let currentId = square.id;
        console.log("clicking on square " + currentId);

        if(isGameOver) {
            return;
        }

        if(square.classList.contains("checked") || square.classList.contains("flag")) {
            return;
        }

        if(square.classList.contains("bomb")) {
            gameOver(square);
        } else {
            let total = square.getAttribute("data");
            if (total != 0) {
                square.classList.add("checked");
                square.innerHTML = total;
                return;
            }

            checkSquare(square, currentId);

        }

        square.classList.add("checked");
    }

    //check neighboring squares once square is clicked
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {

            // check squares recursively to the left direction
            if(currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }

            // check squares recursively to the upper left direction
            if(currentId > (width - 1) && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }

            // check squares recursively to the top
            if(currentId > (width - 1)) {
                const newId = squares[parseInt(currentId) - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }

            // check squares recursively to the upper right
            if(currentId > (width - 1) && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }

            // check squares recursively to the right
            if(currentId < 99 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 ].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            
            // check squares recursively to the lower right
            if(currentId < 90 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }

            
            // check squares recursively to the bottom
            if(currentId < 90) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }

            // check squares recursively to the lower left
            if(currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }





        }, 10);
    }

    function gameOver(square) {
        isGameOver = true;

        const gameStatus = document.getElementById("gameStatus");
        gameStatus.innerHTML = "Game Over";
        gameStatus.style.display= "block";
        const startButton = document.getElementById("startBtn");
        startButton.style.display= "inline-block";

        // show all the bombs
        squares.forEach(square => {
            if(square.classList.contains("bomb")) {
                square.innerHTML = "💣";
            }
        })
    }

    function checkForWin() {
        let matches = 0;

        for(let i = 0; i < squares.length; i++) {
            if(squares[i].classList.contains("flag") && squares[i].classList.contains("bomb")) {
                matches++;
            }
        }

        if(matches === bombAmount) {
            console.log("YOU WIN");
            isGameOver = true;

            const gameStatus = document.getElementById("gameStatus");
            gameStatus.innerHTML = "You Win!!";
            gameStatus.style.display= "block";
            const startButton = document.getElementById("startBtn");
            startButton.style.display= "inline-block";

        }
    }

})
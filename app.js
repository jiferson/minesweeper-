//js code will run after all the HTML content will be loaded to the page:

//can pass the script tag at the bottom of the index.html = same way
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let flags = 0;
  let width = 10;
  let bombAmount = 20;
  let isGameOver = false;
  let squares = [];
  //createBoard function
  const createBoard = () => {
    const bombsArray = Array(bombAmount).fill("bomb");
    const emptySqauresArray = Array(width * width - bombAmount).fill("valid");

    const gameArray = emptySqauresArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);
      square.addEventListener("click", (e) => {
        onClick(square);
      });
      square.oncontextmenu = (e) => {
        e.preventDefault();
        addFlag(square);
      };
    }

    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;
      if (squares[i].classList.contains("valid")) {
        //left cell cehck
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;
        //north east
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;
        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;

        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
          total++;
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        )
          total++;
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        )
          total++;
        if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
        squares[i].setAttribute("data", total);
      }
    }
  };

  createBoard();

  const addFlag = (sqaure) => {
    if (isGameOver) return;
    if (!sqaure.classList.contains("checked") && flags < bombAmount) {
      if (!sqaure.classList.contains("flag")) {
        sqaure.classList.add("flag");
        sqaure.innerHTML = "&#9872";
        flags++;
        checkForWin();
      } else {
        sqaure.classList.remove("flag");
        sqaure.innerHTML = "";
        flags--;
      }
    }
  };

  // ...click on sqaure function

  const onClick = (square) => {
    let currentId = square.id;
    if (isGameOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;

    if (square.classList.contains("bomb")) {
      return gameOver(square);
    } else {
      let total = parseInt(square.getAttribute("data"));
      if (total !== 0) {
        square.classList.add("checked");
        square.innerText = total;
        return;
      }
      checkSquare(square, currentId);
    }
    square.classList.add("checked");
  };

  const checkSquare = (square, id) => {
    const isLeftEdge = id % width === 0;
    const isRightEdge = id % width === width - 1;
    setTimeout(() => {
      if (id > 0 && !isLeftEdge) {
        const newId = squares[parseInt(id) - 1].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
      if (id > 9 && !isRightEdge) {
        const newId = squares[parseInt(id) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
      if (id > 10) {
        const newId = squares[parseInt(id) - width].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
      if (id > 11 && !isLeftEdge) {
        const newId = squares[parseInt(id) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
      if (id < 98 && !isRightEdge) {
        const newId = squares[parseInt(id) + 1].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
      if (id < 90 && !isLeftEdge) {
        const newId = squares[parseInt(id) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
      if (id < 88 && !isRightEdge) {
        const newId = squares[parseInt(id) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
      if (id < 89) {
        const newId = squares[parseInt(id) + width].id;
        const newSquare = document.getElementById(newId);
        onClick(newSquare);
      }
    }, 10);
  };

  const gameOver = (square) => {
    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "&#128163";
      }
    });
    return (isGameOver = true);
  };

  const checkForWin = () => {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      )
        matches++;
      if (matches === bombAmount) {
        alert("you won !!!");
        isGameOver = true;
      }
    }
  };
});

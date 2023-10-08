let boxes = document.querySelectorAll(".box");
let cross = true;
let reset = document.querySelector(".button-style");
let modal = document.querySelector(".modal");
let modal_body = document.querySelector(".modal-body");
let total_turns = 0;

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (!box.textContent) {
      box.textContent = cross ? "❌" : "🅾️";
      total_turns++;
      cross ^= 1;
    }
    if (total_turns >= 5) {
      const winner = checkForWin();
      if (winner) {
        modal.style.display = "flex";
        modal_body.innerHTML = `
  <div class="modal-content">
    <h2 class="modal-title">${winner} Wins!</h2>
    <div class="modal-message">
      <p>Congratulations to ${winner} for winning the game.</p>
      <p>Would you like to start a new game?</p>
    </div>
    <button class="new-game-button">New Game</button>
  </div>
`;

        const newGameButton = document.querySelector(".new-game-button");
        newGameButton.addEventListener("click", () => {
          resetGame();
          modal.style.display = "none"; // Hide the modal
        });
      }
    }
    if (total_turns === 9) {
      modal.style.display = "flex";
      modal_body.innerHTML = `
  <div class="modal-content">
    <h2 class="modal-title">OOPS! It's a tie</h2>
    <div class="modal-message">
      <p>Would you like to start a new game?</p>
    </div>
    <button class="new-game-button">New Game</button>
  </div>
`;

      const newGameButton = document.querySelector(".new-game-button");
      newGameButton.addEventListener("click", () => {
        resetGame();
        modal.style.display = "none"; // Hide the modal
      });
    }
  });
});
reset.addEventListener("click", (e) => {
  resetGame();
});
function checkForWin() {
  const boxes = document.querySelectorAll(".box");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const boxA = boxes[a].textContent;
    const boxB = boxes[b].textContent;
    const boxC = boxes[c].textContent;

    if (boxA && boxA === boxB && boxA === boxC) {
      return boxA;
    }
  }

  return null;
}

function resetGame() {
  boxes.forEach((box) => {
    box.textContent = "";
    total_turns = 0;
  });
  cross = true;
}

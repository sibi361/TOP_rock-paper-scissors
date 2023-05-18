function getComputerChoice() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    return `It's a Tie 🎀!, ${playerSelection} & ${computerSelection}`;
  } else if (playerSelection == "rock" && computerSelection == "paper") {
    return "You Lose ❌, paper beats rock";
  } else if (playerSelection == "rock" && computerSelection == "scissors") {
    return "You Win ✅, rock beats scissors";
  } else if (playerSelection == "paper" && computerSelection == "rock") {
    return "You Win ✅, paper beats rock";
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    return "You Lose ❌, scissors beats paper";
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    return "You Lose ❌, rock beats scissors";
  } else if (playerSelection == "scissors" && computerSelection == "paper") {
    return "You Win ✅, scissors beats paper";
  } else {
    return `Invalid player choice, computer chose ${computerSelection}`;
  }
}

function increasePoints(n) {
  // Removes ⭐ from player who lost the round
  pointsHeaders[Math.abs(n - 1)].textContent = pointsHeaders[
    Math.abs(n - 1)
  ].textContent.replace("⭐", "");

  // Adds ⭐ and awards one point to player who won the round
  let pointsDiv = pointsHeaders[n];
  let points = Number(pointsDiv.textContent.replace("⭐", ""));
  points += 1;
  pointsDiv.innerHTML = `&nbsp;⭐&nbsp;${points}`;
  return points;
}

function resetGame() {
  [0, 1].forEach((n) => (pointsHeaders[n].innerHTML = "&nbsp;0"));
  messageElement.textContent = messageElement.dataset.original;
  messageElement.setAttribute("style", "background-color:none;");
  gameResetButton.setAttribute("hidden", "hidden");
}

const userInputs = Array.from(document.querySelectorAll("input")).slice(0, 3);
const compInputs = Array.from(document.querySelectorAll("input")).slice(3, 6);
const messageElement = document.querySelector("#message");
const pointsHeaders = document.querySelectorAll(".side-heading-right");
const gameOverInput = document.querySelector("#gameOverInput");
const gameResetButton = document.querySelector("#gameReset");

gameResetButton.addEventListener("click", () => {
  resetGame();
});

userInputs.forEach((ele) =>
  ele.addEventListener("click", (ele) => {
    if (gameOverInput.value == 1) {
      gameOverInput.value = 0;
      resetGame();
    }

    let playerSelection = ele.target.value;
    let computerSelection = getComputerChoice();

    let winner = playRound(playerSelection, computerSelection);
    messageElement.textContent = winner;

    let pointsRecent = 0;
    let pointsRecent2 = 0;
    let mostRecentWin = 0;

    if (winner.includes("Win")) {
      pointsRecent = increasePoints(0);
      mostRecentWin = 0;
    } else if (winner.includes("Lose")) {
      pointsRecent = increasePoints(1);
      mostRecentWin = 1;
    } else {
      // No points for tie!
      // pointsRecent = increasePoints(0);
      // pointsRecent2 = increasePoints(1);
      // let pointsDiv = pointsHeaders[mostRecentWin];
      // pointsDiv.innerHTML = `&nbsp;⭐&nbsp;${Number(
      //   pointsDiv.textContent.replace("⭐", "")
      // )}`;

      [0, 1].forEach((n) => {
        let pointsDiv = pointsHeaders[n];
        pointsDiv.innerHTML = `&nbsp;&nbsp;${Number(
          pointsDiv.textContent.replace("⭐", "")
        )}`;
      });
    }

    if (pointsRecent == 5 || pointsRecent2 == 5) {
      if (mostRecentWin == 0 && pointsRecent > pointsRecent2)
        messageElement.innerHTML = "Game Over! <b>YOU</b> WON 🎁💐👏";
      else messageElement.innerHTML = "Game Over! Better luck next time 😊";
      if (pointsRecent == pointsRecent2)
        messageElement.innerHTML = "Game Over! It's a <b>TIE</b> 💐🎁🌴";

      gameOverInput.value = 1;
      gameResetButton.removeAttribute("hidden");
      messageElement.setAttribute("style", "background-color:aqua;");
    }

    userInputs.forEach((ele) => {
      if (ele.value == playerSelection)
        ele.labels[0].setAttribute("style", "font-weight:bold;");
      else ele.labels[0].setAttribute("style", "font-weight:none;");
    });

    compInputs.forEach((ele) => {
      if (ele.value == computerSelection) {
        ele.labels[0].setAttribute("style", "font-weight:bold;");
        ele.removeAttribute("disabled");
        ele.click();
        ele.setAttribute("disabled", "disabled");
      } else {
        ele.labels[0].setAttribute("style", "font-weight:none;");
      }
    });
  })
);

// keyboard shortcuts (R = Rock, P = Paper, S = Scissors)
document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (key == "r" || key == "R") {
    userInputs[0].click();
  } else if (key == "p" || key == "P") {
    userInputs[1].click();
  } else if (key == "s" || key == "S") {
    userInputs[2].click();
  }
});

function getComputerChoice() {
  switch (Math.floor(Math.random(23499) * 3)) {
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
    return "You Lose ❌😞🌴, paper beats rock";
  } else if (playerSelection == "rock" && computerSelection == "scissors") {
    return "You Win ✅💐🎁!, rock beats scissors";
  } else if (playerSelection == "paper" && computerSelection == "rock") {
    return "You Win ✅💐🎁!, paper beats rock";
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    return "You Lose ❌😞🌴, scissors beats paper";
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    return "You Lose ❌😞🌴, rock beats scissors";
  } else if (playerSelection == "scissors" && computerSelection == "paper") {
    return "You Win ✅💐🎁!, scissors beats paper";
  } else {
    return `Invalid player choice, computer chose ${computerSelection}`;
  }
}

// single run
// const playerSelection = "rock";
// const computerSelection = getComputerChoice();
// console.log(playRound(playerSelection, computerSelection));

// multi-round game mode
// const NUMBER_OF_ROUNDS = 5;
// function game() {
//   for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
//     try {
//       let playerSelection = prompt("Rock, Paper or Scissors?").toLowerCase();
//     } catch (TypeError) {
//       console.log("Exiting, thankyou for playing!");
//       break;
//     }
//     let computerSelection = getComputerChoice();
//     console.log(playRound(playerSelection, computerSelection));
//   }
// }
// game();

// For UI
const userInputs = Array.from(document.querySelectorAll("input")).slice(0, 3);
const compInputs = Array.from(document.querySelectorAll("input")).slice(3);
const messageElement = document.querySelector("#message");

userInputs.forEach((ele) =>
  ele.addEventListener("click", (ele) => {
    let playerSelection = ele.target.value;
    let computerSelection = getComputerChoice();
    messageElement.textContent = playRound(playerSelection, computerSelection);
    compInputs.forEach((ele) => {
      if (ele.value == computerSelection) {
        ele.removeAttribute("disabled");
        ele.click();
        ele.setAttribute("disabled", "disabled");
      }
    });
  })
);

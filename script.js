let playerScore = 0;
let computerScore = 0;

let resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', reset);


function getComputerChoice()
{
    let randomInt = Math.floor(Math.random() * 3);
    switch(randomInt) 
    {
        case 0:
            return "rock";
        case 1: 
            return "paper";
        case 2:
            return "scissors";
    }
}

function playRound(playerChoice, computerChoice)
{
    let result = "";
    playerChoice = playerChoice.toLowerCase();

    if(computerChoice === "rock")
    {
        switch(playerChoice)
        {
            case "rock":
                result = "tie";
                break;
            case "paper":
                result = "win";
                break;
            case "scissors":
                result =  "lose";
        }
    }
    if(computerChoice === "paper")
    {
        switch(playerChoice)
        {
            case "rock":
                result = "lose";
                break;
            case "paper":
                result = "tie";
                break;
            case "scissors":
                result = "win";
        }
    }
    if(computerChoice === "scissors")
    {
        switch(playerChoice)
        {
            case "rock":
                result = "win";
                break;
            case "paper":
                result = "lose";
                break;
            case "scissors":
                result = "tie";
        }
    }

    displayResult(playerChoice, computerChoice, result);
    updateScore(result);
    return result;
}

function displayResult(playerChoice, computerChoice, result)
{
    let playerChoiceDisplay = document.querySelector(".your-choice");
    let cmpChoiceDisplay = document.querySelector(".cmp-choice");
    playerChoiceDisplay.textContent = `Your Choice: ${playerChoice}`;
    cmpChoiceDisplay.textContent = `Computer Choice: ${computerChoice}`;
    let resultDisplay = document.querySelector(".result");

    console.log(result);
    if(result === "win")
    {
        resultDisplay.textContent = "W";
        resultDisplay.style.color = "green";
    }
    else if(result === "lose")
    {
        resultDisplay.textContent = "L";
        resultDisplay.style.color = "red";
    }
    else if(result === "tie")
    {
        resultDisplay.textContent = "T";
        resultDisplay.style.color = "black";
    }
    else 
    {
        resultDisplay.textContent = "";
        resultDisplay.style.color = "black";
    }

}

function startGame()
{
    let nodeList = document.querySelectorAll("button");

    nodeList.forEach(
        function(node){
            node.addEventListener('click', choose);
        }
    ) 
}

function choose()
{
    let result = playRound(this.className, getComputerChoice());
}

function updateScore(result)
{
    if(result === "win")
    {
        playerScore++;
    }
    if(result === "lose")
    {
        computerScore++;
    }
    if(result === "tie")
    {
        return;
    }

    let round = computerScore + playerScore;
    updateScoreboard();

    if(round === 5 && playerScore > computerScore)
    {
        finishGame("win");
    }
    if(round === 5 && playerScore < computerScore) 
    {
        finishGame("lose");
    }
}

function endGame()
{
    let nodeList = document.querySelectorAll("button");

    nodeList.forEach(
        function(node){
            node.removeEventListener('click', choose);
        }
    )
}

function reset()
{
    endGame();
    playerScore = 0;
    computerScore = 0;
    startGame();
    updateScoreboard();
    displayResult("","","");
    let popup = document.querySelector(".popup");
    if(popup !== undefined)
    {
        popup.remove();
    }
}

function updateScoreboard()
{         
    let playerScoreDisplay = document.querySelector(".your-score");
    playerScoreDisplay.textContent = playerScore;
    let computerScoreDisplay = document.querySelector(".cmp-score");
    computerScoreDisplay.textContent = computerScore;
}

function finishGame(result)
{
    let popup = document.createElement("div");
    popup.style.fontSize = "40px";
    popup.style.display = "flex";
    popup.className = "popup";
    popup.style.width = "80vw";
    popup.style.height = "10vh";
    popup.style.justifyContent = "center";
    popup.style.border = "black solid 2px";
    popup.style.color = "white";
    popup.style.marginLeft = "10vw";
    popup.style.borderRadius = "5px"
    
    if(result === "win")
    {
        popup.textContent = "CONGRATS!! You won! Click reset to play again";
        popup.style.backgroundColor = "green";
    }

    if(result === "lose")
    {
        popup.textContent = "You lost. Click reset to try again.";
        popup.style.backgroundColor = "red";
    }
    
    let body = document.querySelector("body");
    body.appendChild(popup);
    
    endGame();
}

startGame();

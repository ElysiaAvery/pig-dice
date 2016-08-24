//<!-- Back End -->
function Player (){
  this.turnScore = 0;
  this.overallScore = 0;
}

function Dice(){
  this.roll = 0;
}

Dice.prototype.randomRoll = function(){
  this.roll = Math.floor(Math.random() * (6) + 1);
  return this.roll;
}

function Game(players, dice){
  this.players = players;
  this.currentPlayer = this.players[0];
  this.dice = dice;
  this.win;
}

Game.prototype.getRoll = function(){
    this.dice.randomRoll()
    console.log(this.dice.roll);
    if (this.dice.roll === 1){
      this.currentPlayer.turnScore = 0;
      this.endTurn();
    } else {
      this.currentPlayer.turnScore += this.dice.roll;
      console.log(this.currentPlayer.turnScore);
    }
}

Game.prototype.endTurn = function(){
  this.currentPlayer.overallScore += this.currentPlayer.turnScore;
  console.log("current player's overall score: " + this.currentPlayer.overallScore);
  if (this.currentPlayer.overallScore >= 100){
    console.log("you win!");
    this.win = currentPlayer;
  } else {
    var currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    currentPlayerIndex = 1 - currentPlayerIndex;
    this.currentPlayer = this.players[currentPlayerIndex];
    console.log(currentPlayerIndex);
  }
}


//<!-- Front End  -->
$(document).ready(function(){
  $("form#inputForm").submit(function(event){
    event.preventDefault();

  });
});

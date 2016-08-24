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
}


//<!-- Front End  -->
$(document).ready(function(){
  $("form#inputForm").submit(function(event){
    event.preventDefault();

  });
});

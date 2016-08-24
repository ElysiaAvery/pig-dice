//<!-- Back End -->
function Player (name){
  this.name = name;
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
  this.currentPlayer.turnScore = 0;
  console.log("current player's overall score: " + this.currentPlayer.overallScore);
  if (this.currentPlayer.overallScore >= 100){
    console.log("you win!");
    this.win = this.currentPlayer;
  } else {
    var currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    currentPlayerIndex = 1 - currentPlayerIndex;
    this.currentPlayer = this.players[currentPlayerIndex];
    console.log(currentPlayerIndex);
  }
}


//<!-- Front End  -->
$(document).ready(function(){
  var player1, player2, die1, game, gameStart = false;
  $("#start-game").click(function(){
    toggleButtons();
    gameStart = !gameStart;
    if(gameStart){
      player1 = new Player("Player 1");
      player2 = new Player("Player 2");
      die1 = new Dice();
      game = new Game([player1, player2], die1);
      updateScores();
      switchPlayer();
    }
  });

  function toggleButtons(){
    $(".toHide").toggle();
    $("#roll-game").prop('disabled', function( i, val ) {
      return !val;
    });
    $("#hold-game").prop('disabled', function( i, val ) {
      return !val;
    });
  }

  function switchPlayer(){
    //$("#roll-result").text("Press the 'Roll' button to roll the die!");
    $("#current-player").text("Current Player: " + game.currentPlayer.name);
    $("#turn-score").text("Total this turn: " + game.currentPlayer.turnScore);
  }

  function updateScores(){
    $("#player1score").text(game.players[0].overallScore);
    $("#player2score").text(game.players[1].overallScore);
  }

  function rollDicePics(){
    var diceArray = ["die1.png", "die2.png", "die3.png", "die4.png", "die5.png", "die6.png"];
    $("#roll-img").addClass("animated infinite wobble");
    var diceImg;
    var myInterval = setInterval(function(){
      var diceIndex = Math.floor(Math.random()*6);
      diceImg = "img/" + diceArray[diceIndex];
      $("#roll-img").attr("src", diceImg);
    }, 250);
    var myTimeout = setTimeout(function(){
      clearInterval(myInterval);
      $("#roll-img").removeClass("infinite wobble");
      $("#roll-img").addClass("bounce");
      game.getRoll();
      diceImg = "img/" + diceArray[game.dice.roll-1];
      $("#roll-img").attr("src", diceImg);
      $("#turn-score").text("Total this turn: " + game.currentPlayer.turnScore);
      if(game.dice.roll === 1){
        alert("Whoops you rolled a one, loser");
        switchPlayer();
      }
    }, 1000);
  }

  $("#roll-game").click(rollDicePics);

  $("#hold-game").click(function(){
    game.endTurn();
    updateScores();
    if(game.win){
      $("#youWon").html("<h2>Congratulations " + game.win.name + ", you won! Good job.</h2>");
      $("#roll-img").removeClass("bounce");
      $("#roll-img").addClass("flip");
      $("#roll-img").on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
        var myTimeout = setTimeout(function(){
          gameStart = !gameStart;
          $("#youWon").empty();
          toggleButtons();
          $("#roll-img").removeClass("flip");
        }, 4000);
      });
      //toggleButtons();
    } else {
      switchPlayer();
    }
  });
});

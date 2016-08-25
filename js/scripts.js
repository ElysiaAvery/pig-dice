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
    if (this.dice.roll === 1){
      this.currentPlayer.turnScore = 0;
      this.endTurn();
    } else {
      this.currentPlayer.turnScore += this.dice.roll;
    }
}

Game.prototype.endTurn = function(){
  this.currentPlayer.overallScore += this.currentPlayer.turnScore;
  this.currentPlayer.turnScore = 0;
  if (this.currentPlayer.overallScore >= 100){
    this.win = this.currentPlayer;
  } else {
    var currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    currentPlayerIndex = 1 - currentPlayerIndex;
    this.currentPlayer = this.players[currentPlayerIndex];
  }
}


//<!-- Front End  -->
$(document).ready(function(){
  var player1, player2, die1, game, gameStart = false;
  $("#start-game").click(function(){
    toggleButtons();
    gameStart = !gameStart;
    if(gameStart){
      $('#startModal').modal();
      player1 = new Player("Player 1");
      player2 = new Player("Player 2");
      die1 = new Dice();
      game = new Game([player1, player2], die1);
      $("#player1").text("Player 1");
      $("#player2").text("Player 2");
      updateScores();
      switchPlayer();
    }
  });

  $("#game-modal").submit(function(event){
    event.preventDefault();
    $("#player1-name").val();
    $("#player2-name").val();
    var player1Modal = $("#player1-name").val();
    var player2Modal = $("#player2-name").val();
    game.players[0].name = player1Modal;
    game.players[1].name = player2Modal;
    $('#startModal').modal('hide');
    switchPlayer();
    $("#player1").text(player1Modal);
    $("#player2").text(player2Modal);
    $("#game-modal")[0].reset();
    console.log(game.players);
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
    $("#youWon").empty();
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
        $("#youWon").html("<h1>Whoops you rolled a one, loser</h1>");
        $("#roll-img").on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
          switchPlayer();
        });
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

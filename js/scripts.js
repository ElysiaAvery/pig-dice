//<!-- Back End -->
function Player (name){
  this.name = name;
  this.turnScore = 0;
  this.overallScore = 0;
  this.gamesWon = 0;
}

function ComputerPlayer(){
  var evilArray = ["Lore", "HAL 9000", "Brainiac", "Ash", "T-1000", "Roy Batty", "Mechagodzilla", "ED-209", "David"]
  this.name = evilArray[Math.floor(Math.random() * evilArray.length)];
  this.turnScore = 0;
  this.overallScore = 0;
  this.isComputer = true;
  this.gamesWon = 0;
}

ComputerPlayer.prototype.rollYN = function(){
  if(this.turnScore + this.overallScore > 100){
    return false;
  }
  var decide = Math.round(Math.random());
  //true = roll
  if(decide){
    return true;
  } else{
    return false;
  }
}

function Dice(){
  this.roll = 0;
}

Dice.prototype.randomRoll = function(){
  this.roll = Math.floor(Math.random() * (6) + 1);
  return this.roll;
}

function Game(players, dice, doubleDice){
  this.players = players;
  this.currentPlayer = this.players[0];
  this.dice = dice;
  this.win;
  this.gamesCount = 1;
  this.doubleDice = doubleDice;
}

Game.prototype.endGame = function(){
  this.gamesCount++;
  this.players.forEach(function(player){
    if(player.overallScore >= 100){
      player.gamesWon++;
    }
    player.turnScore = 0;
    player.overallScore = 0;
  });
  this.currentPlayer = this.players[0];
  this.win = "";
}

Game.prototype.getRoll = function(){
    this.dice.forEach(function(die){
      die.randomRoll();
    })
    var turnEnd = false;
    if(!this.doubleDice){
      if (this.dice[0].roll === 1){
        this.currentPlayer.turnScore = 0;
        this.endTurn();
        turnEnd = true;
      } else {
        this.currentPlayer.turnScore += this.dice[0].roll;
      }
    } else {
      if (this.dice[0].roll === 1 && this.dice[1].roll === 1){
        this.currentPlayer.overallScore = 0;
        this.currentPlayer.turnScore = 0;
        this.endTurn();
        turnEnd = true;
      }
      else if (this.dice[0].roll === 1 || this.dice[1].roll === 1){
        this.currentPlayer.turnScore = 0;
        this.endTurn();
        turnEnd = true;
      } else {
        this.currentPlayer.turnScore += (this.dice[0].roll + this.dice[1].roll);
      }
    }
    return turnEnd;
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
      game = new Game([player1, player2], [die1]);
      $("#player1").text("Player 1:");
      $("#player2").text("Player 2:");
      updateScores();
      switchPlayer();
    }
  });

  $("#game-modal").submit(function(event){
    event.preventDefault();
    var gameRules = ["<h4>Rules of Play:</h4>" +
                    "<p>Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to 'hold':</p>" +
                    "<ol>" +
                    "<li>If the player rolls a 1, they score nothing and it becomes the next player's turn.</li>" +
                    "<li>If the player rolls any other number, it is added to their turn total and the player's turn continues.</li>" +
                    "<li>If a player chooses to 'hold', their turn total is added to their score, and it becomes the next player's turn.</li>" +
                    "</ol>" +
                    "<p>The first player to score 100 or more points wins.</p>",
                    "<h4>Rules of Play:</h4>" +
                    "<p>Each turn, a player repeatedly rolls the dice until either a 1 is rolled or the player decides to 'hold':</p>" +
                    "<ol>" +
                    "<li>If the player rolls a 1, they score nothing and it becomes the next player's turn.</li>" +
                    "<li>If the player rolls a double 1, they score nothing, lose their total score, and it becomes the next player's turn.</li>" +
                    "<li>If the player rolls any other doubles, they must roll again.</li>" +
                    "<li>If the player rolls any other number, it is added to their turn total and the player's turn continues.</li>" +
                    "<li>If a player chooses to 'hold', their turn total is added to their score, and it becomes the next player's turn.</li>" +
                    "</ol>" +
                    "<p>The first player to score 100 or more points wins.</p>"];
    $("#player1-name").val();
    $("#player2-name").val();
    var player1Modal = $("#player1-name").val();
    game.players[0].name = player1Modal;
    if($("#computer-check").is(":checked") || !$("#player2-name").val()){
      game.players[1] = new ComputerPlayer();
    } else {
      var player2Modal = $("#player2-name").val();
      game.players[1].name = player2Modal;
    }
    if($("#doubleDice").is(":checked")){
      game.doubleDice = true;
      game.dice.push(new Dice());
      $("#rules").html(gameRules[1]);
      $("#roll-result").html("<div class='row'><div class='col-sm-6'><img id='roll-img' class='img-responsive' src='img/die1.png'></div><div class='col-sm-6'><img id='roll-img2' class='img-responsive' src='img/die2-1.png'></div></div>");
    } else {
      $("#rules").html(gameRules[0]);
      $("#roll-result").html("<img id='roll-img' class='img-responsive' src='img/die1.png'>");
    }
    $('#startModal').modal('hide');
    switchPlayer();
    $("#player1").text(game.players[0].name+":");
    $("#player2").text(game.players[1].name+":");
    $("#game-modal")[0].reset();
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
    if(game.currentPlayer.isComputer){
      rollDicePics();
      $("#roll-game").prop('disabled', function( i, val ) {
        return true;
      });
      $("#hold-game").prop('disabled', function( i, val ) {
        return true;
      });
    } else {
      $("#hold-game").prop('disabled', function( i, val ) {
        return false;
      });
      $("#roll-game").prop('disabled', function( i, val ) {
        return false;
      });
    }
  }

  function updateScores(){
    $("#player1score").text(game.players[0].overallScore);
    $("#player2score").text(game.players[1].overallScore);
  }

  function rollDicePics(){
    $("#youWon").empty();
    var diceArray = ["die1.png", "die2.png", "die3.png", "die4.png", "die5.png", "die6.png"];
    var dice2Array = ["die2-1.png", "die2-2.png", "die2-3.png", "die2-4.png", "die2-5.png", "die2-6.png"];
    $("#roll-img").addClass("animated infinite wobble");
    if(game.doubleDice){
      $("#roll-img2").addClass("animated infinite wobble");
    }
    var diceImg, dice2Img;
    var myInterval = setInterval(function(){
      var diceIndex = Math.floor(Math.random()*6);
      var dice2Index = Math.floor(Math.random()*6);
      diceImg = "img/" + diceArray[diceIndex];
      dice2Img = "img/" + dice2Array[dice2Index];
      $("#roll-img").attr("src", diceImg);
      $("#roll-img2").attr("src", dice2Img);
    }, 250);
    var myTimeout = setTimeout(function(){
      clearInterval(myInterval);
      $("#roll-img").removeClass("infinite wobble").addClass("bounce");
      if(game.doubleDice){
        $("#roll-img2").removeClass("infinite wobble").addClass("bounce");
      }
      var turnEnd = game.getRoll();
      diceImg = "img/" + diceArray[game.dice[0].roll-1];
      $("#roll-img").attr("src", diceImg);
      if(game.doubleDice){
        dice2Img = "img/" + dice2Array[game.dice[1].roll-1];
        $("#roll-img2").attr("src", dice2Img);
      }
      $("#dice1out").text(game.dice[0].roll);
      $("#dice2out").text(game.dice[1].roll);
      $("#turn-score").text("Total this turn: " + game.currentPlayer.turnScore);
      if(turnEnd){
        $("#youWon").html("<h1>Whoops you rolled a one, loser</h1>");
        updateScores();
        $("#roll-img").on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
          switchPlayer();
          $("#roll-img").off('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
        });
      }
      else {
        if(game.currentPlayer.isComputer){
          if(game.dice[0].roll === game.dice[1].roll){
            setTimeout(rollDicePics, 2000);
          }
          else if(game.currentPlayer.rollYN()){
            setTimeout(rollDicePics, 2000);
          } else {
            setTimeout(holdDice, 2000);
          }
        } else if(game.dice[0].roll === game.dice[1].roll){
          $("#hold-game").prop('disabled', function( i, val ) {
            return !val;
          });
        }
      }
    }, 1000);
  }

  function holdDice(){
    game.endTurn();
    updateScores();
    if(game.win){
      $("#youWon").html("<h2>Congratulations " + game.win.name + ", you won! Good job.</h2>");
      $("#roll-img").removeClass("bounce").addClass("flip");
      if(game.doubleDice){
        $("#roll-img2").removeClass("bounce").addClass("flip");
      }
      $("#roll-img").on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
        var endTimeout = setTimeout(function(){
          game.endGame();
          switchPlayer();
          $("#youWon").empty();
          $("#roll-img").removeClass("flip");
          if(game.doubleDice){
            $("#roll-img2").removeClass("flip");
          }
          $("#game-number").text(game.gamesCount);
          $("#player1games").text(game.players[0].gamesWon);
          $("#player2games").text(game.players[1].gamesWon);
          $("#player1score").text("0");
          $("#player2score").text("0");
          $("#roll-img").off('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
        }, 4000);
      });
      //toggleButtons();
    } else {
      switchPlayer();
    }
  }

  $("#roll-game").click(function(){
    $("#hold-game").prop('disabled', function( i, val ) {
      return false;
    });
    rollDicePics();
  });

  $("#hold-game").click(holdDice);
});

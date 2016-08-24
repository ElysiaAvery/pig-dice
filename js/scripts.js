//<!-- Back End -->
function Player (){
  this.turnScore = 0;
  this.overallScore = 0;
}

//<!-- Front End  -->
$(document).ready(function(){
  $("form#inputForm").submit(function(event){
    event.preventDefault();

  });
});

function Score(x, y){
  var scoreLabelText = "Score: ";
  var scoreUpdateText;
  var scoreStyle = {font: "24px Arial", fill: "#ffffff", align: "left"};

  var score = game.add.text(x, y, scoreLabelText, scoreStyle);

}

Score.prototype.update = function(){

}

function Timer(x, y){
  var timerLabelText = "Time Remaining: ";
  var timerUpdateText;
  var timerStyle = {font: "24px Arial", fill: "#ffffff", align: "left"};

  var timer = game.add.text(x, y, timerLabelText, timerStyle);
}

Timer.prototype.update = function() {

}

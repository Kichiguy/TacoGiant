function Score(x, y){
  var scoreLabelText = "Score: ";
  var scoreUpdateText = 0;
  var scoreStyle = {font: "24px Arial", fill: "#ffffff", align: "left"};

  var scoreLabel = game.add.text(x, y, scoreLabelText, scoreStyle);
  var score = game.add.text(x, y + 25, scoreUpdateText, scoreStyle);
}

Score.prototype.deliverTaco = function(points){
  scoreUpdateText = scoreUpdateText + points;
}

Score.prototype.propertyDamage = function(points) {
  scoreUpdateText = scoreUpdateText - points;
}

Score.prototype.update = function() {
  score.text = scoreUpdateText;
}

function Timer(x, y){
  var timerLabelText = "Time Remaining: ";
  var timerUpdateText = 0;
  var timerStyle = {font: "24px Arial", fill: "#ffffff", align: "right"};

  var timerLabel = game.add.text(x, y, timerLabelText, timerStyle);
  var timer = game.add.text(x, y + 25, timerUpdateText, timerStyle);
}

Timer.prototype.addTime = function() {

}

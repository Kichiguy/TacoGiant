function Score(x, y){
  this.scoreLabelText = "Score: ";
  this.scoreUpdateText = 0;
  this.scoreStyle = {font: "24px Arial", fill: "#ffffff", align: "left"};

  this.scoreLabel = game.add.text(x, y, this.scoreLabelText, this.scoreStyle);
  this.score = game.add.text(x, y + 25, this.scoreUpdateText, this.scoreStyle);
}

Score.prototype.deliverTaco = function(points){
  this.scoreUpdateText = parseInt(this.scoreUpdateText) + parseInt(points);
}

Score.prototype.propertyDamage = function(points) {
  this.scoreUpdateText = parseInt(this.scoreUpdateText) - parseInt(points);
}

Score.prototype.update = function() {
  this.score.setText(this.scoreUpdateText);
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

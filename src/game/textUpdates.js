function Score(x, y){
  this.scoreLabelText = "Score: ";
  this.scoreUpdateText = 0;
  this.scoreStyle = {font: "24px Arial", fill: "#ffffff", align: "left"};

  this.scoreLabel = game.add.text(x, y, this.scoreLabelText, this.scoreStyle);

  this.score = game.add.text(x, y + 25, this.scoreUpdateText, this.scoreStyle);
}

Score.prototype.deliverTaco = function(points){
  this.scoreUpdateText = parseInt(this.scoreUpdateText) + parseInt(points);
  this.score.setText(this.scoreUpdateText);
}

Score.prototype.propertyDamage = function(points) {
  this.scoreUpdateText = parseInt(this.scoreUpdateText) - parseInt(points);
  this.score.setText(this.scoreUpdateText);
}

function Timer(x, y, countdown){
  this.timerLabelText = "Time Remaining: ";
  this.timerStyle = {font: "24px Arial", fill: "#ffffff", align: "right"};
  this.timerCountdown = countdown;
  game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

  this.timerLabel = game.add.text(x, y, this.timerLabelText, this.timerStyle);
  this.timer = game.add.text(x, y + 25, this.timerCountdown, this.timerStyle);

}

Timer.prototype.addTime = function(addedAmount) {
  this.timerCountdown = parseInt(this.timerCountdown) + parseInt(addedAmount);
}

Timer.prototype.updateTimer = function() {
  this.timerCountdown = parseInt(this.timerCountdown) - 1;
  this.timer.setText(this.timerCountdown);
}

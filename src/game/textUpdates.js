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

function Timer(x, y, game){
  this.timerLabelText = "Time Remaining: ";
  this.timerUpdateText = 0;
  this.timerStyle = {font: "24px Arial", fill: "#ffffff", align: "right"};

  this.timerLabel = game.add.text(x, y, this.timerLabelText, this.timerStyle);
  this.timer = game.add.text(x, y + 25, this.timerUpdateText, this.timerStyle);

  game.time.events.add(Phaser.Timer.Minute, gameOver, game);
}

Timer.prototype.addTime = function() {

}

Timer.prototype.update = function() {
  this.timer.setText(game.time.events.duration);
}

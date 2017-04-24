function Score(x, y){
  this.scoreLabelText = "Score: ";
  this.scoreUpdateText = 0;
  this.scoreStyle = {font: "24px Arial", fill: "#ffffff", align: "left"};

  this.scoreLabel = game.add.text(x, y, this.scoreLabelText, this.scoreStyle);
  this.scoreLabel.fixedToCamera = true;
  this.score = game.add.text(x, y + 25, this.scoreUpdateText, this.scoreStyle);
  this.score.fixedToCamera = true;
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
  this.timerLabel.fixedToCamera = true;
  this.timer = game.add.text(x, y + 25, this.timerCountdown, this.timerStyle);
  this.timer.fixedToCamera = true;

}

Timer.prototype.addTime = function(addedAmount) {
  this.timerCountdown = parseInt(this.timerCountdown) + parseInt(addedAmount);
  this.timer.setText(this.timerCountdown);
}

Timer.prototype.updateTimer = function() {
  this.timerCountdown = parseInt(this.timerCountdown) - 1;
  this.timer.setText(this.timerCountdown);
}

var PauseMenu = function(x,y) {
  this.pauseLabelText = "PAUSE";
  this.labelStyle = {font: "24px Arial", fill: "#ffffff", align: "right"};
  this.pauseLabel = game.add.text(x, y, this.pauseLabelText, this.labelStyle);
  this.pauseLabel.fixedToCamera = true;
  this.pauseLabel.inputEnabled = true;
  //make the label pause the game

  var context = this;
  this.pauseLabel.events.onInputUp.add(function() {
    if (game.paused != true){
      //pause the game
      game.paused = true
      //render the menu
      context.createResumeButton(context.resumePlay);
      context.createRestartButton(context.restartPlay);
    }
  });
  var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  space.onDown.add(function() {
    if (game.paused != true){
      //pause the game
      game.paused = true
      //render the menu
      context.createResumeButton(context.resumePlay);
      context.createRestartButton(context.restartPlay);
    }
    //render the menu
  });
};
PauseMenu.prototype.resumePlay = function(){
  this.resumeButton.destroy();
  this.restartButton.destroy();

  game.paused = false;
}
PauseMenu.prototype.restartPlay = function(){
  game.state.restart();
  this.resumePlay();
}
PauseMenu.prototype.createResumeButton = function(callback){
  this.resumeButton = new StandardLabelButton(game.camera.view.centerX, game.camera.view.centerY - 100, "Resume", callback, this, 0,0,0,0);
}
PauseMenu.prototype.createRestartButton = function(callback){
  this.restartButton = new StandardLabelButton(game.camera.view.centerX, game.camera.view.centerY + 100, "Restart", callback, this, 0,0,0,0);
}



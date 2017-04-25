function Score(x, y){
  this.scoreLabelText = "Tips $";
  this.tips = 0.0;
  this.scoreStyle = {font: "24px Arial", fill: "#ffffff", align: "left"};
  this.score = game.add.text(x, y, this.scoreLabelText + this.tips, this.scoreStyle);
  this.score.fixedToCamera = true;
}

Score.prototype.deliverTaco = function(points){
  this.tips += points;
  this.score.setText(this.scoreLabelText + this.tips);
}

Score.prototype.propertyDamage = function(points) {
  this.tips -= points;
  this.score.setText(this.scoreLabelText + this.tips);
}

function Timer(x, y, countdown){
  this.timerStyle = {font: "35px Arial", fill: "#ffffff", align: "right"};
  this.timerCountdown = countdown;
  game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

  this.timer = game.add.text(x, y, ":" + this.timerCountdown, this.timerStyle);
  this.timer.fixedToCamera = true;

}

Timer.prototype.addTime = function(addedAmount) {
  this.timerCountdown = parseInt(this.timerCountdown) + parseInt(addedAmount);
  this.timer.setText(":"+this.timerCountdown);
}

Timer.prototype.updateTimer = function() {
  this.timerCountdown = parseInt(this.timerCountdown) - 1;
  this.timer.setText(":"+this.timerCountdown);
}

var PauseMenu = function(x,y) {
  this.pauseLabelText = "Press Space To Pause";
  this.labelStyle = {font: "24px Arial", fill: "#ffffff", align: "right"};
  this.pauseLabel = game.add.text(x, y, this.pauseLabelText, this.labelStyle);
  this.pauseLabel.anchor.setTo(0.5,0);
  this.pauseLabel.fixedToCamera = true;
  //press space to pause the game
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
  this.resumeButton = game.add.button(game.camera.view.centerX - 220, game.camera.view.centerY - 100, "resumeButton", callback, this, 0,0,0,0);
}
PauseMenu.prototype.createRestartButton = function(callback){
  this.restartButton = game.add.button(game.camera.view.centerX + 100, game.camera.view.centerY - 100, "restartButton", callback, this, 0,0,0,0);
}

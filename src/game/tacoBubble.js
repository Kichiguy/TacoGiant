function TacoBubble(x,y) {
  this.bubble = game.add.sprite(x,y,'thoughtBubble');
  this.bubble.animations.add('think');
  this.bubble.play('think',4,true);
}

function TacoIndicator(x,y) {
  this.indicator = game.add.sprite(x,y,'tacoIndicator');
  this.indicator.animations.add('left', [0,1,2,3], 4, true);
  this.indicator.animations.add('right', [4,5,6,7], 4, true);
}

TacoIndicator.prototype.pointLeft = function() {
  this.indicator.animations.play('left');
}

TacoIndicator.prototype.pointRight = function() {
  this.indicator.animations.play('right');
}

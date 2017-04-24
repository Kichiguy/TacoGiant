function TacoBubble(x,y) {
  this.bubble = game.add.sprite(x,y,'thoughtBubble');
  this.bubble.animations.add('think',[0,1,2,3],4,true);
  this.bubble.animations.add('thinkUrgent',[4,5,6,7],4,true);
}

TacoBubble.prototype.kill = function(){
  this.bubble.kill();
}

TacoBubble.prototype.normal = function() {
  this.bubble.animations.play('think');
}

TacoBubble.prototype.urgent = function() {
  this.bubble.animations.play('thinkUrgent');
}

function TacoIndicator(x,y) {
  this.indicator = game.add.sprite(x,y,'tacoIndicator');
  this.indicator.animations.add('left', [0,1,2,3], 4, true);
  this.indicator.animations.add('right', [4,5,6,7], 4, true);
  this.indicator.animations.add('leftUrgent', [8,9,10,11], 4, true);
  this.indicator.animations.add('rightUrgent', [12,13,14,15], 4, true);
}

TacoIndicator.prototype.pointLeft = function() {
  this.indicator.animations.play('left');
}

TacoIndicator.prototype.pointLeftUrgent = function() {
  this.indicator.animations.play('leftUrgent');
}

TacoIndicator.prototype.pointRight = function() {
  this.indicator.animations.play('right');
}

TacoIndicator.prototype.pointRightUrgent = function() {
  this.indicator.animations.play('rightUrgent');
}

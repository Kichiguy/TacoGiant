function TacoBubble(x,y) {
  this.bubble = game.add.sprite(x,y,'thoughtBubble');
  this.bubble.animations.add('think');
  this.bubble.play('think',4,true);
}

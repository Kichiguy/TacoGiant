function Townsfolk(x,y) {
  this.townSprite = game.add.sprite(x,y,'townsfolk');
  this.townWalk = townSprite.animations.add('walk');

  game.physics.arcade.enable(this.townSprite);
}

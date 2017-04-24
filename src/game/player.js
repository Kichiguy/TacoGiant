function Player(){
  this.player = game.add.sprite(200,500, 'giant');
  this.player.anchor.setTo(.5,1);
  game.physics.arcade.enable(this.player);
  this.player.body.bounce.y=.02;
  this.player.body.gravity.y = 200;
  this.player.body.collideWorldBounds = false;
  this.player.body.setSize(96,142,0,52);
  this.player.animations.add('idle',[8,9,10,11,12,13,14,15],4,true);
  this.player.animations.add('walking',[4,5,6,7],4,true);
  this.player.animations.add('jumping',[0,1,2],4,false);
  this.cursors = game.input.keyboard.createCursorKeys();
}

Player.prototype.update = function(){
  var body = this.player.body;
  //this.player.animations.play('idle');
  //Controls movement
  body.velocity.x = 0;

  if(body.y >= 410){
    body.y = 410;
  }
  if(this.cursors.right.isDown){
    this.player.scale.x = 1;
    body.velocity.x = 600;
    this.player.animations.play('walking');
  }
  if(this.cursors.left.isDown){
    this.player.scale.x = -1;
    body.velocity.x = -600;
    this.player.animations.play('walking');
  }
  //  Allow the player to jump down through platforms
  if (this.cursors.down.isDown){
    body.velocity.y = 200;
  }
}

function jumpDown(){
  if (player.cursors.down.isDown){
    return false;
  }
  else{
    return true;
  }
}

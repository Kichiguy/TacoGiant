function Player(){
  this.player = game.add.sprite(200,300, 'giant');

  game.physics.arcade.enable(this.player);
  this.player.body.bounce.y=.02;
  this.player.body.gravity.y = 200;
  this.player.body.collideWorldBounds = false;
  this.player.body.setSize(96,142,0,0);
  this.player.animations.add('idle');
  this.player.play('idle',4,true);
  this.cursors = game.input.keyboard.createCursorKeys();
}

Player.prototype.update = function(){
  var body = this.player.body;

  //Controls movement
  body.velocity.x = 0;

  if(body.y >= 410){
    body.y = 410;
  }
  if(this.cursors.right.isDown){
    body.velocity.x = 600;
  }
  if(this.cursors.left.isDown){
    body.velocity.x = -600;
  }
  if(this.cursors.up.isDown && (body.touching.down)){
    body.velocity.y = -250;
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

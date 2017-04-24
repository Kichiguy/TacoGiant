function Player(){
  this.player = game.add.sprite(200,300, 'giant');

  game.physics.arcade.enable(this.player);
  this.player.body.bounce.y=.02;
  this.player.body.gravity.y = 200;
  // this.player.body.collideWorldBounds = true;

  this.cursors = game.input.keyboard.createCursorKeys();
}

Player.prototype.update = function(){
  var body = this.player.body;

  //Controls movement
  body.velocity.x = 0;
  if(this.cursors.right.isDown){
    body.velocity.x = 600;
  }
  if(this.cursors.left.isDown){
    body.velocity.x = -600;
  }
  if(this.cursors.up.isDown && (body.touching.down || body.checkWorldBounds())){
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
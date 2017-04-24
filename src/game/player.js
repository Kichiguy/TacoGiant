function Player(){
  this.player = game.add.sprite(200,300, 'giant');
  this.player.anchor.setTo(.5,1);
  game.physics.arcade.enable(this.player);
  this.player.body.bounce.y=.02;
  this.player.body.gravity.y = 200;
  this.player.body.collideWorldBounds = false;
  this.player.body.setSize(96,245,0,0);
  this.player.animations.add('idle',[8,9,10,11,12,13,14,15],4,true);
  this.player.animations.add('walking',[4,5,6,7],4,true);
  this.player.animations.add('jumping',[0,1,2],4,false);
  this.player.animations.add('mid-air',[2],1,false);
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

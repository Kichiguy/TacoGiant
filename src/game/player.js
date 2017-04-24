function Player(){
  this.player = game.add.sprite(200,500, 'giant');  this.player.anchor.setTo(.5,1);  game.physics.arcade.enable(this.player);  this.state = 'idle';  this.player.body.bounce.y=.02;  this.player.body.gravity.y = 200;  this.player.body.collideWorldBounds = false;  this.player.body.setSize(90,100,0,135);
  this.player.animations.add('idle',[8,9,10,11,12,13,14,15],4,true);  this.player.animations.add('walking',[4,5,6,7],4,true);  this.player.animations.add('jumping',[0,1,2],8,false);  this.player.animations.add('midAir',[2],10,true);  this.player.animations.add('impact',[0],1,false);  this.cursors = game.input.keyboard.createCursorKeys();}Player.prototype.update = function(){  var body = this.player.body;  //this.player.animations.play('idle');  //Controls movement  body.velocity.x = 0;  if(body.y >= 710){
    body.y = 710;
  }
  if(this.cursors.right.isDown){    body.velocity.x = 600;    if(this.state != 'right') {      this.player.scale.x = 1;      if(body.velocity.y == -0.06535947712418301){        this.player.animations.play('walking');        this.state = 'right';      }    }  }  else if(this.cursors.left.isDown){    body.velocity.x = -600;    if(this.state != 'left'){      this.player.scale.x = -1;      if(body.velocity.y == -0.06535947712418301){        this.player.animations.play('walking');        this.state = 'left';      }    }  }  else{    if(this.state != 'idle' && (body.velocity.y == -0.06535947712418301)) {      this.player.animations.play('idle');      this.state = 'idle';    }  }  if(body.velocity.y != -0.06535947712418301 && body.touching.down == false) {    if(this.state != 'midAir'){
      shakeIt = true;
      this.player.animations.play('midAir');      this.state = 'midAir';    }  }  if(this.cursors.up.isDown && (body.touching.down)){
    shakeIt = true;
    body.velocity.y = -250;    this.player.animations.play('jumping');  }  //  Allow the player to jump down through platforms  if (this.cursors.down.isDown && (body.touching.down)){
    body.velocity.y = 200;  }
}function jumpDown(){  if (player.cursors.down.isDown){
    return false;  }  else{    return true;  }}

function groundShake(player, otherThing){
  //checks that the player is colliding on the bottom
  if(player.body.touching.down && shakeIt == true){
      //a gentle shake
      game.camera.shake(0.005, 300);
      player.animations.play('impact');
    //only shake once until the next jump event
    shakeIt = false;
  }
}

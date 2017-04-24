function Player(){  this.player = game.add.sprite(200,500, 'giant');  this.player.anchor.setTo(.5,1);  game.physics.arcade.enable(this.player);  this.state = 'idle';  this.player.body.bounce.y=.02;  this.player.body.gravity.y = 200;  this.player.body.collideWorldBounds = false;  this.player.body.setSize(96,142,0,52);  this.player.animations.add('idle',[8,9,10,11,12,13,14,15],4,true);  this.player.animations.add('walking',[4,5,6,7],4,true);  this.player.animations.add('jumping',[0,1,2],4,false);  this.player.animations.add('midAir',[2],1,true);  this.player.animations.add('impact',[0],1,false);  this.cursors = game.input.keyboard.createCursorKeys();}Player.prototype.update = function(){  var body = this.player.body;  //this.player.animations.play('idle');  //Controls movement  body.velocity.x = 0;  if(body.y >= 410){    body.y = 410;  }  if(this.cursors.right.isDown){    body.velocity.x = 600;    if(this.state != 'right') {      this.player.scale.x = 1;      this.player.animations.play('walking');      this.state = 'right';    }  }  else if(this.cursors.left.isDown){    body.velocity.x = -600;    if(this.state != 'left'){      this.player.scale.x = -1;      this.player.animations.play('walking');      this.state = 'left';    }  }  else{    if(this.state != 'idle') {      this.player.animations.play('idle');      this.state = 'idle';    }  }  //this is a jump  if(this.cursors.up.isDown && (body.touching.down)){    shakeIt = true;    body.velocity.y = -250;    this.player.animations.play('jumping');  }  //  Allow the player to jump down through platforms  if (this.cursors.down.isDown && (body.touching.down)){    shakeIt = true;    body.velocity.y = 200;  }}// lets the collision know if the player can jump downfunction jumpDown(){  if (player.cursors.down.isDown){    shakeIt = true;    return false;  }  else{    return true;  }}function groundShake(player, otherThing){  //checks that the player is colliding on the bottom  if(player.body.touching.down && shakeIt == true){    //shake( intensity , duration )    game.camera.shake(0.01, 500);    //only shake once until the next jump event    shakeIt = false;  }}
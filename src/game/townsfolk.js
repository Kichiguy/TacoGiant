function Townsfolk(x,y) {
  this.isCustomer = false;
  this.deliveredTo = false;
  this.tips = 100;



  this.townSprite = game.add.sprite(x,y,'townsfolk');
  this.townWalk = this.townSprite.animations.add('walk');
  this.townSprite.play('walk', 4, true)
  game.physics.arcade.enable(this.townSprite);
  
  this.townSprite.body.collideWorldBounds = true;
  this.townSprite.body.bounce.y = .2
  this.townSprite.speed = ['Stand', 'Slow', 'Fast'][Math.floor(Math.random() * 3)];
  if(this.townSprite.speed === 'Stand'){
    this.townSprite.body.velocity.x = 0
  }
  else if(this.townSprite.speed ==='Slow'){
    this.townSprite.body.velocity.x = 50 * (Math.random() < .5 ? -1 : 1)
  }
  else {
    this.townSprite.body.velocity.x = 100 * (Math.random() < .5 ? -1 : 1)
  }
  
}

//Townsfolk can have three speeds = Standing, slow and fast
//Customers are stationary
//Townsfolk will walk in a random direction until the giant runs too close, then 
//they will try to walk away from the giant
//
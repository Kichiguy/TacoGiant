function Tacometer(x,y,spriteTag){
  this.emitter = game.add.emitter(0, 0, 1000);
  this.emitter.fixedToCamera = true;
  this.emitter.makeParticles('tinierTaco');
  this.xCood = x;
  this.yCood = y;
  //generates a vertical tacometer along the top edge
  Phaser.Group.call(this, game);
  //start with 10 tacos. 0 THROUGH 9
  this.tacoCount = 10;
  this.loadTacometer(x,y,spriteTag);

}
Tacometer.prototype = Object.create(Phaser.Group.prototype);
Tacometer.prototype.loadTacometer = function(x,y,spriteTag, toAdd = null){
  if(toAdd){
    var moreTacos = toAdd;
  }else{
    var moreTacos = this.tacoCount;
  }

  for(var i = moreTacos; i > 0; i -= 1){
    var a = this.create(x,y,spriteTag);
    a.anchor.setTo(0.5, 0.5);
    a.fixedToCamera = true;
    x+=30;
  }
}
Tacometer.prototype.loseATaco = function(){
  if(this.tacoCount > 0){
    this.tacoCount -= 1;
    var lostTaco = this.getTop();
    this.emitter.x = lostTaco.x;
    this.emitter.y = lostTaco.y;
    lostTaco.destroy();
    this.emitter.start(true, 2000, null, 10);
  }
};

Tacometer.prototype.reloadTacometer = function(moreTacos){
  var newTacos = this.tacoCount + moreTacos;
  var oldCount = this.tacoCount;
  this.tacoCount = Math.min(10, newTacos);
  var moreTacos = this.tacoCount - oldCount;
  var lastTaco = this.getTop();
  if(lastTaco){
    newTacoX = lastTaco.cameraOffset.x + 30;
    newTacoY = lastTaco.cameraOffset.y;
  }else{
    newTacoX = this.xCood;
    newTacoY = this.yCood;
  }
  this.loadTacometer(newTacoX, newTacoY, 'tinyTaco', moreTacos);
}
///// TACO TRUCK //////
function TacoTruck(){
  var randomX = game.rnd.integerInRange(10, 2390);
  Phaser.Sprite.call(this, game, randomX, 560, 'arrow');
  this.anchor.setTo(0.5, 1); // anchor on the bottom

  game.add.existing(this);
  game.physics.arcade.enable(this);
}
TacoTruck.prototype = Object.create(Phaser.Sprite.prototype);

var reloadTacos = function(truck, player){
  tacometer.reloadTacometer(10);
  truck.cameraOffset.x = game.rnd.integerInRange(10, 2390);
}

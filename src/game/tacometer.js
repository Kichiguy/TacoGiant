function Tacometer(x,y,spriteTag){
  this.tacoStyle = {font: "20px Arial", fill: "#ffffff", align: "left"};
  this.tacoLabel = game.add.text(10, 10, "Tacometer: " , this.tacoStyle);
  this.tacoLabel.fixedToCamera = true;
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
Tacometer.prototype.loadTacometer = function(x,y,spriteTag){
  for(var i = this.tacoCount; i > 0; i -= 1){
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
    // this.emitter.start(true, 2000, null, 10);
  }
};

var reloadTacometer = function(){
  newTacoX = tacometer.xCood;
  newTacoY = tacometer.yCood;
  tacometer.destroy();
  tacometer = new Tacometer(newTacoX, newTacoY, 'tinyTaco');
}
///// TACO TRUCK //////
function TacoTruck(){
  var randomX = game.rnd.integerInRange(10, 2390);
  Phaser.Sprite.call(this, game, randomX, 570, 'tacoTruck');
  this.anchor.setTo(0.5, 1); // anchor on the bottom
  this.animations.add('dance');
  this.animations.play('dance',4,true);
  game.add.existing(this);
  game.physics.arcade.enable(this);
}
TacoTruck.prototype = Object.create(Phaser.Sprite.prototype);

var reloadTacos = function(truck, player){
  reloadTacometer();
  truck.destroy();
  chooseAudio('taco_pickup').play();
  tacoTruck = new TacoTruck;
}

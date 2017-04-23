function Tacometer(x,y,spriteTag){
  this.emitter = game.add.emitter(0, 0, 100);
  this.emitter.makeParticles('tinierTaco');
  this.emitter.gravity = 200;
  //generates a vertical tacometer along the top edge
  Phaser.Group.call(this, game);
  //start with 10 tacos. 0 THROUGH 9
  this.tacoCount = 10;
  this.initializeTacometer(x,y,spriteTag);

}
Tacometer.prototype = Object.create(Phaser.Group.prototype);
Tacometer.prototype.initializeTacometer = function(x,y,spriteTag){
  for(var i = this.tacoCount; i > 0; i -= 1){
    let a = this.create(x,y,spriteTag);
    a.anchor.setTo(0.5, 0.5);
    a.fixedToCamera = true;
    x+=30;
  }
}
Tacometer.prototype.loseATaco = function(){
  console.log(this.tacoCount);
  if(this.tacoCount > 0){
    this.tacoCount -= 1;
    let lostTaco = this.getTop();
    this.emitter.x = lostTaco.x;
    this.emitter.y = lostTaco.y;
    lostTaco.destroy();
    this.emitter.start(true, 2000, null, 10);
  }
};
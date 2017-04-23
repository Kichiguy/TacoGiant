function Tacometer(x,y,spriteTag){
  //generates a vertical tacometer along the left edge
  Phaser.Group.call(this, game);
  //start with 10 tacos. 0 THROUGH 9
  this.tacoCount = 10;
  this.initializeTacometer(x,y,spriteTag);

}
Tacometer.prototype = Object.create(Phaser.Group.prototype);

Tacometer.prototype.initializeTacometer = function(x,y,spriteTag){
  for(var i = this.tacoCount; i > 0; i -= 1){
    let a =this.create(x,y,spriteTag);
    a.fixedToCamera = true;
    x+=30;
  }
}

Tacometer.prototype.loseATaco = function(){
  console.log(this.tacoCount);
  if(this.tacoCount > 0){
    this.tacoCount -= 1;
    this.getTop().destroy();
  }
};
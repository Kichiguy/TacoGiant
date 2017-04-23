//define 'place tile' function
function PlaceTile(x,y,asset){
  tile = game.add.sprite(x,y,asset);
  game.physics.arcade.enable(tile);
  var hitPlatform = game.physics.arcade.collide(this.player.player, tile);
  tile.body.checkCollision.left = false;
  tile.body.checkCollision.right = false;
  tile.body.checkCollision.down = false;
  tile.body.immovable = true;
}
//put the road on the ground



//decide the points for the left side of each building block

//decide the height of each building block 0,1,2,3

//generate an array of x,y,image

//read array from _loadLevel() in main
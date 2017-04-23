//define 'place tile' function
function placeTile(x,y,asset)
  tile = this.create(x,y,image);
  ledge.body.checkCollision.left = false;
  ledge.body.checkCollision.right = false;
  ledge.body.checkCollision.down = false;
  ledge.body.immovable = true;
};
//put the road on the ground

//decide the points for the left side of each building block

//decide the height of each building block 0,1,2,3

//generate an array of x,y,image

//read array from _loadLevel() in main
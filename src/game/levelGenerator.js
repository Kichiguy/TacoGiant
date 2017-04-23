//define a 'place tile' function
function PlaceTile(x,y,asset){
  tile = ledges.create(x,y,asset);
  tile.body.checkCollision.left = false;
  tile.body.checkCollision.right = false;
  tile.body.checkCollision.down = false;
  tile.body.immovable = true;
};

function chooseTile(height){
  var lowerFLoorArray = ['groundFloorA','groundFloorB','groundFloorC'];
  var upperFloorArray = ['upperFloorA','upperFloorB','upperFloorC','upperFloorD','upperFloorE'];
  var y,tile;
  if(height>1){
    tile = upperFLoorArray[Math.floor(Math.random() * upperFLoorArray.length)];
  }
  else if(height ==1){
    tile = lowerFloorArray[Math.floor(Math.random()* upperFloorArray.length)]
  }
  return tile;
};

function GenerateGrid(){
  //write columns
  i = 0;
  while (i < 2400) {
    ycoordinate = i + Math.floor(Math.random() * 100) + 10;
    height = Math.floor(Math.random()*4);
    console.log(ycoordinate,height);
    //for(j=0,j<=height,j++){
    //	xcoordinate = (j*150)+63;
    //	new PlaceTile(ycoordinate,xcoordinate,'groundFloorC')
    //}
    i = ycoordinate + 182;
  }

    	//xcoordinate = (i*150)+63
};


//generate an array of x,y,image

//read array from _loadLevel() in main
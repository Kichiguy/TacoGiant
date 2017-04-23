//define a 'place tile' function
function PlaceTile(x,y,asset){
  tile = ledges.create(x,y,asset);
  tile.body.checkCollision.left = false;
  tile.body.checkCollision.right = false;
  tile.body.checkCollision.down = false;
  tile.body.immovable = true;
};

function chooseTile(ycoordinate){
  var lowerFLoorArray = ['groundFloorA','groundFloorB','groundFloorC'];
  var upperFloorArray = ['upperFloorA','upperFloorB','upperFloorC','upperFloorD','upperFloorE'];
  var y,tile;
  if(height>0){
  	for(i=0,i<height,i++){
  		x = (i*150)+63
  		var tile = lowerFLoorArray[Math.floor(Math.random() * myArray.length)];
  	}
  }
  return y,tile;
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
};


//generate an array of x,y,image

//read array from _loadLevel() in main
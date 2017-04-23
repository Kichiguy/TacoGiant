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
  var tile;
  if(height > 1){
    let tile = upperFLoorArray[Math.floor(Math.random() * upperFLoorArray.length)];
  }
  else if(height == 1){
    let tile = lowerFloorArray[Math.floor(Math.random()* lowerFloorArray.length)];
  }
  return tile;
};

function GenerateGrid(){
  //write columns
  var i = 0;
   while (i < 2400) {
    let xcoordinate =  i + Math.floor(Math.random() * 80);
    height = Math.floor(Math.random()*4);
    for(j = 0;j<height;j++){
    	let ycoordinate  = 550-(height*150);
    	console.log(xcoordinate,ycoordinate)
    	PlaceTile(xcoordinate,ycoordinate,'upperFloorB')
    }
    i = (xcoordinate+ 150);

  }

};


//generate an array of x,y,image

//read array from _loadLevel() in main
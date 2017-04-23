//define a 'place tile' function
function PlaceTile(x,y,asset){
  tile = ledges.create(x,y,asset);
  tile.body.checkCollision.left = false;
  tile.body.checkCollision.right = false;
  tile.body.checkCollision.down = false;
  tile.body.immovable = true;
};

function chooseTile(height){
  var lowerFloorArray = ['groundFloorA','groundFloorB','groundFloorC'];
  var upperFloorArray = ['upperFloorA','upperFloorB','upperFloorC','upperFloorD','upperFloorE'];
  var tile;
  if(height > 1){
    tile = upperFloorArray[Math.floor(Math.random() * upperFloorArray.length)];
  }
  else if(height == 1){
    tile = lowerFloorArray[Math.floor(Math.random()* lowerFloorArray.length)];
  };
  return tile;
};

function GenerateGrid(){
  var ptable = [1,1,1,1,1,1,0,0,2,2,2,2,3,3,3];
  var i = 0;
  while (i < 2350) {
    let xcoordinate =  i + Math.floor(Math.random() * 50)+30;
    height = Math.floor(Math.random() * 4);
    var ycoordinate;
    for(j = 1;j<=height;j++){
    	let ycoordinate  = 551-((j)*150);
    	console.log(xcoordinate,ycoordinate);
    	new PlaceTile(xcoordinate,ycoordinate, chooseTile(j));
    }
    i = (xcoordinate + 150);
  }
};
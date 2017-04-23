/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

/////// MENU ///////

var button;

var menuState = {

  //create is a default phaser state function and is automatically called
  preload: function() {
    game.load.image('logo', 'assets/Tacologo.png');
    game.load.image('standardButton', 'assets/sprites/standardButton.png')
  },

  create: function() {
    var logo = game.add.image(150,50, 'logo');
    var start_text = "Click To Begin!"
    new StandardLabelButton(this.world.centerX, this.world.centerY + 200, start_text, this.startGame, this, 0, 0, 0 ,0);
  },

  update: function() {

  },

  startGame: function() {
    game.state.start('play');
  }
};

/////// PLAY ///////

var game;
var player, delivery_points;
var ledges;
var score;
var timer;

var playState = {
  init: function() {
  },
  preload: function() {
    // State preload logic goes here
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('background', 'assets/Nightscape_BG.png');
    game.load.image('street', 'assets/road tile.png');
    game.load.image('groundFloorA', 'assets/buildingTiles/Building_Lower_Tile1.png');
    game.load.image('groundFloorB', 'assets/buildingTiles/Building_Lower_Tile2.png');
    game.load.image('groundFloorC', 'assets/buildingTiles/Building_Lower_Tile3.png');
    game.load.image('upperFloorA', 'assets/buildingTiles/Building_Upper_Tile1.png');
    game.load.image('upperFloorB', 'assets/buildingTiles/Building_Upper_Tile2.png');
    game.load.image('upperFloorC', 'assets/buildingTiles/Building_Upper_Tile3.png');
    game.load.image('upperFloorD', 'assets/buildingTiles/Building_Upper_Tile4.png');
    game.load.image('upperFloorE', 'assets/buildingTiles/Building_Upper_Tile5.png');
    game.load.json('level:1', 'data/level01.json');
    game.load.image('giant', 'assets/sprites/PlaceholderGiant.png');
    game.load.image('arrow', 'assets/sprites/PlaceholderArrow.png');
    game.load.spritesheet('townsfolk', 'assets/sprites/PlaceholderTownsfolkSheet.png', 10,10,4);

  },
  create: function(){
    // State create logic goes here
    var s = game.add.image(0, 0, 'background');

    var style = { font: "72px Arial", fill: "#00F", align: "center" };

    ledges = game.add.group()
    ledges.enableBody = true;

    this._loadLevel(game.cache.getJSON('level:1'));
    score = new Score(0,0);
    timer = new Timer(615,0, 120);

    //spawns the player
    player = new Player();

    //creates the delivery point group
    delivery_points = new DeliveryPointGroup
  },
  update: function() {
    // State Update Logic goes here.
    //Checks for if the player overlaps a taco delivery point
    //Calls DeliveryPointGroup#deliver if DeliveryPointGroup#should_deliver returns true
    game.physics.arcade.overlap(player.player,
                                delivery_points.customers,
                                delivery_points.deliver,
                                delivery_points.shouldDeliver,
                                delivery_points)
    var hitPlatform = game.physics.arcade.collide(player.player, ledges);
    player.update();

    this.checkTimer();
  },
  _loadLevel: function(data){
    data.platforms.forEach(this._spawnPlatform, this);
    new PlaceTile(0,552,'street');

  },
  _spawnPlatform: function(platform){
    ledge = ledges.create(platform.x, platform.y, platform.image);
    ledge.body.checkCollision.left = false;
    ledge.body.checkCollision.right = false;
    ledge.body.checkCollision.down = false;
    ledge.body.immovable = true;
  },
  checkTimer: function(){
    if ( parseInt(timer.timerCountdown) <= 0 ){
      game.state.start('gameOver');
    }
  }

}

/////// OVER ///////

var gameOver = {

  //create is a default phaser state function as is automatically called
  preload: function() {
    game.load.image('logo', 'assets/Tacologo.png');
    game.load.image('standardButton', 'assets/sprites/standardButton.png')
  },

  create: function() {
    game.add.image(150,50, 'logo');
    new StandardLabelButton(this.world.centerX, this.world.centerY + 200, "Restart Game", this.restartGame, this, 0, 0, 0 ,0);
  },

  restartGame: function () {
    game.state.start('play');
  }
};

window.onload = function () {
  game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  'game',
  menuState
  );
  game.state.add('play', playState);
  game.state.add('gameOver', gameOver)
};

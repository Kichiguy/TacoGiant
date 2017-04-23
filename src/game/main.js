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
    game.load.image('standardButton', 'assets/sprites/button.png')
  },

  create: function() {
    var logo = game.add.image(this.world.centerX - 30 , this.world.centerY - 100, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    var start_text = "Click To Begin!"
    new StandardLabelButton(this.world.centerX, this.world.centerY + 100, start_text, this.startGame, this, 0, 0, 0 ,0);
  },

  update: function() {

  },

  startGame: function() {
    game.state.start('play');
  }
};

/////// PLAY ///////

var game;
var player, townsfolk, customers;
var ledges;
var score;
var timer;
var background;

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
    game.load.spritesheet('thoughtBubble', 'assets/sprites/thoughtBubble.png',59,94,4);
    game.load.image('giant', 'assets/sprites/PlaceholderGiant.png');
    game.load.image('arrow', 'assets/sprites/PlaceholderArrow.png');
    game.load.spritesheet('townsfolk', 'assets/sprites/PlaceholderTownsfolkSheet.png', 10,40,4);
  },
  create: function(){
    // State create logic goes here
    background = game.add.tileSprite(0, 0, 2400, 600, 'background');
    game.world.setBounds(0, 0, 2400, 600);

    var style = { font: "72px Arial", fill: "#00F", align: "center" };

    ledges = game.add.group()
    ledges.enableBody = true;

    this._loadLevel(game.cache.getJSON('level:1'));
    score = new Score(0,0);
    timer = new Timer(615,0,12);
    menu = new PauseMenu(700, 50);

    //spawns the player
    player = new Player();
    game.camera.follow(player.player, Phaser.Camera.FOLLOW_PLATFORMER);


    //creates a townsfolk
    townsfolk = game.add.group();
    townsfolk.enableBody = true;
    Townsfolk.spawnTownsfolk(ledges.children, 20);

    //creates the delivery point group
    customers = game.add.group();
    customers.enableBody = true;
    Customers.spawnCustomer(customers, townsfolk);
  },
  update: function() {
    // State Update Logic goes here.
    
    var hitPlatform = game.physics.arcade.collide(player.player, ledges);
    game.physics.arcade.collide(townsfolk, ledges, Townsfolk.ledgeCollision);
    game.physics.arcade.collide(customers, ledges);
    game.physics.arcade.overlap(customers, player.player, Customers.deliverTaco);
    player.update();
    game.world.wrap(player.player, 0, true);
    this.checkTimer();
  },
  _loadLevel: function(data){
    data.platforms.forEach(this._spawnPlatform, this);

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
    game.load.image('standardButton', 'assets/sprites/button.png');
  },

  create: function() {
    //resets the world bounds so we can center stuff to the viewport
    game.world.setBounds(0, 0, 800, 600);
    var logo = game.add.image(this.world.centerX - 30, this.world.centerY - 100, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    new StandardLabelButton(this.world.centerX, this.world.centerY + 100, "Restart Game", this.restartGame, this, 0, 0, 0 ,0);
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

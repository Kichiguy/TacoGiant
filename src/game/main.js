/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

/////// MENU ///////

var button;
var crunch;

var menuState = {

  //create is a default phaser state function and is automatically called
  preload: function() {
    game.load.image('logo', 'assets/Tacologo.png');
    game.load.image('standardButton', 'assets/sprites/button.png');
    //sounds
    game.load.audio('crunch', 'assets/SFX/crunch.ogg')
  },

  create: function() {
    var logo = game.add.image(this.world.centerX - 30 , this.world.centerY - 100, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    crunch = game.add.audio('crunch');

    var start_text = "Click To Begin!"
    new StandardLabelButton(this.world.centerX, this.world.centerY + 100, start_text, this.startGame, this, 0, 0, 0 ,0);

    game.add.text(40, 400, 'Arrow keys to move!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 430, 'Up to jump!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 460, 'Down to fall through floors!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 510, 'Deliver tacos to the hungry gnomes to earn tips,', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 540, 'but don\'t bump into the ones who aren\'t hungry!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
  },

  update: function() {

  },

  startGame: function() {
    crunch.play();
    game.state.start('play');
  }
};

/////// PLAY ///////

var game;
var player, townsfolk, customers;
var ledges;
var score, finalScore;
var highScore = 0;
var timer;
var background;
var tacometer, tacoTruck;
var shakeIt = true; //earthquake on the first landing

//sticking the sound references here
var yumSound, ouchSound, earthQuakeSound;

var playState = {
  init: function() {
  },
  preload: function() {
    // State preload logic goes here

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //images
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
    game.load.spritesheet('thoughtBubble', 'assets/sprites/thoughtBubble.png',59,94,8);
    game.load.spritesheet('tacoIndicator', 'assets/sprites/tacoIndicator.png',70,86,16);
    game.load.spritesheet('tacoTruck', 'assets/sprites/tacotruck.png',50,80,2);
    game.load.spritesheet('giant', 'assets/sprites/Giant-Final.png',96,250,16);
    game.load.image('arrow', 'assets/sprites/PlaceholderArrow.png');
    //game.load.spritesheet('townsfolk', 'assets/sprites/PlaceholderTownsfolkSheet.png', 10,40,4);
    game.load.spritesheet('townsfolk', 'assets/sprites/peoples-final.png',50,80,21);
    game.load.image('tinyTaco', 'assets/sprites/tinyTaco.png');
    game.load.image('tinierTaco', 'assets/sprites/tinierTaco.png');

    //sounds
    Sound.loadAudio();

  },
  create: function(){
    // State create logic goes here
    background = game.add.tileSprite(0, 0, 2400, 600, 'background');
    game.world.setBounds(0, 0, 2400, 600);
    //add in the soundzz
    //this add all the sounds to the game yay
    Sound.addAudioToPlay();

    //set a default style I guess?
    var style = { font: "72px Arial", fill: "#00F", align: "center" };

    ledges = game.add.group()
    ledges.enableBody = true;
    ground = game.add.group()
    ground.enableBody = true;

    this._loadLevel();
    score = new Score(5,560);
    timer = new Timer(745,555,60);
    menu = new PauseMenu(400,560);
    tacoTruck = new TacoTruck();

    //spawns the player
    player = new Player();
    game.camera.follow(player.player, Phaser.Camera.FOLLOW_PLATFORMER);
    //creates a collison event signal for the player
    player.player.body.onCollide = new Phaser.Signal();
    //sets a callback for the player's collision event signal
    player.player.body.onCollide.add(groundShake, this);

    //creates a townsfolk
    townsfolk = game.add.group();
    townsfolk.enableBody = true;
    Townsfolk.spawnTownsfolk(ledges.children, 20);

    //creates the delivery point group
    customers = game.add.group();
    customers.enableBody = true;
    Customers.spawnCustomer(customers, townsfolk, 3);
    tacometer = new Tacometer(130, 25, 'tinyTaco')

    game.time.events.loop(Phaser.Timer.SECOND, Customers.getHungry, null, customers)
  },
  update: function() {
    // State Update Logic goes here.

    var hitPlatform = game.physics.arcade.collide(player.player, ledges,null,jumpDown);
    var hitFloor = game.physics.arcade.collide(player.player,ground);

    game.physics.arcade.collide(townsfolk, ledges, Townsfolk.ledgeCollision);
    game.physics.arcade.collide(townsfolk, ground, Townsfolk.checkLanding)
    game.physics.arcade.collide(customers, ledges);
    game.physics.arcade.collide(customers, ground)

    game.physics.arcade.overlap(tacoTruck, player.player, reloadTacos);
    game.physics.arcade.overlap(player.player ,customers, Customers.deliverTaco);
    game.physics.arcade.overlap(player.player, townsfolk, Townsfolk.bumpTownsfolk)

    Customers.checkOutOfBounds(customers);
    player.update();
    game.world.wrap(player.player, 0, true, true, false);
    townsfolk.forEach(Townsfolk.removeOutOfBounds, this)

    this.checkTimer();
  },
  _loadLevel: function(data){
    floor = ground.create(0,552,'street');
    floor.body.immovable = true;
    new GenerateGrid;
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
    new StandardLabelButton(this.world.centerX+10, this.world.centerY + 160, "Restart Game", this.restartGame, this, 0, 0, 0 ,0);
    var finalscorestyle = {font: "24px Arial", fill: "#ffffff", align: "left"};
    finalScore = score.tips;
    finalScoreDisplay = game.add.text(4*(game.world.centerX/5)-5, game.world.centerY+20, "FINAL TIPS: $" + finalScore, finalscorestyle);
    if(finalScore > highScore){
      highScore = finalScore;
    }
    highScoreDisplay = game.add.text(4*(game.world.centerX/5)-5, game.world.centerY+50, "HIGHEST TIPS: $" + highScore, finalscorestyle);
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

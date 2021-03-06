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
var volume = true;
var menuState = {

  //create is a default phaser state function and is automatically called
  preload: function() {
    game.load.image('background', 'assets/Nightscape_BG.png');
    game.load.image('logo', 'assets/Tacologo.png');
    game.load.image('noSlashSpeaker','assets/volumeOn.png');
    game.load.image('slashSpeaker','assets/volumeOff.png');
    game.load.image('credits','assets/UI Buttons/credits.png');
    game.load.image('beginGame','assets/UI Buttons/begingame.png');
    //sounds
    game.load.audio('crunch', 'assets/SFX/crunch.ogg')
    game.load.audio('title', 'assets/BGM/Intro_Loop_-_Diogo_Cadaval_-_S_Pra_Ver.ogg')
  },

  create: function() {
    background = game.add.tileSprite(0, 0, 2400, 600, 'background');
    var logo = game.add.image(this.world.centerX - 30 , this.world.centerY - 25, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    crunch = game.add.audio('crunch');
    var music = game.add.audio('title');
    music.play();
    var start_text = "Click To Begin!"
    Mute();
    game.sound.mute = false;
    game.add.text(40, 400, 'Arrow keys to move!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 430, 'Up to jump!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 460, 'Down to fall through floors!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 510, 'Deliver tacos to the hungry gnomes to earn tips,', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    game.add.text(40, 540, 'but don\'t bump into the ones who aren\'t hungry!', {font: "20px Arial", fill: "#ffbb33", align: "left"})
    var startButton = game.add.button(this.world.centerX + 115, this.world.centerY + 90, 'beginGame', this.startGame, this, 0, 0, 0 ,0);
    var creditsButton = game.add.button(30, 30, "credits", this.credits, this, 0, 0, 0 ,0);
  },

  update: function() {

  },

  startGame: function() {
    crunch.play();
    game.state.start('play');
  },
  credits: function() {
    game.state.start('credits');
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
    game.load.spritesheet('townsfolk', 'assets/sprites/peoples-final.png',50,80,21);
    game.load.image('tinyTaco', 'assets/sprites/tinyTaco.png');
    game.load.image('tinierTaco', 'assets/sprites/tinierTaco.png');
    game.load.image('noSlashSpeaker','assets/volumeOn.png');
    game.load.image('slashSpeaker','assets/volumeOff.png');
    game.load.image('resumeButton', 'assets/UI Buttons/resume.png');
    game.load.image('restartButton', 'assets/UI Buttons/restart.png');

    //sounds
    Sound.loadAudio();
    game.load.audio('main_theme', 'assets/BGM/Level_Diogo_Cadaval_-_S_Pra_Ver.ogg')

  },
  create: function(){
    // State create logic goes here
    background = game.add.tileSprite(0, 0, 2400, 600, 'background');
    game.world.setBounds(0, 0, 2400, 600);
    Mute();
    //add in the soundzz
    //this add all the sounds to the game yay
    Sound.addAudioToPlay();
    var music = game.sound.add('main_theme');
    music.play();
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
    game.load.image('noSlashSpeaker','assets/volumeOn.png');
    game.load.image('slashSpeaker','assets/volumeOff.png');
    game.load.image('button','assets/UI Buttons/restart.png');
  },

  create: function() {
    //resets the world bounds so we can center stuff to the viewport
    Mute();
    game.world.setBounds(0, 0, 800, 600);
    var logo = game.add.image(this.world.centerX - 30, this.world.centerY - 100, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    var restart = game.add.button(this.world.centerX - 90, this.world.centerY + 160, "button", this.restartGame, this, 0, 0, 0 ,0);
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

var credits = {
  preload: function() {
    game.load.image('returnButton','assets/UI Buttons/return.png');
    game.load.spritesheet('townsfolk', 'assets/sprites/peoples-final.png',50,80,21);
  },
  create: function() {
    game.world.setBounds(0,0,800,600);
    var style = {font: "21px Arial", fill: "#ffffff", align: "left" };
    var returnButton = game.add.button(this.world.centerX + 155, this.world.centerY + 155, "returnButton", this.return, this, 0, 0, 0 ,0);
    var Bobby = game.add.sprite(10,10,'townsfolk');
    Bobby.animations.add('hop',[3,4],4,true);
    Bobby.animations.play('hop');
    var bobbyText = game.add.text(60,55,"Bobby - Craft Services    @onlywinningmove",style);
    var Sarah = game.add.sprite(10,60,'townsfolk');
    Sarah.animations.add('hop',[6,7],4,true);
    Sarah.animations.play('hop');
    var sarahText = game.add.text(60,105,"Sarah - Chief Seismologist",style);
    var Ben = game.add.sprite(10,110,'townsfolk');
    Ben.animations.add('hop',[9,10],4,true);
    Ben.animations.play('hop');
    var BenText = game.add.text(60,155,"Ben - Taco Enthusiast",style);
    var Naomi = game.add.sprite(10,160,'townsfolk');
    Naomi.animations.add('hop',[12,13],4,true);
    Naomi.animations.play('hop');
    var NaomiText = game.add.text(60,205,"Naomi - Head Landscaper",style);
    var Ant = game.add.sprite(10,210,'townsfolk');
    Ant.animations.add('hop',[15,16],4,true);
    Ant.animations.play('hop');
    var AntText = game.add.text(60,255,"Ant - Pixel Pusher            antsama.tumblr.com",style);
    var soundCredits = game.add.text(10,490,"SFX - freesound.org \nDiogo Cadaval - Sa Pra Ver Sambar",style);
    var musicCredits = game.add.text(10,550,"BGM - freemusicarchive.org",style);
  },
  update: function() {

  },
  return: function() {
    game.state.start('menuState')
  }
}


window.onload = function () {
  game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  'game',
  menuState
  );
  game.state.add('menuState',menuState)
  game.state.add('credits',credits);
  game.state.add('play', playState);
  game.state.add('gameOver', gameOver);
};

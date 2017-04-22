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
    game.load.image('logo', 'assets/Tacologo.svg');
    game.load.image('arrow', 'assets/sprites/PlaceholderArrow.png');
  },

  create: function() {
    var logo = game.add.image(150,50, 'logo');
    var arrow = game.add.image(200,450,'arrow')
    arrow.angle = -90
    logo.scale.setTo(3.5,3.5);
    var start_text = "Click To Begin!"
    var style = { font: "72px Helvetica", fill: "#fff", align: "center" };
    game.add.text(this.world.centerX - 100, 400, start_text, style);
    bmd = game.make.bitmapData();
    game.add.button(0,0, bmd, this.startGame, this);
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
    game.load.image('taco', 'assets/taco.png');
    game.load.image('giant', 'assets/sprites/PlaceholderGiant.png');
    game.load.image('background', 'assets/sprites/PlaceholderBackground.png');
    game.load.image('platform1', 'assets/sprites/PlaceholderPlatform.png');
    game.load.json('level:1', 'data/level01.json');
    game.load.image('arrow', 'assets/sprites/PlaceholderArrow.png');
  },
  create: function(){
    // State create logic goes here
    var s = game.add.image(200, 50, 'taco');

    var title = "Taco Giant";
    var style = { font: "72px Arial", fill: "#00F", align: "center" };
    var t = game.add.text(this.world.centerX, this.world.centerY, title, style);
    t.anchor.setTo(0.5, 0.3);

    //spawns the player
    player = new Player();

    ledges = game.add.group()
    ledges.enableBody = true;

    this._loadLevel(game.cache.getJSON('level:1'));
    score = new Score(0,0);
    timer = new Timer(615,0, game);

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
    score.update();
    timer.update();
  },
  _loadLevel: function(data){
    data.platforms.forEach(this._spawnPlatform, this);

  },
  _spawnPlatform: function(platform){
    ledge = ledges.create(platform.x, platform.y, platform.image);
    ledge.body.immovable = true;
  }
}

/////// OVER ///////

var gameOver = {

  //create is a default phaser state function as is automatically called
  create: function() {

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
};

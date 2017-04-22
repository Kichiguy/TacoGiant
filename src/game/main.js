/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var player;
var score;
var timer;

var state = {
  init: function() {
  },
  preload: function() {
    // State preload logic goes here
    game.load.image('taco', 'assets/taco.png');
    game.load.image('giant', 'assets/sprites/PlaceholderGiant.png');
  },
  create: function(){
  // State create logic goes here
    var s = game.add.image(200, 50, 'taco');

    var title = "Taco Giant";
    var style = { font: "72px Arial", fill: "#00F", align: "center" };
    var t = game.add.text(this.world.centerX, this.world.centerY, title, style);
    t.anchor.setTo(0.5, 0.3);

    player = new Player();
    score = new Score(0,0);
    timer = new Timer(600,0);
  },
  update: function() {
    // State Update Logic goes here.
    player.update();
    score.update();
    timer.update();
  }
};

var game = new Phaser.Game(
  800,
  480,
  Phaser.AUTO,
  'game',
  state
);

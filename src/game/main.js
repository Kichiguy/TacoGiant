
/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var player;

var state = {
  init: function() {
  },
  preload: function() {
    // State preload logic goes here
    game.load.image('taco', 'assets/taco.png');
    game.load.image('giant', 'assets/sprites/PlaceholderGiant.png');
    game.load.image('background', 'assets/sprites/PlaceholderBackground.png');
    game.load.image('platform', 'assets/sprites/PlaceholderPlatform.png');
    game.load.json('level:1', 'data/level01.json');
  },
  create: function(){
  // State create logic goes here
    var s = game.add.image(200, 50, 'taco');

    var title = "Taco Giant";
    var style = { font: "72px Arial", fill: "#00F", align: "center" };
    var t = game.add.text(this.world.centerX, this.world.centerY, title, style);
    t.anchor.setTo(0.5, 0.3);

    player = new Player();

    _loadLevel(this.game.cache.getJSON('level:1'));
  },
  update: function() {
    // State Update Logic goes here.
    player.update();
  },
  _loadLevel: function(data){
    data.platforms.forEach(this._spawnPlatform, this);
  },
  _spawnPlatform: function(platform){
    game.add.sprite(platform.x, platform.y, platform.image);
  }
};

window.onload = function () {
    let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
    game.state.add('play', state);
    game.state.start('play');
};


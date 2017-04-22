/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

/////// MENU ///////

var menuState = {

  //create is a default phaser state function as is automatically called
  preload: function() {

  },

  create: function() {

  },

  update: function() {
      
  }
}

/////// PLAY ///////

var game;
var player, delivery_points;

var playState = {
  init: function() {
  },
  preload: function() {
    // State preload logic goes here
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

    //creates the delivery point group
    delivery_points = new DeliveryPointGroup

    this._loadLevel(game.cache.getJSON('level:1'));
  },
  update: function() {
    // State Update Logic goes here.
    player.update();
    //Checks for if the player overlaps a taco delivery point
    //Calls DeliveryPointGroup#deliver if DeliveryPointGroup#should_deliver returns true
    game.physics.arcade.overlap(player.player, 
                                delivery_points.points, 
                                delivery_points.deliver, 
                                null, 
                                this)
  },
  _loadLevel: function(data){
    data.platforms.forEach(this._spawnPlatform, this);
  },
  _spawnPlatform: function(platform){
    game.add.sprite(platform.x, platform.y, platform.image);
  }
}

/////// OVER ///////

var gameOver = {

  //create is a default phaser state function as is automatically called
  create: function() {

  }
}

window.onload = function () {
  game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  'game'
);
game.state.add('play', playState);
game.state.start('play');
};


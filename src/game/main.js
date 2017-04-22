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
    create: function() {

    }
}

/////// PLAY ///////

var playState = {

    init: function() {
        // Delete this init block or replace with your own logic.

        // Create simple text display for current Phaser version
        // var text = "Phaser Version "+Phaser.VERSION + " works!";
        // var style = { font: "24px Arial", fill: "#fff", align: "center" };
        // var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        // t.anchor.setTo(0.5, 0.5);

    },
    preload: function() {
        // State preload logic goes here
        game.load.image('taco', 'assets/taco.png');
    },
    create: function(){
        // State create logic goes here
        var s = game.add.image(200, 50, 'taco');
        
        var title = "Taco Giant";
        var style = { font: "72px Arial", fill: "#00F", align: "center" };
        var t = game.add.text(this.world.centerX, this.world.centerY, title, style);
        t.anchor.setTo(0.5, 0.3);
    },
    update: function() {
        // State Update Logic goes here.
    }
}

/////// OVER ///////

var gameOver = {

    //create is a default phaser state function as is automatically called
    create: function() {

    }
}

var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    state
);
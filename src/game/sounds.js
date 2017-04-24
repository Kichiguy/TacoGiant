///sound variables

var car_horns;
var giant_noises;
var impacts;
var knock_downs;
var successful_deliveries;
var taco_pickups;


var Sound = {
  //function to load audio into the game because wee-oo there's a lot
  loadAudio: function(){
    //car_horn
    game.load.audio('beep1', 'assets/SFX/car_horn/1_beep.ogg');
    game.load.audio('beep2', 'assets/SFX/car_horn/2_beep.ogg');

    game.load.audio('hup_1', 'assets/SFX/giant_noises/hup_1.ogg');
    game.load.audio('hup_2', 'assets/SFX/giant_noises/hup_2.ogg');
    game.load.audio('hup_3', 'assets/SFX/giant_noises/hup_3.ogg');
    game.load.audio('ugh_1', 'assets/SFX/giant_noises/ugh_1.ogg');

    game.load.audio('thud_1', 'assets/SFX/impacts/thud_1.ogg');
    game.load.audio('thud_2', 'assets/SFX/impacts/thud_2.ogg');
    game.load.audio('thud_3', 'assets/SFX/impacts/thud_3.ogg');
    
    game.load.audio('huh_1', 'assets/SFX/knock_down/huh_1.ogg');
    game.load.audio('huh_2', 'assets/SFX/knock_down/huh_2.ogg');
    game.load.audio('oof', 'assets/SFX/knock_down/oof.ogg');
    game.load.audio('oof_2', 'assets/SFX/knock_down/oof_2.ogg');
    game.load.audio('oof_3', 'assets/SFX/knock_down/oof_3.ogg');
    
    game.load.audio('hello', 'assets/SFX/successful_delivery/hello.ogg');
    game.load.audio('ooOoo', 'assets/SFX/successful_delivery/ooOoo.ogg');
    game.load.audio('woohoo', 'assets/SFX/successful_delivery/woohoo.ogg');
    game.load.audio('yay_1', 'assets/SFX/successful_delivery/yay_1.ogg');

    game.load.audio('bell_1', 'assets/SFX/taco_pickup/bell_1.ogg');
    game.load.audio('bell_2', 'assets/SFX/taco_pickup/bell_2.ogg');
    game.load.audio('bell_3', 'assets/SFX/taco_pickup/bell_3.ogg');


  },
  addAudioToPlay: function(){

    car_horn = [game.add.audio('beep1'), 
                game.add.audio('beep2')];

    giant_noises = [game.add.audio('hup_1'),
                    game.add.audio('hup_2'),
                    game.add.audio('hup_3'),
                    game.add.audio('ugh_1')];

    impacts = [game.add.audio('thud_1'),
               game.add.audio('thud_2'),
               game.add.audio('thud_3')];

    knock_downs = [game.add.audio('huh_1'),
                   game.add.audio('huh_2'),
                   game.add.audio('oof'),
                   game.add.audio('oof_2'),
                   game.add.audio('oof_3')];

    successful_deliveries = [game.add.audio('hello'),
                             game.add.audio('ooOoo'),
                             game.add.audio('woohoo'),
                             game.add.audio('yay_1')];

    taco_pickups = [game.add.audio('bell_1'),
                    game.add.audio('bell_2'),
                    game.add.audio('bell_3')];

  }


}

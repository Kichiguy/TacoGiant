///sound variables

// car_horn
var beep1, beep2;


var Sound = {
  //function to load audio into the game because wee-oo there's a lot
  loadAudio: function(){
    //car_horn
    game.load.audio('beep1', 'assets/SFX/car_horn/1_beep.ogg');
    game.load.audio('beep2', 'assets/SFX/car_horn/2_beep.ogg');


  },
  addAudioToPlay: function(){
    //car horn
    game.add.audio('beep1');
    game.add.audio('beep2');

  }


}

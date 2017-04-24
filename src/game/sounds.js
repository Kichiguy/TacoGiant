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
  addAudioToPlay: function(category){
    game.add.audio(chooseAudio(category));

  },
  chooseAudio: function(category){
    if(category = 'car_horn'){
      return car_horns.[Math.floor(Math.random() * car_horns.length)];
    }
    if(category = 'giant_noise'){
      return giant_noises.[Math.floor(Math.random() * giant_noises.length)];
    }
    if(category = 'impact'){
      return impacts.[Math.floor(Math.random() * impacts.length)];
    }
    if(category = 'knock_down'){
      return knock_downs.[Math.floor(Math.random() * knock_downs.length)];
    }
    if(category = 'successful_delivery'){
      return successful_deliveries.[Math.floor(Math.random() * successful_deliveries.length)];
    }
    if(category = 'taco_pickup'){
      return taco_pickups.[Math.floor(Math.random() * taco_pickups.length)];
    }
  }
}

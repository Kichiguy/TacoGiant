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
    game.load.audio('beep2', 'assets/SFX/car_horn/2_beeps.ogg');

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

    car_horns = ['beep1', 
                'beep2'];

    giant_noises = ['hup_1',
                    'hup_2',
                    'hup_3',
                    'ugh_1'];

    impacts = ['thud_1',
               'thud_2',
               'thud_3'];

    knock_downs = ['huh_1',
                   'huh_2',
                   'oof',
                   'oof_2',
                   'oof_3'];

    successful_deliveries = ['hello',
                             'ooOoo',
                             'woohoo',
                             'yay_1'];

    taco_pickups = ['bell_1',
                    'bell_2',
                    'bell_3'];
  },

  chooseAudio: function(category){
    if(category == 'car_horn'){
      return car_horns[Math.floor(Math.random() * car_horns.length)];
    }
    if(category == 'giant_noise'){
      return giant_noises[Math.floor(Math.random() * giant_noises.length)];
    }
    if(category == 'impact'){
      return impacts[Math.floor(Math.random() * impacts.length)];
    }
    if(category == 'knock_down'){
      return knock_downs[Math.floor(Math.random() * knock_downs.length)];
    }
    if(category == 'successful_delivery'){
      var wat =  successful_deliveries[Math.floor(Math.random() * successful_deliveries.length)];
      return wat
    }
    if(category == 'taco_pickup'){
      return taco_pickups[Math.floor(Math.random() * taco_pickups.length)];
    }
  },

  AddandPlay: function(category){
    var current_sound = this.chooseAudio(category);
    var sound_object = game.add.audio(current_sound);
    sound_object.play();
    //sound_object.onStop.add(this.removeMusic,this);
  },

  // removeMusic: function(sound_effect) {
  //   var soundName = sound_effect.name;
  //   sound_effect.destroy();
  // }
}

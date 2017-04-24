var Townsfolk = {
  bumpTownsfolk: function(giant, townsperson){
    if(townsperson.bumped){return}
    
    var direction = ((giant.x + 48 - townsperson.x) / (Math.abs(giant.x + 48 - townsperson.x))) || 1
    //flash red
    townsperson.body.velocity.x = -100 * direction
    townsperson.body.velocity.y = -90
    townsperson.bumped = true;
    score.propertyDamage(.25);
  },
  checkLanding: function(townsperson){
    if(!townsperson.bumped){return}
    townsperson.body.velocity.x = 0;
    townsperson.bumped = false;
    game.time.events.add(Phaser.Timer.SECOND * 2, Townsfolk.setSpeed, this, townsperson)
  },

  //Fires on collision with a ledge. Right now just turns townsperson around if they would
  //fall off
  ledgeCollision: function(townsperson, ledge){
    if(townsperson.body.y < ledge.y){
      Townsfolk.checkLanding(townsperson);
    }
    
    //again, 10 is the width of our gnome sprite
    if (townsperson.body.y < ledge.y &&
      (townsperson.body.x < ledge.x || townsperson.body.x + 10 > ledge.x + ledge.width)){
      Townsfolk.turnAround(townsperson);
    }
  },
  randomSpeed: function(){
    return Townsfolk.speeds[Math.floor(Math.random()*3)]
  },
  removeOutOfBounds: function(townsperson){
    if(townsperson.x < -10 || townsperson.x > game.world.width){
      townsperson.destroy();
      Townsfolk.spawnTownsfolk(ledges.children, 1);
    }
  },
  setSpeed: function(townsperson){  
    if(townsperson.bumped || townsperson.customer){return}
    townsperson.body.velocity.x = Townsfolk.randomSpeed() * (Math.random < .5 ? -1 : 1)
  },
  spawnDetails: function(spawnPoint){
    return {
            x: game.rnd.integerInRange(spawnPoint.x, spawnPoint.x + spawnPoint.width - 10), //10 is the width of our gnome sprite
            y: ((Math.random() < .33) ? spawnPoint.y - 40 : game.height - 85), //40 is the height of our townsperson sprite       sprite: 'townsfolk'
            sprite: 'townsfolk'
    }
  },
  spawnTownsfolk: function(spawn_areas, num_to_spawn){
    for(var i = 0; i < num_to_spawn; i++){
      var n = Math.floor(Math.random() * spawn_areas.length)
      var spawnPoint = spawn_areas[n]
      var spawnDetails = Townsfolk.spawnDetails(spawnPoint)
      //this is to ensure that townsfolk are spawned a descrete distance from the giant
      var distanceToGiantSquared = Math.pow(spawnDetails.x - player.player.x - player.player.width/2,2) +
                                   Math.pow(spawnDetails.y - player.player.y - player.player.height/2,2) 
      while(distanceToGiantSquared < 15000){
        var spawnDetails = Townsfolk.spawnDetails(spawnPoint);
        var distanceToGiantSquared = Math.pow(spawnDetails.x - player.player.x - player.player.width/2,2) +
                                     Math.pow(spawnDetails.y - player.player.y - player.player.height/2,2) 
      } 


      var townsperson = townsfolk.create(spawnDetails.x, spawnDetails.y, spawnDetails.sprite)
      townsperson.body.gravity.y = 150;
      Townsfolk.setSpeed(townsperson)

      townsperson.animations.add('walk')
      townsperson.play('walk', 4 , true)
    }
  },
  speeds: [0,25,50],
  turnAround: function(townsperson){
    townsperson.body.velocity.x *= -1
  }
}
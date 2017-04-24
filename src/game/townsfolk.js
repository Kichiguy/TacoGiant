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
    game.time.events.add(Phaser.Timer.SECOND * 2, Townsfolk.randomSpeed, this, townsperson)
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
  randomSpeed: function(townsperson){
    if(townsperson.bumped || townsperson.customer){return}
    var speed = [0, 100, 200][Math.floor(Math.random() * 3)]
    townsperson.body.velocity.x = speed * (Math.random() < .5 ? -1 : 1);
  },

  spawnTownsfolk: function(spawn_areas, num_to_spawn){
    for(var i = 0; i < num_to_spawn; i++){
      var spawn_point = spawn_areas[Math.floor(Math.random() * spawn_areas.length)]
      var spawn_details = {x: game.rnd.integerInRange(spawn_point.x, spawn_point.x + spawn_point.width - 10), //10 is the width of our gnome sprite
                           y: ((Math.random() < .33) ? spawn_point.y - 40 : game.height - 85), //40 is the height of our townsperson sprite
                           sprite: 'townsfolk',
                           speed: [0, 100, 200][Math.floor(Math.random() * 3)]}
      var townsperson = townsfolk.create(spawn_details.x, spawn_details.y, spawn_details.sprite)
      townsperson.body.gravity.y = 150;
      townsperson.body.velocity.x = spawn_details.speed * (Math.random() < .5 ? -1 : 1);

      townsperson.animations.add('walk')
      townsperson.play('walk', 4 , true)
    }
  },

  turnAround: function(townsperson){
    townsperson.body.velocity.x *= -1
  }
}
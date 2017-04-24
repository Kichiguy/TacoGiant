var Townsfolk = {
  bumpTownsfolk: function(giant, townsperson){
    if(townsperson.bumped){return}

    var direction = ((giant.x + 48 - townsperson.x) / (Math.abs(giant.x + 48 - townsperson.x))) || 1
    townsperson.animations.play('bumped');
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

    //again, 50 is the width of our gnome sprite
    if (townsperson.body.y < ledge.y &&
      (townsperson.body.x < ledge.x || townsperson.body.x + 50 > ledge.x + ledge.width)){
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
      var spawn_details = {x: game.rnd.integerInRange(spawn_point.x, spawn_point.x + spawn_point.width - 50), //50 is the width of our gnome sprite
                           y: ((Math.random() < .33) ? spawn_point.y - 80 : game.height - 125), //80 is the height of our townsperson sprite
                           sprite: 'townsfolk',
                           speed: [0, 100, 200][Math.floor(Math.random() * 3)]}
      var townsperson = townfolkSprites(spawn_details.x, spawn_details.y);
      townsfolk.add(townsperson);
      townsperson.body.gravity.y = 150;
      townsperson.body.velocity.x = spawn_details.speed * (Math.random() < .5 ? -1 : 1);

      townsperson.play('walk')
    }
  },

  turnAround: function(townsperson){
    townsperson.body.velocity.x *= -1
  }
}

  var townfolkSprites = function(x,y){
    //this function returns a random sprite from the people-final spritesheet
    var number = Math.floor(Math.random() * (6)) + 1;
    var thisSprite = game.add.sprite(x,y,'townsfolk');
    game.physics.arcade.enable(thisSprite);
    switch (number) {
      case (1):
        thisSprite.animations.add('walk',[0,1],4,true);
        thisSprite.animations.add('bump',[2],4,true);
        break;
      case (2):
        thisSprite.animations.add('walk',[3,4],4,true);
        thisSprite.animations.add('bump',[5],4,true);
        break;
      case (3):
        thisSprite.animations.add('walk',[6,7],4,true);
        thisSprite.animations.add('bump',[8],4,true);
        break;
      case (4):
        thisSprite.animations.add('walk',[9,10],4,true);
        thisSprite.animations.add('bump',[11],4,true);
        break;
      case (5):
        thisSprite.animations.add('walk',[12,13],4,true);
        thisSprite.animations.add('bump',[14],4,true);
        break;
      case (6):
        thisSprite.animations.add('walk',[15,16],4,true);
        thisSprite.animations.add('bump',[17],4,true);
        break;
      case (7):
        thisSprite.animations.add('walk',[18,19],4,true);
        thisSprite.animations.add('bump',[20],4,true);
        break;
      default:
        thisSprite.animations.add('walk',[18,19],4,true);
        thisSprite.animations.add('bump',[20],4,true);
        break;
    }
    return thisSprite;
  }

var Customers = {
  checkOutOfBounds: function(customerGroup){
    for(var i = 0; i < customerGroup.children.length; i++){
      var customer = customerGroup.children[i]
      var customer_thoughts = customer.thoughts
      
      if(customer_thoughts.x + customer_thoughts.width > game.camera.x + game.camera.width || 
         customer_thoughts.x < game.camera.x){
        //if the thought bubble that indicates a customer is hungry is not on screen
        if(customer.offscreenIndicator === undefined){
          //and if there isn't already an indicator of customer off screen
          var distance = customer.body.x - player.player.body.x
          var x_coordinate = ((Math.abs(distance) < game.world.width / 2 && distance > 0) ||
                              (Math.abs(distance) > game.world.width / 2 && distance < 0)) ? game.camera.width - 50 : 0
          customer.offscreenIndicator = game.add.sprite(x_coordinate, customer.body.y, 'arrow')
          customer.offscreenIndicator.fixedToCamera = true;
        }
      } else{
        //the thought bubble is on screen
        if(customer.offscreenIndicator !== undefined){
          //there is an indicator to remove
          customer.offscreenIndicator.kill();
          customer.offscreenIndicator = undefined;
        }
      }
    }
  },
  deliverTaco: function(giant, customer){
    score.deliverTaco(customer.tips);
    timer.addTime(5);
    customer.thoughts.kill();
    customer.kill();
    customer.parent.remove(customer);
    Townsfolk.spawnTownsfolk(ledges.children, 1);
    Customers.spawnCustomer(customers,townsfolk);
  },
  spawnCustomer: function(customerGroup, townsfolkGroup){
    var townsperson = townsfolkGroup.getRandom();
    customerGroup.add(townsperson);

    townsperson.delivered_to = false;
    townsperson.tips = 100;
    townsperson.body.velocity.x = 0;

    var indicator = game.add.sprite(townsperson.body.x + townsperson.body.width,
                                    townsperson.body.y - 94, 'thoughtBubble')
    
    townsperson.thoughts = indicator;
    townsperson.thoughts.animations.add('blink')
    townsperson.thoughts.play('blink',4, true)
    }


}

// function DeliveryPointGroup(){
//   this.customers = game.add.group();
//   this.customers.enableBody = true;
//   this.spawn_locations = ledges.children.map(function(ledge){
//     return {x: ledge.x, y: ledge.y, width: ledge.width}
//     });
//   this.spawn(1);
// }

// DeliveryPointGroup.prototype.spawn = function(num_to_spawn){
//   this.randomizeSpawnLocations();
//   //num_to_spawn defaults to 1 if no argument passed
//   num_to_spawn = typeof num_to_spawn != undefined ? num_to_spawn : 1

//   for (var i = 0; i < num_to_spawn; i++){
//     var spawn_place = this.spawn_locations.pop()
//     var random_x = game.rnd.integerInRange(spawn_place.x, spawn_place.width + spawn_place.x)
//     var customer = this.customers.create(random_x, spawn_place.y - 100, 'arrow');
//     customer.delivered_to = false;
//     customer.tips = 100;
//     customer.location = spawn_place;
//   }
// }

// DeliveryPointGroup.prototype.shouldDeliver = function(player, customer){
//   return !customer.delivered_to
// }

// DeliveryPointGroup.prototype.deliver = function(player, customer){
//   console.log("DELIVERED!");
//   customer.delivered_to = true;
//   score.deliverTaco(customer.tips);
//   this.spawn_locations.push(customer.location)
//   customer.kill();
//   this.spawn(1);
// }

// DeliveryPointGroup.prototype.randomizeSpawnLocations = function(){
//   var j, x, i;
//     for (i = this.spawn_locations.length; i; i--) {
//         j = Math.floor(Math.random() * i);
//         x = this.spawn_locations[i - 1];
//         this.spawn_locations[i - 1] = this.spawn_locations[j];
//         this.spawn_locations[j] = x;
//     }
// }
// //need to keep a list of places to spawn
// //cross them off the spawn list when a customer is spawned there
// //add them back on when that customer is delivered to, after spawning a new one

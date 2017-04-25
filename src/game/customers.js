var Customers = {
  checkOutOfBounds: function(customerGroup){
    for(var i = 0; i < customerGroup.children.length; i++){
      var customer = customerGroup.children[i]
      var customer_thoughts = customer.thoughts.bubble

      if(customer_thoughts.x + customer_thoughts.width > game.camera.x + game.camera.width ||
         customer_thoughts.x < game.camera.x){
        //if the thought bubble that indicates a customer is hungry is not on screen
        if(customer.offscreenIndicator === undefined){
          //and if there isn't already an indicator of customer off screen, make one
          var distance = customer.body.x - player.player.body.x
          var x_coordinate = ((Math.abs(distance) < game.world.width / 2 && distance > 0) ||
                              (Math.abs(distance) > game.world.width / 2 && distance < 0)) ? game.camera.width - 80 : 0
          customer.offscreenIndicator = new TacoIndicator(x_coordinate, customer.y - 50)
          customer.offscreenIndicator.indicator.fixedToCamera = true;
          if(x_coordinate === 0){
            customer.stomach <= 5 ? customer.offscreenIndicator.pointLeftUrgent() : customer.offscreenIndicator.pointLeft()
          }else {
            customer.stomach <= 5 ? customer.offscreenIndicator.pointRightUrgent() : customer.offscreenIndicator.pointRight()
          }
        } else {
          //otherwise, make sure the indicator is on the correct side of the screen
          var distance = customer.body.x - player.player.body.x
          var x_coordinate = ((Math.abs(distance) < game.world.width / 2 && distance > 0) ||
                              (Math.abs(distance) > game.world.width / 2 && distance < 0)) ? game.camera.width - 80 : 0
          if(x_coordinate === 0){
            customer.stomach <= 5 ? customer.offscreenIndicator.pointLeftUrgent() : customer.offscreenIndicator.pointLeft()
          }else {
            customer.stomach <= 5 ? customer.offscreenIndicator.pointRightUrgent() : customer.offscreenIndicator.pointRight()
          }
          customer.offscreenIndicator.indicator.cameraOffset.x = x_coordinate
        }
      } else{
        //the thought bubble is on screen
        if(customer.offscreenIndicator !== undefined){
          //there is an indicator to remove
          customer.offscreenIndicator.indicator.kill();
          customer.offscreenIndicator = undefined;
        }
      }
    }
  },
  deliverTaco: function(giant, customer){
    if (tacometer.tacoCount > 0){
    score.deliverTaco(customer.tips);
    tacometer.loseATaco();
    Sound.AddandPlay('successful_delivery');
    timer.addTime(2);
    Customers.removeCustomer(customer);
    } else {
      console.log(":(");
    }
  },
  getHungry: function(customers){
    for(var i =0; i<customers.children.length;i++){
      customer = customers.children[i]
      customer.stomach -= 1
      if(customer.stomach === 5){
        customer.thoughts.urgent();
      }

      if(customer.stomach <= 0){
        Customers.removeCustomer(customer);
      }
    }

  },
  removeCustomer: function(customer){
    if(customer.thoughts != undefined){
      customer.thoughts.kill();
      customer.thoughts = undefined;
    }
    if(customer.offscreenIndicator != undefined){
      customer.offscreenIndicator.indicator.kill()
      customer.offscreenIndicator = undefined
    }
    customer.destroy();
    Townsfolk.spawnTownsfolk(ledges.children, 30 - townsfolk.length);
    if(customers.children.length <= 1){
      Customers.spawnCustomer(customers, townsfolk, 3 - customers.children.length)
    }
  },
  spawnCustomer: function(customerGroup, townsfolkGroup, numToSpawn){
    for(var i=0; i< numToSpawn; i++){

      var townsperson = townsfolkGroup.getRandom();
      townsfolkGroup.remove(townsperson);
      customerGroup.add(townsperson);

      townsperson.customer = true;
      townsperson.delivered_to = false;
      townsperson.tips = 1.50;
      townsperson.body.velocity.x = 0;

      townsperson.thoughts = new TacoBubble(townsperson.body.x + townsperson.body.width - 25,
                                            townsperson.body.y -54)
      townsperson.thoughts.normal(),

      townsperson.stomach = game.rnd.integerInRange(10, 15);
    }
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

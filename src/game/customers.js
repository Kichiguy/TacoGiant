var Customers = {
  spawnCustomer: function(customerGroup, townsfolkGroup){
    var townsperson = townsfolkGroup.getRandom();
    customerGroup.add(townsperson);

    townsperson.delivered_to = false;
    townsperson.tips = 100;
    townsperson.body.velocity.x = 0;

    var indicator = game.add.sprite(townsperson.body.x + townsperson.body.width,
                                    townsperson.body.y, 'arrow')
    
    townsperson.thoughts = indicator;
    },

  deliverTaco: function(giant, customer){
    score.deliverTaco(customer.tips);
    customer.thoughts.kill();
    customer.kill();
    Townsfolk.spawnTownsfolk(ledges.children, 1);
    Customers.spawnCustomer(customers,townsfolk);
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
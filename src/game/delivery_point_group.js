function DeliveryPointGroup(){
  this.customers = game.add.group();
  this.customers.enableBody = true;
  this.spawn_locations = ledges.children.map(function(ledge){
    return {x: ledge.x, y: ledge.y, width: ledge.width}
    });
  this.randomizeSpawnLocations();
  this.spawn(1);
}

DeliveryPointGroup.prototype.spawn = function(num_to_spawn){
  //num_to_spawn defaults to 1 if no argument passed
  num_to_spawn = typeof num_to_spawn != undefined ? num_to_spawn : 1

  for (var i = 0; i < num_to_spawn; i++){
    var spawn_place = this.spawn_locations.pop()
    var random_x = game.rnd.integerInRange(spawn_place.x, spawn_place.width + spawn_place.x)
    var customer = this.customers.create(random_x, spawn_place.y - 100, 'arrow');
    customer.delivered_to = false;
    customer.tips = 100;
  }
}

DeliveryPointGroup.prototype.shouldDeliver = function(player, customer){
  return !customer.delivered_to
}

DeliveryPointGroup.prototype.deliver = function(player, customer){
  console.log("DELIVERED!");
  customer.delivered_to = true;
  score.deliverTaco(customer.tips);
  customer.kill();
  delivery_points.spawn(1);
}

DeliveryPointGroup.prototype.randomizeSpawnLocations = function(){
  var j, x, i;
    for (i = this.spawn_locations.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = this.spawn_locations[i - 1];
        this.spawn_locations[i - 1] = this.spawn_locations[j];
        this.spawn_locations[j] = x;
    }
}
//need to keep a list of places to spawn
//cross them off the spawn list when a customer is spawned there
//add them back on when that customer is delivered to, after spawning a new one
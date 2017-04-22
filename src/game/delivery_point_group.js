function DeliveryPointGroup(){
  this.customers = game.add.group();
  this.customers.enableBody = true;
  this.spawn(1)
}

DeliveryPointGroup.prototype.spawn = function(num_to_spawn){
  //num_to_spawn defaults to 1 if no argument passed
  num_to_spawn = typeof num_to_spawn != undefined ? num_to_spawn : 1

  for (var i = 0; i < num_to_spawn; i++){

    var random_x = game.rnd.integerInRange(50, game.width -50)
    var customer = this.customers.create(random_x, game.height - 100, 'arrow');
    customer.delivered_to = false;
    customer.tips = 100;
  }
}

DeliveryPointGroup.prototype.should_deliver = function(player, customer){
  return !customer.delivered_to
}

DeliveryPointGroup.prototype.deliver = function(player, customer){
  console.log("DELIVERED!");
  customer.delivered_to = true;
  //payout tips
  customer.kill();
}
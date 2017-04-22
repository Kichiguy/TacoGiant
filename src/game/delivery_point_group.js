function DeliveryPointGroup(){
  this.points = game.add.group();
  this.points.enableBody = true;
  this.spawn(1)
}

DeliveryPointGroup.prototype.spawn = function(num_to_spawn){
  //num_to_spawn defaults to 1 if no argument passed
  num_to_spawn = typeof num_to_spawn != undefined ? num_to_spawn : 1

  var point = this.points.create(100, 500, 'arrow');
}

DeliveryPointGroup.prototype.should_deliver = function(){
  console.log("SHJOULD")
}
DeliveryPointGroup.prototype.deliver = function(){
  console.log("DELIVER")
}
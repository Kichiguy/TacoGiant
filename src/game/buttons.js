var StandardLabelButton = function(x, y, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame){    
  Phaser.Button.call(this, game, x, y, 'standardButton', callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
  this.style = { font: "42px Helvetica", fill: "#fff" };
  this.anchor.setTo(0.5, 0.5 );
  this.label = new Phaser.Text(game, 0, 0, label, this.style); 
  //puts the label in the center of the button
  this.label.anchor.setTo( 0.5, 0.5 );
  this.addChild(this.label);
  this.setLabel(label);
  //adds button to game    
  game.add.existing(this);
};

StandardLabelButton.prototype = Object.create(Phaser.Button.prototype);
StandardLabelButton.prototype.constructor = StandardLabelButton;
StandardLabelButton.prototype.setLabel = function(label) {
  this.label.setText(label);
};
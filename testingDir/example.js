function Cat () {
  this.eats = null;
}

Cat.prototype.meow = function() {
  return 'meow';
}

Cat.prototype.purr = function() {
  return 'purr';
}

Cat.prototype.eat = function(food) {
  this.eats = food;
}

module.exports = Cat;

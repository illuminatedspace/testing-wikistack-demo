// const assert = require('assert');
// const chai = require('chai');
// const expect = chai.expect;
const expect = require('chai').expect;
const Cat = require('../example');

let cat = new Cat;

describe('The cat', function () {

  describe('can make sounds', function () {
    it('meow', function () {
      // assert.equal(cat.meow(), 'meow');
      expect(cat.meow()).to.equal('meow');
    })
    it('purr', function () {
      // assert.equal(cat.purr(), 'purr');
      expect(cat.purr()).to.equal('purr');
    })
  });

  describe('eats', function () {
    it('mice', function () {
      cat.eat('dog');
      // assert.equal(cat.eats, 'mice');
      expect(cat.eats, "Cats don't eat dogs!").to.equal('mice');
    })
  });

});

const expect = require('chai').expect;
const example = require('./example');
const addToFront = example.addToFront;
const addToEnd = example.addToEnd;


describe('example.js', function () {
  // defined *outside* the beforeEach
  let arr;

  beforeEach(function () {
    arr = [1, 2, 3];
  });

  describe('addToFront', function () {
    it('adds to the front of an array', function () { 
      addToFront(arr, 0);
      expect(arr).to.deep.equal([0, 1, 2, 3])
    });
  });

  describe('addToEnd', function () {
    it('adds to the end of an array', function () { 
      addToEnd(arr, 4);
      expect(arr).to.deep.equal([1, 2, 3, 4])
    });
  });
});

// hear we write our tests. Note that file.spec.js is a common naming convention for testing file.js

const assert = require('assert');
// require our code we want to test
const example = require('./2-example');
const addToFront = example.addToFront;
const addToEnd = example.addToEnd;

// write tests with assert. If no error is thrown, we know our tests pass!

const arr1 = [1, 2, 3];
addToFront(arr1, 0);
assert.deepEqual(arr1, [0, 1, 2, 3]);

const arr2 = [1, 2, 3];
addToEnd(arr2, 4);
assert.deepEqual(arr2, [1, 2, 3, 4]);

// UNCOMMENT TO SEE FAILIURE
// const arr3 = [4, 5, 6];
// addToEnd(arr3, 3);
// assert.deepEqual(arr3, [3, 4, 5, 6]);
// AssertionError: [ 4, 5, 6, 3 ] deepEqual [ 3, 4, 5, 6 ]


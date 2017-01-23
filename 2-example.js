// This file has my 'functional' code, i.e. what I *want* to test

function addToFront(arr, val) {
  arr.unshift(val);
}

function addToEnd(arr, val) {
  arr.push(val);
}

module.exports = { addToFront, addToEnd }

// Note: this is ES6 shorthand for
// module.exports = {
//   addToFront: addToFront,
//   addToEnd: addToEnd
// }
// Learn more at: https://github.com/lukehoban/es6features#enhanced-object-literals

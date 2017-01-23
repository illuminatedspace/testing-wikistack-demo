function addToFront(arr, val) {
  arr.unshift(val);
}

function addToEnd(arr, val) {
  arr.push(val);
}

const arr1 = [1, 2, 3];
addToFront(arr1, 0);
console.log(arr1); // [0, 1, 2, 3]

const arr2 = [1, 2, 3];
addToEnd(arr2, 4);
console.log(arr2); // [1, 2, 3, 4]


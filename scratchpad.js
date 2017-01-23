function addToFront(arr, val) {
  arr.unshift(val);
}

function addToEnd(arr, val) {
  arr.push(val);
}

let arr1 = [1, 2, 3];

addToFront(arr1, 0);

console.log(arr1); // [0, 1, 2, 3]

let arr2 = [1, 2, 3];

addToEnd(arr2, 4);

console.log(arr2); // [1, 2, 3, 4]


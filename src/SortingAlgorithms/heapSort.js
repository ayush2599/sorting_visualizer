export function getHeapSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();
  heapSort(animations, auxiliaryArray);
  return animations;
}
let len_aux;
function heapSort(animations, auxiliaryArray) {
  console.log("before");

  console.log(auxiliaryArray);

  len_aux = auxiliaryArray.length;
  for (let i = Math.floor(auxiliaryArray.length / 2); i >= 0; i -= 1) {
    heapRoot(animations, auxiliaryArray, i);
  }
  for (let i = len_aux - 1; i > 0; i -= 1) {
    swap(animations, auxiliaryArray, 0, i);
    len_aux--;
    heapRoot(animations, auxiliaryArray, 0);
  }
  console.log("done");
  console.log("after");
  console.log(auxiliaryArray);
}

function heapRoot(animations, auxiliaryArray, i) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;
  // if (left < 100 && right < 100) {
  animations.push(["comparision1", right, left]);
  animations.push(["comparision2", right, left]);

  if (left < len_aux && auxiliaryArray[left] > auxiliaryArray[max]) {
    max = left;
  }
  if (right < len_aux && auxiliaryArray[right] > auxiliaryArray[max]) {
    max = right;
  }
  if (max !== i) {
    swap(animations, auxiliaryArray, i, max);
    heapRoot(animations, auxiliaryArray, max);
  }
}

function swap(animations, auxiliaryArray, index1, index2) {
  animations.push(["swap", index1, auxiliaryArray[index2]]);
  animations.push(["swap", index2, auxiliaryArray[index1]]);
  let temp = auxiliaryArray[index1];
  auxiliaryArray[index1] = auxiliaryArray[index2];
  auxiliaryArray[index2] = temp;
}

function sortArr(arr, num){
    let currSelectedIndex = Math.floor(arr.length / 2)
    let startCutOff = 0
    let endCutOff = arr.length - 1
    let currSelectedVal;

    while(currSelectedVal !== num){
        currSelectedIndex = Math.floor((startCutOff + endCutOff) / 2);
        currSelectedVal = arr[currSelectedIndex];

        if(currSelectedVal < num){
            startCutOff = currSelectedIndex;
        } else {
            endCutOff = currSelectedIndex;
        }
    }

    console.log(currSelectedIndex)
    return currSelectedIndex
    
}
// sortArr([1,2,3,4,5,6,7,8,9], 7)


function countZeroes(arr){
    let startCutOff = 0
    let endCutOff = arr.length - 1
    let middle = Math.floor(arr.length / 2);
    let right = middle + 1;
    let left = middle - 1;

    const updateNums = () =>{ /**This updated the cut off numbers */
        middle = Math.floor((startCutOff + endCutOff) / 2)
        right = middle + 1;
        left = middle - 1;
    }
    while(!(left < -1) && !(right > (arr.length - 1))){ /**While the left or right numbers arent out of bounds this will run */
        if(arr[middle] === 1 && arr[right] === 0 ){
            console.log(arr.length - 1 - middle)
            return arr.length - 1 - middle
        } else if(arr[middle] === 1){
            startCutOff = middle + 1;
        } else if(arr[middle] === 0){
            endCutOff = middle - 1;
        } 
        updateNums();
    }
    if(arr[right] === 0){ /**If nothing was triggered this means that either it all zeros or has none. Following code deciphers this */
        console.log(arr.length - 1 - middle)
        return arr.length - 1 - middle
    } else{
        console.log('NO Zeros Found')
        return 'NO Zeros Found'
    }
}

// countZeroes([1,1,1,1,1,1,1])


function sortedFrequency(arr, target) {
    /**
     * The function defines two helper functions: findFirst and findLast. 
     * These functions will perform the divide and conquer approach to find 
     * the first and last occurrences of the target number, respectively.
     * Both Functions use reccursion
     */
    function findFirst(arr, target, low, high) {
      if (high >= low) {
        let mid = Math.floor((low + high) / 2);
  
        if ((mid === 0 || arr[mid - 1] < target) && arr[mid] === target) {
          return mid;
        } else if (arr[mid] < target) {
          return findFirst(arr, target, mid + 1, high);
        } else {
          return findFirst(arr, target, low, mid - 1);
        }
      }
  
      return -1;
    }
  
    function findLast(arr, target, low, high) {
      if (high >= low) {
        let mid = Math.floor((low + high) / 2);
  
        if ((mid === arr.length - 1 || arr[mid + 1] > target) && arr[mid] === target) {
          return mid;
        } else if (arr[mid] > target) {
          return findLast(arr, target, low, mid - 1);
        } else {
          return findLast(arr, target, mid + 1, high);
        }
      }
      return -1;
    }
  
    let firstMatchIdx = findFirst(arr, target, 0, arr.length - 1);
    if (firstMatchIdx === -1) {
      return -1;
    }
  
    let lastMatchIdx = findLast(arr, target, 0, arr.length - 1);
  
    return lastMatchIdx - firstMatchIdx + 1;
  }  
// const res = sortedFrequency([1,1,2,2,2,2,3],2) // 4
// console.log(res)


function findRotatedIndex(arr, target){

    function divideAndConquer(arr, target, start, end) {
        if (start > end) {
            return -1; // Element not found
        }
        
        const mid = Math.floor((start + end) / 2);

        if (arr[mid] === target) {
            return mid; // Element found at the mid index
        }

        if (arr[start] <= arr[mid]) {
            // Left half of the array is sorted in ascending order
            if (target >= arr[start] && target < arr[mid]) {
              return divideAndConquer(arr, target, start, mid - 1); // Search in the left half
            } else {
              return divideAndConquer(arr, target, mid + 1, end); // Search in the right half
            }
          } else {
            // Right half of the array is sorted in ascending order
            if (target > arr[mid] && target <= arr[end]) {
              return divideAndConquer(arr, target, mid + 1, end); // Search in the right half
            } else {
              return divideAndConquer(arr, target, start, mid - 1); // Search in the left half
            }

        }
    }

    return divideAndConquer(arr, target, 0, arr.length - 1);
}

// console.log(findRotatedIndex([3,4,1,2],4)) // 1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)) // 2
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)) // 6
// console.log(findRotatedIndex([37,44,66,102,10,22],14)) // -1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)) // -1


function findRotationCount(arr){
    let start = 0
    let end = arr.length - 1
    let middle = Math.floor(arr.length / 2);
    const divideAndConquer = (arr, middle, start, end) => {
        const checkRigh = (arr, middle, start, end) =>{
            if(arr[middle] > arr[middle + 1]){
                return middle + 1
            } else if(middle === 0){
                return 0
            }
            else if(arr[middle] < arr[middle + 1]) {
                let newEnd = middle;
                let newMiddle = Math.floor((start + newEnd) / 2) 
                return checkRigh(arr, newMiddle, start, newEnd)
            } 
        }
        const right = checkRigh(arr, middle, start, end)
        if(right !== 0){
            return right
        }
        const checkLeft = (arr, middle, start, end) =>{
            
            if(arr[middle] > arr[middle + 1]){
                return middle + 1
            } else if(middle === end - 1){
                return 0
            }
            else if (arr[middle] < arr[middle + 1]) {
                let newStart = middle;
                let newMiddle = Math.floor((newStart + end) / 2) 
                return checkLeft(arr, newMiddle, newStart, end)
            } 
        }

        const left = checkLeft(arr, middle, start, end)
        return left
    }
    return divideAndConquer(arr, middle, start, end)
}

// console.log(findRotationCount([15, 18, 2, 3, 6, 12])) // 2
// console.log(findRotationCount([7, 9, 11, 12, 5])) // 4
// console.log(findRotationCount([7, 9, 11, 12, 15])) // 0

function findFloor(arr, x) {
    let start = 0;
    let end = arr.length - 1;
    let floor = -1;
  
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
  
      if (arr[mid] <= x) {
        floor = arr[mid];
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  
    return floor;
  }

//   console.log(findFloor([1,2,8,10,10,12,19], 9))
//   console.log(findFloor([1,2,8,10,10,12,19], 20))
//   console.log(findFloor([1,2,8,10,10,12,19], 0))


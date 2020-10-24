let obj1 = { name: "박문수", age: 29 }
let obj2 = {...obj1 };
let obj3 = {...obj1, email: "mspark@gmail.com" };

console.log(obj2);
console.log(obj3);
console.log(obj1 == obj2);
console.log(obj1 === obj2);

let arr1 = [100, 200, 300];
let arr2 = ['hello', ...arr1, 'world'];
let arr3 = [...arr1];

console.log(arr2);
console.log(arr1 == arr3);
console.log(arr1 === arr3);
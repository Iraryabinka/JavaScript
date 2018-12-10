'use strict';   

let userInput = 0;
const numbers = [];

do {
  userInput = prompt('Введите число', '');
  numbers.push(Number(userInput));

} while (userInput !== null);

if (userInput === null) {
  numbers.pop(userInput);
}

console.log(numbers);

let total = 0;

for (let i = 0; i < numbers.length; i++) {
  total += numbers[i]
}

console.log(total);

alert(`Общая сумма чисел равна ${total}`); 



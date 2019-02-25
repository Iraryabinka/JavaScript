'use strict';

/*const checkNumberType = function(num) {
    if (num % 2 === 0) {
    return 'Even';
  } else {
    return 'Odd';
}
  }

console.log( checkNumberType(2) ); // 'Even'

console.log( checkNumberType(46) ); // 'Even'

console.log( checkNumberType(3) ); // 'Odd'

console.log( checkNumberType(17) ); // 'Odd'*/

/*
  Напишите функцию formatString(str)
  
  - Функия принимает на вход строку str
  - Если длина строки не превышает 40 символов, функция возвращает ее. 
  - Если длина больше 40 символов, то функция обрезает строку до 40-ти
    символов и добавляет в конец строки троеточие '...', после чего 
    возвращает укороченную версию.
*/

/*const formatString = function(str) {
if (str.length <= 40) {
return str;
} else if (str.length > 40) {
return str.slice(0,40) + '...' 
}
}

// Вызовы функции для проверки
console.log(
    formatString("Curabitur ligula sapien, tincidunt non.")
  ); // вернется оригинальная строка
  
  console.log(
    formatString("Vestibulum facilisis, purus nec pulvinar iaculis.")
  ); // вернется форматированная строка
  
  console.log(
    formatString("Curabitur ligula sapien.")
  ); // вернется оригинальная строка
  
  console.log(
    formatString("Nunc sed turpis. Curabitur a felis in nunc fringilla tristique.")
  ); // вернется форматированная строка*/

/*
  Напишите функцию checkForSpam(str)
  
  Функция принимает 1 параметр str - строку,
  и проверять ее на содержание слов: spam и sale
  
  Если нашли зарещенное слово то функция возвращает true,
  если запрещенных слов нет функция возвращает false
  
  PS: слова могут быть в произвольном регистре
*/

/*const checkForSpam = function(str) {

const newStr = str.toLowerCase();

  console.log(newStr);

  if (newStr.includes('sale')) {
    return true;
  } else if (newStr.includes('spam')){
    return true;
  } else {
      return false;
  }
};

// Вызовы функции для проверки
console.log(checkForSpam('Latest technology news')); // false

console.log(checkForSpam('JavaScript weekly newsletter')); // false

console.log(checkForSpam('Get best sale offers now!')); // true

console.log(checkForSpam('[SPAM] How to earn fast money?')); // true*/


/*  
  Написать функцию, getPx(str) 

  Функция getPx должна получать строку вида '10px',
  проверять была ли передана строка, если да, 
  возвращать только числовую составляющую, к примеру 10.
    
  Если была передана не строка, функция возвращает null.
*/

/*const getPx = function(str) {

 if (typeof str === '') {
     return Number.parseFloat(getPx()) ;
 } else {
     return null;
 }

}

// Вызовы функции для проверки
console.log( getPx("10px") === 10 ); // должно быть:  true
console.log( getPx("10.5") === 10.5 ); // должно быть:  true
console.log( getPx("0") === 0 ); // должно быть:  true
console.log( getPx(-1) ); // должно быть:  null
console.log( getPx(10) ); // должно быть:  null*/


/*  Практика 4 модуль
  Напишите скрипт, который, для объекта user, последовательно: 
  
    - добавляет поле mood со значением 'happy'
    
    - заменяет значение hobby на 'javascript'
    
    - удаляет свойство premium
    
    - выводит содержимое объекта user в формате ключ:значение 
      используя цикл for...in
    
    - выводит содержимое объекта user в формате ключ:значение 
      используя Object.keys и for...of
    
    - выводит содержимое объекта user в формате ключ:значение 
      используя Object.entries и for...of


const user = {
  name: "Mango",
  age: 20,
  hobby: "html",
  premium: true
};

user.mood = 'happy';
user.hobby = 'javaskript';
delete user.premium;

//for (const key in user) {
 // console.log(user)
//}

const keys = Object.keys(user);

for (const key of keys) {
  console.log('Keys: ', user[key], )
}


const entries = Object.entries(user);

for (const entry of entries) {
  const key = entry[0];
  const value = entry[1];
  console.log(`${key}: ${value}`)
}

console.log(user)*/


/*
  Напиште скрипт который определит и выведет в консоль 
  имя сотрудника который выполнил больше всех задач.

  Сотрудники и кол-во выполненых задач содержатся 
  как свойства объекта в формате "имя":"кол-во задач"
*/

const tasksCompleted = {
  ann: 29,
  david: 35,
  helen: 1,
  lorence: 99
};

const entries = Object.entries(tasksCompleted);

const bestUser = Math.max.apply(Math, entries);

console.log(entries);
console.log(bestUser);

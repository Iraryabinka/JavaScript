'use strict';   
const succesAdded = 'Логин успешно добавлен!' ;
const twiceAdde = 'Такой логин уже используется!';
const arrorLog = 'Ошибка! Логин должен быть от 4 до 16 символов';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

let login = prompt('Введите пароль');

const isLoginValid = function(login) {
  return (login.length < 4 || login.length > 16) ? false : true;
  
};

console.log(isLoginValid(login));

const isLoginUnique = function(allLogins, login) {
 allLogins = logins.includes(login);
};

console.log(logins.includes(login));

const addLogin = function(allLogins, login) {
if (isLoginValid() === false) {
  return alert('Ошибка! Логин должен быть от 4 до 16 символов');

} else if (isLoginValid() === true) {
  if (isLoginUnique() === true) {
    return alert('Такой логин уже используется!');

  } else if (isLoginUnique() === false){
    logins.push(login)
    return alert('Логин успешно добавлен!');
  }
}
};


//Вызовы функции для проверки
addLogin(logins, 'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles'); // 'Такой логин уже используется!'
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'

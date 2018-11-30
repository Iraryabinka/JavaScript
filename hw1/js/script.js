'use strict';   

const adminLogin = 'admin';
const adminPassword = 'm4ng0h4ckz';

const userCancel = 'Отменено пользователем!';
const wrongLogin = 'Доступ запрещен, неверный логин!';
const wrongPassword = 'Доступ запрещен, неверный пароль!';
const validPassword = 'Добро пожаловать!';
//const enterPassword = 'Please enter your password:'

let enterLogin = prompt('Please enter your login:');
let enterPassword = 'Please enter your password:';

if (enterLogin === adminLogin) {
    let enterPassword = prompt('Please enter your password:');

  if (enterPassword === adminPassword) {
        alert(validPassword)
    
    } else if (enterPassword === null) {
        alert(userCancel);
    
    } else if (enterPassword !== adminLogin) {
        alert(wrongPassword);
    }

} else if (enterLogin === null) {
    alert(userCancel);

} else if (enterLogin !== adminLogin) {
    alert(wrongLogin);
}



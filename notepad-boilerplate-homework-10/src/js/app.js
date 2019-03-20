

import initialNotes from '../assets/notes.json';
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from '../js/utils/constants';
import {createListItem, renderNoteList, addItemToList} from '../js/utils/view';
import Notepad from '../js/utils/notepad-model';

//--------------------------------------------class-------------

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};
 
export const notepad = new Notepad(initialNotes);
//----------------------------refs-----------------------------
const refs = {
  editor: document.querySelector('.note-editor'),
  list: document.querySelector('.note-list'),
  filter: document.querySelector('.search-form__input'),
};
//-------------------------------UI----------------------------


//---------------------------------Хендлер для добавления эл-тов------------------
const handleEditorSubmit = event => {
  //console.log(event.target.value);  //value - то что ввели в форму(текст заметки)
  event.preventDefault(); //отменяем дейст браузера по умолчанию(перезагр страницы)

  const [input_body, input_title] = event.currentTarget.elements;
  const inputValueBody = input_body.value;
  const inputValueTitle = input_title.value;

  if (inputValueBody.trim() === '' || inputValueTitle.trim() === '') {
    //trim очищает строки от пробелов
    return alert('Ты ничего не ввел!');
  }

  const savedItem = notepad.save(inputValueBody, inputValueTitle);

  addItemToList(refs.list, savedItem);

  event.currentTarget.reset(); // сброс полей после добавления зам-ки
};

//-----------------------------------------------Хендлер для фильтрации----------------
const handleFilterChange = event => {
  //console.log(event.target.value);

  const filteredItems = notepad.filter(event.target.value);

  refs.list.innerHTML = ' ';
  renderListItems(refs.list, filteredItems);
};

//-----------------------------------------------Хендлер для удаления----------------
/*const removeListItem = element => {
  const parentListItem = element.closest('.note-list__item'); //находим родителя
  const id = parentListItem.dataset.id; //путь к id заметки
  notepad.delete(id); // передаем в ф-ю id
  parentListItem.remove(); //удаляем заметку из ul
  console.table(notepad._notes);
};
const handleremoveListItem = ({ target }) => {
  //console.log(event.target.nodeName);
if (target.nodeName !== 'I') return; // если нажатый эл не кнопка - выйти
  const action = target.dataset.action;
  //console.log(action);
  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(target);
      break;
    default:
      alert('invalid action!');
  }
};*/

Array.from(document.querySelectorAll('[data-action = "delete-note"]')).forEach(
  el => {
    //создаем массив из эл и перебираем  его

    el.addEventListener('click', function(e) {
      //добавл листнер
      e.preventDefault();

      document.querySelector(`[data-id = '${this.dataset.action_id}'`);
      notepad.delete(this.dataset.action_id).remove();
    });
  }
);

renderNoteList(refs.list, initialNotes);
// -----------------------------------------------------------Listeners----------------
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);

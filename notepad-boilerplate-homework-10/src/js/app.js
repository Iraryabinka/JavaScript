

import initialNotes from '../assets/notes.json';
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from '../js/utils/constants';
import {createListItem, renderListItems, addItemToList} from '../js/utils/view';
import Notepad from '../js/utils/notepad-model';

//--------------------------------------------class-------------

 
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
const handleFilterChange = (event) => {
  //console.log(event.target.value);
  const filteredItems = notepad.filter(event.target.value);
  refs.list.innerHTML = ' ';
  renderListItems(refs.list, filteredItems);
};
//-----------------------------------------------Хендлер для удаления----------------
const removeListItem = element => {
  const parentListItem = element.closest('.note-list__item');
  const id = parentListItem.dataset.id;

  notepad.delete(id);
  parentListItem.remove();
  console.table(notepad._notes);

};

const handleListClick = ({
  target
}) => {

  if (target.nodeName !== 'I') return;

  const action = target.dataset.action;

  switch (action) {
      case NOTE_ACTIONS.DELETE:
          console.log('delete');
          removeListItem(target);

          break;

      default:
          console.log('invalid action!');
  }
};

/*Array.from(document.querySelectorAll('[data-action = "delete-note"]')).forEach(
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
*/
renderListItems(refs.list, initialNotes);
// -----------------------------------------------------------Listeners----------------
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);
refs.list.addEventListener('click', handleListClick);

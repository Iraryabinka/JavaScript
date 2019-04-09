
import Micromodal from 'micromodal'; 
import { Notyf } from 'notyf';

//import initialNotes from '../assets/notes.json';
import {PRIORITY_TYPES, NOTE_ACTIONS, NOTIFICATION_MESSAGES} from '../js/utils/constants';
import {createListItem, renderListItems, addItemToList} from '../js/utils/view';
import Notepad from '../js/utils/notepad-model';
import notesTemplate from '../templates/notes.hbs';
import 'notyf/notyf.min.css';

//------------localStarge--------------------------------
let savedNotes = localStorage.getItem('notes');

if (savedNotes) {
	savedNotes = JSON.parse(savedNotes);
}

const initialNotes = savedNotes ? savedNotes : [];
//---------------------------class-----------------------
const notepad = new Notepad(initialNotes);
const notyf = new Notyf();

//--------------------------refs-----------------------------
const refs = {
  editor: document.querySelector('.note-editor'),
  list: document.querySelector('.note-list'),
  filter: document.querySelector('.search-form__input'),
  openEditorModalBtn: document.querySelector(
    'button[data-action="open-editor"]',
),
};

//-------------------------UI----------------------------
/*const createNoteCard = note => {
  return notesTemplate(note);
};

const createNoteListItems = notes => {
  return notes.map(note => notesTemplate(note));
}

const markup = createNoteListItems(initialNotes).join('');

refs.list.insertAdjacentHTML('beforeend', markup);*/

//-----------------Хендлер для добавления эл-тов------------------
const handleEditorSubmit = event => {
  //console.log(event.target.value);  //value - то что ввели в форму(текст заметки)
  event.preventDefault(); //отменяем дейст браузера по умолчанию(перезагр страницы)

  const [input_body, input_title] = event.currentTarget.elements;
  const inputValueBody = input_body.value;
  const inputValueTitle = input_title.value;

  if (inputValueBody.trim() === '' || inputValueTitle.trim() === '') {
    //trim очищает строки от пробелов
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }

  const savedItem = notepad.save(inputValueBody, inputValueTitle);

  addItemToList(refs.list, savedItem);

  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
	Micromodal.close('note-editor-modal');

  event.currentTarget.reset(); // сброс полей после добавления зам-ки
};

//--------------------------localstorage----------------

/*const form = document.querySelector('search-form');
const [input] = form.elements;

const postNotes = localStorage.getItem('initialNotes');

if (postNotes) {
  input.value = postNotes;
  
}

form.addEventListener('keyup', e => {
  localStorage.setItem('notes' , input.value);
 
})

form.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.removeItem('notes');
  e.currentTarget.reset();
})*/
 //localStorage.setItem('notes', JSON.stringify(initialNotes));


//---------------------Хендлер для фильтрации----------------
const handleFilterChange = (event) => {
	//console.log(event.target.value);
	const filteredItems = notepad.filter(event.target.value);
	renderListItems(refs.list, filteredItems);
};

const removeListItem = (element) => {
	const parentListItem = element.closest('.note-list__item');
	const id = parentListItem.dataset.id;

	notepad.delete(id);
  parentListItem.remove();
  notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
};

const handleListClick = ({ target }) => {
	if (target.parentNode.nodeName !== 'BUTTON') return;

	const action = target.parentNode.dataset.action;

	switch (action) {
		case NOTE_ACTIONS.DELETE:
			removeListItem(target);

			break;

		default:
			console.log('invalid action!');
	}
};

const handleOpenEditor = () => {
	Micromodal.show('note-editor-modal');
};

renderListItems(refs.list, notepad.notes);

// Listeners
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);
refs.list.addEventListener('click', handleListClick);
refs.openEditorModalBtn.addEventListener('click', handleOpenEditor);
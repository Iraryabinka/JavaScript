'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];
//--------------------------------------------class-------------
class Notepad {
  constructor({ notes }) {
    this._notes = [];
  }
  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }

  get notes() {
    return this._notes;
  }

  static generateUniqueId = () =>
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  save(title, text) {
    const newNote = {
      id: Notepad.generateUniqueId(),
      title: title,
      body: text,
      priority: PRIORITY_TYPES.LOW,
    };

    this._notes.push(newNote);

    return newNote;
  }

  /*filter(query = '') {
    const filteredNotes = [];

    this._notes.filter(note =>
      note.body.toLowerCase().includes(query.toLowerCase())
    );

    this._notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase())

    if (hasQueryInTitle || hasQueryInBody) {
      filteredNotes.push(note);
    }
    return filteredNotes;
  }}*/

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) {
        return note;
      }
    }
  }
  saveNote(note) {
    this.notes.push(note);
  }

  /*deleteNote(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this._notes[i];

      if (note.id === id) {
        this.notes.splice(i, 1);
        return;
      }
    }
  }*/

  deleteNotes(id) {
    this._notes = this._notes.filter(note => note.id !== id);
    return this._notes;
  }

  updateNoteContent(id, { field, value }) {
    const note = this.findNoteById(id);

    if (!note) return;

    note[field] = value;
  }
  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);

    if (!note) return;

    note.priority = priority;
  }

  filterNotesByQuery(query) {
    const filteredNotes = [];

    for (const note of this._notes) {
      const hasQueryInTitle = note.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const hasQueryInBody = note.body
        .toLowerCase()
        .includes(query.toLowerCase());

      if (hasQueryInTitle || hasQueryInBody) {
        filteredNotes.push(note);
      }
    }
    return filteredNotes;
  }

  filterNotesByPriority(priority) {
    const filtredByPriorityNotes = [];

    for (const note of this._notes) {
      if (note.priority === priority) {
        filtredByPriorityNotes.push(note);
      }
    }
    return filtredByPriorityNotes;
  }
}

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

const notepad = new Notepad(initialNotes);
//----------------------------refs-----------------------------
const refs = {
  editor: document.querySelector('.note-editor'),
  list: document.querySelector('.note-list'),
  filter: document.querySelector('.search-form__input'),
};
//-------------------------------UI----------------------------
const createListItem = ({ id, title, body, priority }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const noteContainer = document.createElement('div');
  noteContainer.classList.add('note');

  const noteContant = document.createElement('div');
  noteContant.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteSection = document.createElement('section');
  noteSection.classList.add('note__section');

  const moreButton = document.createElement('button');
  moreButton.classList.add('action');
  //moreButton.textContent = 'expand_more';
  moreButton.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;

  const moreMaterialIcons = document.createElement('i');
  moreMaterialIcons.classList.add('material-icons');
  moreMaterialIcons.textContent = ICON_TYPES.ARROW_DOWN;

  const lessButton = document.createElement('button');
  lessButton.classList.add('action');
  //lessButton.textContent = 'expand_less';
  lessButton.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;

  const lessMaterialIcons = document.createElement('i');
  lessMaterialIcons.classList.add('material-icons');
  lessMaterialIcons.textContent = ICON_TYPES.ARROW_UP;

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${Notepad.getPriorityName(priority)}`;

  const footerNoteSection = document.createElement('section');
  footerNoteSection.classList.add('note__section');

  const editButton = document.createElement('button');
  editButton.classList.add('action');
  //editButton.textContent = 'edit';
  editButton.dataset.action = NOTE_ACTIONS.EDIT;

  const editMaterialIcons = document.createElement('i');
  editMaterialIcons.classList.add('material-icons');
  editMaterialIcons.textContent = ICON_TYPES.EDIT;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('action');
  //deleteButton.textContent = 'delete';
  deleteButton.dataset.action = NOTE_ACTIONS.DELETE;

  const deleteMaterialIcons = document.createElement('i');
  deleteMaterialIcons.classList.add('material-icons');
  deleteMaterialIcons.textContent = ICON_TYPES.DELETE;

  listItem.append(noteContainer, noteFooter);
  noteContainer.append(noteContant, noteFooter);
  noteContant.append(noteTitle, noteBody);
  noteFooter.append(noteSection, footerNoteSection);
  noteSection.append(moreButton, lessButton, notePriority);
  moreButton.appendChild(moreMaterialIcons);
  lessButton.appendChild(lessMaterialIcons);
  footerNoteSection.append(editButton, deleteButton);
  editButton.appendChild(editMaterialIcons);
  deleteButton.appendChild(deleteMaterialIcons);

  console.log(listItem);
  return listItem;
};

const renderNoteList = (listRef, notes) => {
  const listItem = notes.map(note => createListItem(note));

  listRef.innerHTML = '';
  listRef.append(...listItem);
};
// add our initialNotes to List

//--------------------------------------------------------------

const addItemToList = (listRef, note) => {
  const listItem = createListItem(note);

  listRef.appendChild(listItem); //
};
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

  const filteredItems = notepad.filterNotesByQuery(event.target.value);

  refs.list.innerHTML = ' ';
  renderNoteList(refs.list, filteredItems);
};

renderNoteList(refs.list, initialNotes);

//-----------------------------------------------Хендлер для удаления----------------
const removeListItem = element => {
  const parentListItem = element.closest('.note-list__item'); //находим родителя
  const id = parentListItem.dataset.id; //путь к id заметки

  notepad.deleteNotes(id); // передаем в ф-ю id

  removeListItem.remove(); //удаляем заметку из ul
};

const handleremoveListItem = ({ target }) => {
  console.log(event.target.nodeName);

  if (target.nodeName !== 'BUTTON') return; // если нажатый эл не кнопка - выйти

  const action = target.dataset.action;
  console.log(action);

  switch (action) {
    case ICON_TYPES.DELETE:
      removeListItem(target);
      break;
  }
};

// -----------------------------------------------------------Listeners----------------
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);
refs.list.addEventListener('click', handleremoveListItem);

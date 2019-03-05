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

class Notepad {
  constructor({ notes }) {
    this._notes = [];
  }

  get notes() {
    return this._notes;
  }

  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }

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

  deleteNote(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this._notes[i];

      if (note.id === id) {
        this.notes.splice(i, 1);
        return;
      }
    }
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

const list = document.querySelector('.note-list');

const createListItem = ({id, title, body, priority}) => {
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

  listItem.appendChild(noteContainer);
  noteContainer.appendChild(noteContant);
  noteContant.appendChild(noteTitle);
  noteContant.appendChild(noteBody);



  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteSection = document.createElement('section');
  noteContainer.classList.add('note__section');

  const moreButton = document.createElement('button');
  moreButton.classList.add('action');

  const moreMaterialIcons = document.createElement('i');
  moreMaterialIcons.classList('material-icons');
  moreMaterialIcons.textContent = ICON_TYPES.ARROW_DOWN;

  const lessButton = document.createElement('button');
  lessButton.classList.add('action');

  const lessMaterialIcons = document.createElement('i');
  lessMaterialIcons.classList('material-icons');
  lessMaterialIcons.textContent = ICON_TYPES.ARROW_UP;

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = 'Priority: Low';

  listItem.appendChild(noteFooter);
  noteFooter.appendChild(noteSection);
  noteSection.appendChild(moreButton);
  moreButton.appendChild(moreMaterialIcons);
  noteSection.appendChild(lessButton);
  lessButton.appendChild(lessMaterialIcons);

  console.log(listItem)

  //const footerNoteSection = document.createElement('section');
  //footerNoteSection.classList.add('note__section');

  //const editButton = document.createElement('button');
  //editButton.classList.add('action');

  /*const editMaterialIcons = document.createElement('i');
  footerMaterialIcons.classList('material-icons');
  footerMaterialIcons.textContent = 'edit';*/

  //const deleteButton = document.createElement('button');
  //deleteButton.classList.add('action');

  /*const deleteMaterialIcons = document.createElement('i');
  materialIcons.classList('material-icons');
  materialIcons.textContent = 'delete';*/

  return listItem;
};




const renderNoteList = (listRef, notes) => {
const listItem = initialNotes.map(item => createListItem(item));

listRef.append(...listItem);
}

renderNoteList(list, initialNotes);

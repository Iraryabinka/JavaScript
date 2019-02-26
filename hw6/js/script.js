'use strict';

/*const notepad = {
id: string | integer,
title: string,
body: string,
priority: integer [0-2],
}*/

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};


class Notepad {
constructor({id, title, body, priority, notes}) {
  this._id = id;
  this._title = title;
  this._body = body;
  this._priority = priority;
  this._notes = [];
}

  get notes() {
    return this._notes;
  }

   static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  };

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
    };
};

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
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
];

/*
 * Посмотрим имя приоритета по id
 */
console.log(Notepad.getPriorityName(PRIORITY_TYPES.LOW)); // "Low"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.NORMAL)); // "Normal"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.HIGH)); // "High"

const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log('Все текущие заметки: ', notepad.notes);

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 'id-3',
  title: 'Get comfy with Frontend frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
  id: 'id-4',
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

console.log('Все текущие заметки: ', notepad.notes);

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority('id-4', PRIORITY_TYPES.NORMAL);

console.log('Заметки после обновления приоритета для id-4: ', notepad.notes);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority('id-3', PRIORITY_TYPES.LOW);

console.log('Заметки после обновления приоритета для id-3: ', notepad.notes);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery('html'),
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery('javascript'),
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  'Отфильтровали заметки по нормальному приоритету: ',
  notepad.filterNotesByPriority(PRIORITY_TYPES.NORMAL),
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent('id-3', {
  title: 'Get comfy with React.js or Vue.js',
});

console.log(
  'Заметки после обновления контента заметки с id-3: ',
  notepad.notes,
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote('id-2');
console.log('Заметки после удаления с id -2: ', notepad.notes);
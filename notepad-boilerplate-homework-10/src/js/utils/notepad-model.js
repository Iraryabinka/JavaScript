const shortid = require('shortid');
import {
    PRIORITY_TYPES,
    PRIORITIES
} from '../utils/constants';

export default class Notepad {
    constructor({ notes }) {
      this._notes = [];
    }
    static getPriorityName(priorityId) {
      return Notepad.PRIORITIES[priorityId].name;
    }
  
    get notes() {
      return this._notes;
    }

    save(title, text) {
      const newNote = {
        id: shortid.generate(),
        title: title,
        body: text,
        priority: PRIORITY_TYPES.LOW,
      };
  
      this._notes.push(newNote);
  
      return newNote;
    }
  
    filter(query = '') {
      return this._notes.filter(
        note =>
          note.body.toLowerCase().includes(query.toLowerCase()) ||
          note.title.toLowerCase().includes(query.toLowerCase())
      );
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
  
    /*deleteNote(id) {
      for (let i = 0; i < this.notes.length; i += 1) {
        const note = this._notes[i];
        if (note.id === id) {
          this.notes.splice(i, 1);
          return;
        }
      }
    }*/
  
    delete(id) {
      this._notes = this._notes.filter(note => note.id !== id);
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
  
    /*filterNotesByQuery(query) {
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
    }*/
  
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
  
 
  
  
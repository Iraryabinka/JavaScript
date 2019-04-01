import {
    NOTE_ACTIONS,
    ICON_TYPES,
    PRIORITY_TYPES
} from './constants.js';
import noteTemplate from '../../templates/notes.hbs';
import Notepad from './notepad-model';

const createListItem = notes => {
    return noteTemplate(notes);
};


export const renderListItems = (listRef, notes) => {
    const listItems = notes.map(note => {
        const priorityName = Notepad.getPriorityName(note.priority);
        return createListItem({
            ...note,
            priority: priorityName
        })
    }).join('');
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', listItems);
};


export const addItemToList = (listRef, note) => {
    const listItem = createListItem(note);
    listRef.insertAdjacentHTML('beforeend', listItem);
};
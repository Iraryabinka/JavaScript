
import {
    PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS
} from '../utils/constants';

import Notepad from '../utils/notepad-model';

export const createListItem = ({ id, title, body, priority }) => {
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
    deleteButton.dataset.action_id = id;
  
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
}

export const renderNoteList = (listRef, notes) => {
    const listItem = notes.map(note => createListItem(note));
  
    listRef.innerHTML = '';
    listRef.append(...listItem);
  };
  // add our initialNotes to List
  
  //--------------------------------------------------------------
  
  export const addItemToList = (listRef, note) => {
    const listItem = createListItem(note);
  
    listRef.appendChild(listItem); //
  };
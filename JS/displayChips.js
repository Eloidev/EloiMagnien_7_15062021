import { clearInputValue } from './utils.js';
import { selectedChips } from './state.js';

function createChips (clickedElement, listId, resultsContainer, index) {
  // == creéation du container de la chip ===
  const newElement = document.createElement('div');
  newElement.classList.add('secondSearch__results' + '__' + 'select');
  newElement.classList.add(`${listId}`);
  newElement.classList.add(`${clickedElement.replaceAll(' ', '_')}`);
  newElement.classList.add('hidden'); // ajout d'une classe hidden pour un display:none par défaut
  newElement.setAttribute('id', `${listId}__${index}`); // ajout d'un id correspondant à l'id de l'élement du dropdown

  resultsContainer.appendChild(newElement);

  // ajout du texte de la chip
  const newText = document.createElement('p');
  newText.classList.add('secondSearch__results' + '__' + 'text');
  newText.classList.add(`${listId}`);
  newText.textContent = clickedElement;
  newElement.appendChild(newText);

  // == ajout de la croix pour la suppression de la chip
  const newCross = document.createElement('i');
  newCross.classList.add('far', 'fa-times-circle', 'deleteSelectedResult');
  newElement.appendChild(newCross);
}

// === création de toutes les chips en display:none par défaut
export function displayChips (dropdownList, listId) {
  const resultsContainer = document.getElementById('secondSearch__results');
  dropdownList.forEach(option => {
    createChips(option, listId, resultsContainer, dropdownList.indexOf(option));
  });
}

export function selectChip (inputId) {
  const chipsList = document.querySelectorAll('.secondSearch__results__select');
  const dropdownList = document.querySelectorAll('.option');

  dropdownList.forEach(option => {
    option.addEventListener('click', () => {
      for (let i = 0; i < chipsList.length; i++) {
        if (chipsList[i].classList.contains(option.innerHTML.replaceAll(' ', '_'))) {
          chipsList[i].classList.remove('hidden');
          option.classList.add('selected');
          selectedChips.push(chipsList[i]);
        }
      }
      clearInputValue(inputId);
      console.log(selectedChips);
    });
  });
}

export function removeChip () {
  const chipsListClose = document.querySelectorAll('.deleteSelectedResult');
  const selectedList = document.querySelectorAll('.option');

  chipsListClose.forEach(cross => {
    cross.addEventListener('click', () => {
      cross.parentElement.classList.add('hidden'); // === suppression de la chip (passage en display:none)
      // réapparition de l'option dans le dropdown (suppression de la class selected)
      for (let i = 0; i < selectedList.length; i++) {
        if (cross.parentElement.classList.contains(selectedList[i].innerHTML.replaceAll(' ', '_'))) {
          selectedList[i].classList.remove('selected');
        }
      }
    });
  });
}

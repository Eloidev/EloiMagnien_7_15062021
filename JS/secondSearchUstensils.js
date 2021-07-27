import { recipes } from '../datas/recipes.js';
import { secondSearchResults, searchResults, selectResult } from './secondSearch.js';
import { resetArray, sortArray, removeDuplicates, showList, clearShowedList } from './utils.js';

export function runUstensilSearch () {
  const ustensilsButton = document.getElementById('choice__ustensils');
  const foundUstensils = [];
  const filteredUstensils = [];
  const foundRecipes = searchResults.recipes;
  const filteredRecipes = [];
  // filterRecipes();
  if (ustensilsButton.value === '') {
    for (let i = 0; i < recipes.length; i++) {
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        const elements = capitalizeFirstLetter(recipes[i].ustensils[j]);
        foundUstensils.push(elements);
      }
    }
    sortArray(foundUstensils);
    removeDuplicates(foundUstensils, filteredUstensils);
    showList(filteredUstensils, 'ustensils');
    selectResult('ustensils');
    // launchChipsReload();
  }

  ustensilsButton.addEventListener('input', () => {
    resetArray(foundRecipes);
    for (let i = 0; i < recipes.length; i++) {
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        const elements = recipes[i].ustensils[j];
        if (elements.toLowerCase().indexOf(`${ustensilsButton.value.toLowerCase()}`) !== -1) {
          foundRecipes.push(recipes[i]);
        }
      }
    }
    clearShowedList('ustensils');
    removeDuplicates(foundRecipes, filteredRecipes);
    resetArray(foundUstensils);
    addFoundUstensils();
    sortArray(foundUstensils);
    showList(foundUstensils, 'ustensils');
    selectResult('ustensils');
    // launchChipsReload();
  });
}

function addFoundUstensils () {
  const ustensilsButton = document.getElementById('choice__ustensils');
  const elements = [];
  for (let i = 0; i < secondSearchResults.filteredRecipes.length; i++) {
    for (let j = 0; j < secondSearchResults.filteredRecipes[i].ustensils.length; j++) {
      const element = capitalizeFirstLetter(secondSearchResults.filteredRecipes[i].ustensils[j]);
      if (element.toLowerCase().indexOf(`${ustensilsButton.value.toLowerCase()}`) !== -1) {
        elements.push(element);
      }
    }
  }
  removeDuplicates(elements, secondSearchResults.foundUstensils);
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

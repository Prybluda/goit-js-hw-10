import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

error.classList.add('is-hidden');

function addNameanId(breed) {
  select.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
}
function fetchBreedsAndSetPetsList() {
  fetchBreeds()
    .then(result => {
        addNameanId(result);
    })
    .then(() => new SlimSelect({ select: `.breed-select` }))
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        { timeout: 4000, userIcon: false }
      );
    })
    .finally(() => {
        loader.classList.add('is-hidden');
    });
}
select.addEventListener('change', onSelect);

function onSelect(evt) {
  const selectBreedId = evt.currentTarget.value;
  catInfo.classList.add('is-hidden');

  fetchCatByBreed(selectBreedId)
    .then(data => {
      markup(data);
      catInfo.classList.remove('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`,
        { timeout: 4000, userIcon: false }
      );
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}
function markup(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catList = `<img src="${url}" alt="${name}" width=500>
  <div class ="back-color">
<h2 class="title">${name}</h2>
<p class="text">${description}</p>
<p class="text span-text"><span class="span">Temperament:</span> ${temperament}</p>
</div>`;
catInfo.innerHTML = catList;
}

fetchBreedsAndSetPetsList();
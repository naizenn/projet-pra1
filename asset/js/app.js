const state = {
  films: films,
  search: '',
  genre: '',
  status: '',
  sort: '',
};

function getVisibleFilms() {
  let result = state.films.filter((film) => {
    const matchSearch = film.title.toLowerCase().includes(state.search.toLowerCase());

    const matchGenre = state.genre === '' || film.genre === state.genre;

    const matchStatus = state.status === '' || film.status === state.status;

    return matchSearch && matchGenre && matchStatus;
  });

  if (state.sort === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.sort === 'year') {
    result.sort((a, b) => b.year - a.year);
  } else if (state.sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

function refresh() {
  renderList(getVisibleFilms());

  renderStats(state.films);
}

document.getElementById('search').addEventListener('input', (event) => {
  state.search = event.target.value;

  refresh();
});

document.getElementById('filter-genre').addEventListener('change', (event) => {
  state.genre = event.target.value;
  refresh();
});

document.getElementById('filter-status').addEventListener('change', (event) => {
  state.status = event.target.value;
  refresh();
});

document.getElementById('sort').addEventListener('change', (event) => {
  state.sort = event.target.value;
  refresh();
});

document.getElementById('film-list').addEventListener('click', (event) => {
  const star = event.target.closest('.star');

  if (star) {
    const card = star.closest('.card');

    const id = Number(card.dataset.id);

    const value = Number(star.dataset.value);

    const film = state.films.find((f) => f.id === id);

    film.rating = film.rating === value ? 0 : value;

    refresh();
  }
});

refresh();

const form = document.getElementById("formulaire");

form.addEventListener("submit", function (event) {
  event.preventDefault();                      

  const titre = document.getElementById("titre").value.trim();
  const genre = document.getElementById("genre").value;
  const annee = Number(document.getElementById("annee").value);
  const image = document.getElementById("image").value.trim();
  const erreur = document.getElementById("erreur");

  
  if (titre === "") {
    erreur.textContent = "Le titre est obligatoire.";
    return;
  }
  if (!Number.isInteger(year) || year < 1888 || year > 2100) {
    erreur.textContent = "L'année n'est pas valide.";
    return;
  }
  erreur.textContent = "";


  const newId = Math.max(0, ...state.films.map(f => f.id)) + 1;


  state.films.push({
    id: newId,
    title: titre,
    genre: genre,
    year: annee,
    image: image,          
    status: "aVoir",       
    rating: 0             
  });

  form.reset();            
  refresh();               
});
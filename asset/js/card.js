const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">' +
      '<rect width="400" height="280" fill="#334155"/>' +
      '<text x="200" y="150" font-family="sans-serif" font-size="22" fill="#94A3B8" text-anchor="middle">Image indisponible</text>' +
      '</svg>',
  );

const STATUS_LABELS = {
  vu: 'Vu',
  aVoir: 'À voir',
};

function renderCard(film) {
  const card = document.createElement('article');

  card.classList.add('card');

  card.dataset.id = film.id;

  const img = document.createElement('img');

  img.classList.add('card-image');

  img.setAttribute('alt', `Affiche du film ${film.title}`);

  img.setAttribute('src', film.image ? film.image : PLACEHOLDER_IMAGE);

  img.addEventListener('error', () => {
    img.setAttribute('src', PLACEHOLDER_IMAGE);
  });

  const title = document.createElement('h2');
  title.classList.add('card-title');

  title.textContent = film.title;

  const meta = document.createElement('p');
  meta.classList.add('card-meta');
  meta.textContent = `${film.genre} · ${film.year}`;

  const status = document.createElement('span');

  status.classList.add('badge', `status-${film.status}`);

  status.textContent = STATUS_LABELS[film.status];

  const rating = document.createElement('div');
  rating.classList.add('card-rating');

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');

    if (i <= film.rating) {
      star.classList.add('filled');
    }

    star.dataset.value = i;

    star.textContent = '★';

    rating.append(star);
  }

  card.append(img, title, meta, status, rating);

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = film.status === 'vu' ? 'Marquer à voir' : 'Marquer vu';
  toggleBtn.dataset.action = 'toggle';
  toggleBtn.dataset.id = film.id;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Supprimer';
  deleteBtn.dataset.action = 'delete';
  deleteBtn.dataset.id = film.id;

  card.append(toggleBtn, deleteBtn);

  return card;
}

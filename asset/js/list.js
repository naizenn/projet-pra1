
function renderList(data) {

  const container = document.getElementById('films-list') 
  container.textContent = ''

  if (films.length === 0) {
    const message = document.createElement('p')
    message.textContent = "Aucun films chargés"
  }

  films.forEach(function (film) {
    const card = renderCard(film);
    container.append(card);
  });
}

function renderStats(films) {
  let vus = 0;
  let aVoir = 0;

  films.forEach(function (film) {
    if (film.status === "vu") {
      vus = vus + 1;
    } else if (film.status === "aVoir") {
      aVoir = aVoir + 1;
    }
  });

  const stats = document.getElementById("stats");
  stats.textContent = `Total : ${films.length} | Vus : ${vus} | À voir : ${aVoir}`;
}

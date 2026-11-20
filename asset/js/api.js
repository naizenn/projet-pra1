const API_URL = "";

async function fetchFilms() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Erreur du serveur (${response.status})`);
  }
  return await response.json();
}
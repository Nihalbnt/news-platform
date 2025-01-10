/// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
    try {
        const response = await fetch('http://localhost:3000/api/news');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        displayNews(data.posts || []); // Utilise `posts` ou un tableau vide par défaut
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles.');
    }
}

// Fonction pour afficher les articles sous forme de cartes
function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Vider le conteneur avant d'ajouter de nouveaux articles

    if (news.length === 0) {
        container.innerHTML = '<p class="text-muted">Aucun article disponible.</p>';
        return;
    }

    news.forEach(article => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${article.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${article.title || 'Image indisponible'}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title || 'Titre indisponible'}</h5>
                        <p class="card-text">${(article.description || '').substring(0, 100)}...</p>
                        <a href="./news.html?id=${article.id}" class="btn btn-primary">Voir plus</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Fonction pour afficher une erreur
function showError(message) {
    const container = document.getElementById('latest-news'); // Conteneur pour afficher l'erreur

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger'; // Classe Bootstrap pour les alertes
    errorDiv.textContent = message;

    container.prepend(errorDiv); // Ajouter l'alerte en haut de la section

    // Supprimer l'alerte après 5 secondes
    setTimeout(() => errorDiv.remove(), 5000);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', fetchLatestNews);


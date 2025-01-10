document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id'); // Récupérer l'ID de l'article à partir de l'URL

    if (!articleId) {
        alert('Aucun article spécifié.');
        window.location.href = '/index.html';
        return;
    }

    try {
        const response = await fetch(`/api/news/${articleId}`);
        const article = await response.json();

        if (!response.ok) {
            throw new Error(article.message || 'Erreur lors de la récupération de l\'article.');
        }

        // Remplir les données dans la page
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-body').textContent = article.body;
    } catch (error) {
        console.error('Erreur :', error);
        alert('Impossible de charger l\'article.');
        window.location.href = '/index.html';
    }
});

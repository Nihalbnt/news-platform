// Fonction de validation
function validateForm(title, body) {
    if (!title || !body) {
        alert('Le titre et le corps de l\'article sont obligatoires.');
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-article-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupérer les valeurs du formulaire
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        // Validation avant l'envoi
        if (!validateForm(title, body)) {
            return; // Arrêter l'exécution si la validation échoue
        }

        try {
            // Envoyer les données au backend
            const response = await fetch('http://localhost:3000/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de l\'article');
            }

            // Afficher un message de succès ou rediriger
            alert('Article créé avec succès !');
            window.location.href = '/index.html';
        } catch (error) {
            console.error('Erreur :', error);
            alert('Impossible de créer l\'article.');
        }
    });
});

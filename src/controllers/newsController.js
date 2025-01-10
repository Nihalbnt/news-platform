const axios = require('axios');
const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {

    async getAllNews(req, res) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            res.json({ posts: response.data.posts });
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async getNewsById(req, res) {
        try {
            const articleId = req.params.id;
            const response = await axios.get(`${DUMMY_JSON_URL}/${articleId}`);
            res.json(response.data);
        } catch (error) {
            res.status(404).json({ message: 'Article non trouvé', error: error.message });
        }
    },

    async createNews(req, res) {
        try {
            const { title, body } = req.body;
            const response = await axios.post(DUMMY_JSON_URL, { title, body });
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    async updateNews(req, res) {
        const { id } = req.params;
        const { title, body } = req.body;

        try {
            const updatedNews = { id, title, body };
            res.status(200).json(updatedNews);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article.' });
        }
    },

    async deleteNews(req, res) {
        const { id } = req.params;

        try {
            const response = await axios.delete(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json({ message: 'Article supprimé avec succès', data: response.data });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'article.' });
        }
    },

}

module.exports = newsController;
require('dotenv').config(); 

const {google} = require('googleapis');

const API_KEY = process.env.GOOGLE_API_KEY; 

if (!API_KEY) {
    console.error("ERREUR FATALE : La variable GOOGLE_API_KEY est manquante dans le fichier .env.");
    process.exit(1); 
}

const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY, 
});

async function searchYouTube(query) {
    try {
        console.log(`Recherche officielle de : "${query}"...`);
        
        // ... (le reste de la logique de l'API) ...
        const response = await youtube.search.list({
            part: 'snippet',
            q: query,
            type: 'video',
            maxResults: 50
        });

        const items = response.data.items;
        console.log(`\nNombre de résultats trouvés : ${items.length}`);

        return items;

    } catch (error) {
        console.error("\nErreur lors de la recherche avec l'API Google YouTube:", error.message);
    }
}

async function searchTrendingVideos() {
    try {
        regionCode ="FR";
        console.log(`\n📈 Recherche des vidéos populaires du moment (${regionCode})...`);

        const response = await youtube.videos.list({
            part: "snippet,statistics",
            chart: "mostPopular",
            regionCode: regionCode,
            maxResults: 50
        });

        const items = response.data.items;

        console.log(`\nNombre de vidéos populaires trouvées : ${items.length}`);

        return items;

    } catch (error) {
        console.error("\nErreur lors de la récupération des vidéos populaires :", error.message);
    }
}

module.exports = { searchYouTube, searchTrendingVideos };
const ytsr = require('ytsr');

async function searchYouTube(query) {

    try {
        console.log(`Recherche de : "${query}"...`);
        
        const filters = await ytsr.getFilters(query);
        const searchResults = await ytsr(query, { 
            nextpage: false 
        });
        
        console.log(`Nombre de résultats trouvés : ${searchResults.items.length}`);
        
        searchResults.items.forEach(item => {
            if (item.type === 'video') {
                console.log(`\n------------------`);
                console.log(`Titre : ${item.title}`);
                console.log(`Durée : ${item.duration}`);
                console.log(`Vue(s) : ${item.views}`);
                console.log(`URL : ${item.url}`);
            }
        });
        return searchResults.items;

    } catch (error) {
        console.error("Erreur lors de la recherche ytsr:", error);
    }
}
searchYouTube("natation 100m papillon");
module.exports= {searchYouTube};
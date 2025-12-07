import {socket} from "../../main.js";

const app = document.getElementById("container");
console.log("youtube.js exécuté");
app.innerHTML = "<h1>Youtube1</h1>";
socket.on('searchComplete', (response) => {
    console.log("Réponse reçue :", response);
    if (response.status === 'success') {
        const items = response.data;
        app.innerHTML = ""; 

    items.forEach(item => {
        const videoId =
            item.id?.videoId   
            ?? item.id;   

        if (!videoId) return;

        const title = item.snippet.title;
        const channel = item.snippet.channelTitle;

        app.innerHTML += `
            <div class="video-container">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allowfullscreen>
                </iframe>
                <p>${title}</p>
                <small>${channel}</small>
            </div>
        `;
    });
    } else {
        app.innerHTML = `<p>Erreur lors de la recherche : ${response.message}</p>`;
    }   
});

socket.emit('youtubeClicked');

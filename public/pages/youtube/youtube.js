import { socket } from "../../main.js";
import {router_main} from "/router.js";


export function render(app) {
    app.innerHTML = "<h1>Chargement des tendances YouTube...</h1>";

    socket.off("trendingVideos");
    socket.on("trendingVideos", (response) => {

        if (response.status !== "success") {
            app.innerHTML = `<p>Erreur : ${response.message}</p>`;
            return;
        }

        const items = response.data;
        app.innerHTML = ""; 

        items.forEach(item => {
            const videoId = item.id?.videoId ?? item.id;
            if (!videoId) return;

            const title = item.snippet.title;
            const channel = item.snippet.channelTitle;
            const thumbnail =
                item.snippet.thumbnails.maxres?.url ||
                item.snippet.thumbnails.high?.url ||
                item.snippet.thumbnails.medium?.url ||
                item.snippet.thumbnails.default?.url;

            app.innerHTML += `
                <div class="video-container" data-video-id="${videoId}">
                    <img src="${thumbnail}" alt="${title}">
                    <p class = "video-title">${title}</p>
                    <small class = "video-channel">${channel}</small>
                </div>
            `;
        });

    });
    
    socket.emit("youtubeClicked");

}

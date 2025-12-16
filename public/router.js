// Définition des pages
import * as youtubePage from "/pages/youtube/youtube.js";
import * as accueilPage from "/pages/accueil/accueil.js";
import * as videoPage from "/pages/video.js";


const staticRoutes = {
    "/accueil": accueilPage,
    "/youtube": youtubePage
};
const dynamicRoutes = [
    {

        pattern: /^\/([^/]+)\/video\/([^/]+)$/,   //site/section/video/videoId
        handler: (app, match) => {
            const section = match[1]; 
            const videoId = match[2];
            videoPage.render(app, { section, videoId });
        }
    }
];


export function router_main() {

    async function loadPage(path) {
        const app = document.getElementById("container");

        for (const route of dynamicRoutes) {
            const match = path.match(route.pattern);
            if (match) {
                app.innerHTML = "";
                route.handler(app, match);
                return;
            }
        }

        const page = staticRoutes[path];
        if (page) {
            app.innerHTML = "";
            page.render(app);
            return;
        }

        app.innerHTML = "<h1>404</h1><p>Page non trouvée.</p>";
    }



    window.onpopstate = () => {
        loadPage(window.location.pathname);
    };

    loadPage(window.location.pathname);
}

// Définition des pages
const routes = {
    "/youtube": "/pages/youtube/youtube.js",
    "/accueil": "/pages/accueil/accueil.js"
};


export function router_main() {

    // --- Load current page ---
    async function loadPage(path) {
        const app = document.getElementById("container");
        if (!routes[path]) {
            app.innerHTML = "<h1>404</h1><p>Page non trouvée.</p>";
            return;
        }

        try {
            const script = document.createElement("script");
            script.type = "module";
            script.src = routes[path];
            document.body.appendChild(script);
            

        } catch (err) {
            app.innerHTML = "<h1>Erreur</h1><p>Impossible de charger la page.</p>";
        }    
    }

    // --- Lors d’un clic sur un lien ---
    document.querySelectorAll("[data-route]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const url = e.target.getAttribute("href");

            history.pushState({}, "", url); // change l’URL sans recharger
            loadPage(url);
        });
    });

    // --- Quand on fait "retour" dans le navigateur ---
    window.onpopstate = () => {
        loadPage(window.location.pathname);
    };

    // --- Initial load ---
    loadPage(window.location.pathname);
}

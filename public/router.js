// Définition des pages
const routes = {
    "/accueil": "/pages/accueil.html",
    "/about": "/pages/about.html",
    "/contact": "/pages/contact.html",
    "/youtube": "/pages/youtube.html"
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
            const response = await fetch(routes[path]);
            const html = await response.text();
            app.innerHTML = html;
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

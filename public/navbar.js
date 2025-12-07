export function loadNavbar() {
    const html = `
    <nav>
        <a href="/accueil" data-route>Accueil</a>
        <a href="/youtube" data-route>YouTube</a>
    </nav>`;
    document.body.insertAdjacentHTML("afterbegin", html);
}

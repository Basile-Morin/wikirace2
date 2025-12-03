export function loadNavbar() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("afterbegin", html);
        });
}

import {router_main} from "./router.js";
import {loadNavbar} from "./navbar.js";

export const socket = io();

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/") {
        history.replaceState({}, "", "/accueil");
    }
    
    router_main();
    loadNavbar();
});
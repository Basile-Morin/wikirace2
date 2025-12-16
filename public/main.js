import {router_main} from "/router.js";
import {loadNavbar} from "/navbar.js";

export const socket = io();

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/") {
        history.replaceState({}, "", "/accueil");
    }
    addEventListeners();
    loadNavbar();
    router_main();

});

function addEventListeners() {
    document.addEventListener("click", (e) => {
        const video = e.target.closest(".video-container");
        if (video) {
            e.preventDefault();

            const videoId = video.dataset.videoId;

            history.pushState({}, "", "/youtube/video/" + videoId);
            router_main();
            return;
        }
        
        const link = e.target.closest("[data-route]");
        if (link) {
            e.preventDefault();
            const url = link.getAttribute("href");

            history.pushState({}, "", url);
            router_main();
            return;
        }
    });
}
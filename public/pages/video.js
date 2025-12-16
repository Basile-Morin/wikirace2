export function render(app, { section, videoId }) {
    app.innerHTML = `
        <iframe class="video-player"
            src="https://www.youtube-nocookie.com/embed/${videoId}?playlist=${videoId}&autoplay=1&iv_load_policy=3&loop=0&start="
            frameborder="0"
            allowfullscreen>
        </iframe>
        <div class="video-info">
            <p>ID : ${videoId}</p>
            <a href="/${section}" data-route>← Retour</a>
        </div>
    `;
}

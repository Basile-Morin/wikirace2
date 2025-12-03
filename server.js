const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/wiki/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const url = `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&format=json`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'WikiRaceApp/1.0 (https://github.com/Basile-Morin/wikirace; basilemorin79@gmail.com)',
      },
    });
    if (response.data.error || !response.data.parse) {
      return res.status(404).json({ error: 'Page introuvable' });
    }

    // On charge le HTML et on récupère les liens internes
    const html = response.data.parse.text['*'];
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="stylesheet" href="https://fr.wikipedia.org/w/load.php?modules=site.styles&only=styles">
        <link rel="stylesheet" href="https://fr.wikipedia.org/w/load.php?modules=skins.vector.styles&only=styles">
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
    res.send(fullHtml);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }

});


server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
const {searchYouTube,searchTrendingVideos} = require('./ytbQuery');
const express = require('express');
const path = require('path');
const http = require('http');
const {Server} = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let cache = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



app.get('/health', (req, res) => res.json({ ok: true }));

io.on('connection', (socket) => {
  console.log('utilisateur ', socket.id,' connecté');
  
  socket.on('search', async (query) => {
    console.log(`Recherche reçue pour : "${query}" par l'utilisateur ${socket.id}`);
    try {
      data = await searchYouTube(query);
      socket.emit('searchComplete', { status: 'success', data: data });
      console.log(`Résultats envoyés pour : "${query}" pour l'utilisateur ${socket.id}`);
    } catch (error) {
      console.error("Erreur lors de la recherche YouTube:", error);
      socket.emit('searchComplete', { status: 'error', message: error.message });
    }
  });

  socket.on('youtubeClicked', async () => {
    console.log('L\'utilisateur ', socket.id,' a cliqué sur YouTube');
    if (cache.trendingVideos) {
      console.log('Utilisation des vidéos en cache pour : l\'utilisateur ', socket.id);
      socket.emit('trendingVideos', { status: 'success', data: cache.trendingVideos });
    } else {
      try {
        cache.trendingVideos = await searchTrendingVideos();
        socket.emit('trendingVideos', { status: 'success', data: cache.trendingVideos });
        console.log(`Résultats envoyés pour : l'utilisateur ${socket.id}`);
      } catch (error) {
        console.error("Erreur lors de la recherche trending YouTube:", error);
        socket.emit('trendingVideos', { status: 'error', message: error.message });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('utilisateur ', socket.id,' déconnecté');
  });

});


server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
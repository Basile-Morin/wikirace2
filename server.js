const {searchYouTube} = require('./scrapYoutube');
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

io.on('connection', (socket) => {
  console.log('utilisateur ', socket.id,' connecté');
});


server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
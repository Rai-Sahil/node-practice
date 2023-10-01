const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path'); // Add this line

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    // Handle new WebSocket connections here
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
        // Handle incoming messages from clients
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

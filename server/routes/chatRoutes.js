const jwt = require('jsonwebtoken');

const chatHandler = (ws, req) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return ws.close();

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return ws.close();

        ws.on('message', (message) => {
            ws.send(message); // Broadcast message to all connected clients
        });
    });
};

module.exports = (app) => {
    app.ws('/api/chat', chatHandler);
};

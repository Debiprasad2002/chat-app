const jwt = require('jsonwebtoken');

exports.chatHandler = (ws, req) => {
    // Authenticate user
    const token = req.query.token;
    if (!token) {
        ws.close(1008, 'Authentication token required');
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ws.user = decoded.user;
    } catch (err) {
        ws.close(1008, 'Invalid authentication token');
        return;
    }

    // Handle incoming messages
    ws.on('message', (msg) => {
        const message = JSON.parse(msg);

        // Broadcast message to all connected clients
        ws.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(
                    JSON.stringify({
                        user: ws.user.username,
                        content: message.content,
                        timestamp: new Date().toISOString(),
                    })
                );
            }
        });
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed:', ws.user);
    });
};

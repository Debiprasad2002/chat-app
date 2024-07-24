# Chat Application

This project is a simple chat application that includes user registration, login, and real-time messaging features. It uses Express.js for the backend, MongoDB for database storage, and WebSockets for real-time communication.

## Features

- **User Registration and Authentication:**
  - Sign up with username, email, and password.
  - Securely store passwords using hashing techniques.
  - Login to authenticate users before accessing the chat application.

- **WebSocket Setup:**
  - Establish a WebSocket connection for real-time messaging.
  - Ensure only authenticated users can open a WebSocket connection.

- **Real-time Messaging:**
  - Send and receive messages in real-time.
  - Broadcast messages to all connected users.

- **Message Handling:**
  - Display messages with timestamps and the sender’s username.
  - Ensure reliable message transmission over WebSocket.

- **User Interface:**
  - Simple and intuitive UI for user registration, login, and chat.
  - Includes input fields for messages and a display area for chat history.

## Folder Structure

chat-app/
├── client/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── index.html           # Landing page or entry point
│   ├── signup.html          # User registration page
│   ├── login.html           # User login page
│   └── chat.html            # Chat interface page
├── server/
│   ├── config/
│   │   └── db.js            # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js # Handles user registration and login logic
│   │   └── chatController.js # Handles chat-related logic
│   ├── models/
│   │   ├── userModel.js     # Defines user schema and model
│   │   └── messageModel.js  # Defines message schema and model
│   ├── routes/
│   │   ├── authRoutes.js    # Routes for authentication (signup and login)
│   │   └── chatRoutes.js    # Routes for chat functionalities
│   ├── server.js            # Main server setup file
└── package.json             # Project dependencies and scripts

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesDiv = document.getElementById('messages');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = 'chat.html';
            } else {
                alert('Login failed');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed');
            }
        });
    }

    if (messageInput) {
        const token = localStorage.getItem('token');
        const ws = new WebSocket('ws://localhost:5000/api/chat', {
            headers: { Authorization: `Bearer ${token}` }
        });

        ws.onmessage = (event) => {
            const message = document.createElement('div');
            message.textContent = event.data;
            messagesDiv.appendChild(message);
        };

        sendBtn.addEventListener('click', () => {
            const message = messageInput.value;
            ws.send(message);
            messageInput.value = '';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startChat');
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');

    startButton.addEventListener('click', function() {
        startButton.style.display = 'none'; // Hide the start button
        userInput.style.display = 'block'; // Show the input field
    });

    userInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const userMessage = userInput.value;
            userInput.value = '';
            displayMessage(userMessage, 'user');
            sendMessageToBot(userMessage);
        }
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    async function sendMessageToBot(message) {
        const projectId = 'your-project-id';
        const sessionId = '123456789';
        const accessToken = 'your-access-token';

        const response = await fetch(`https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                queryInput: {
                    text: {
                        text: message,
                        languageCode: 'en'
                    }
                }
            })
        });

        const jsonResponse = await response.json();
        const botMessage = jsonResponse.queryResult.fulfillmentText;
        displayMessage(botMessage, 'bot');
    }
});

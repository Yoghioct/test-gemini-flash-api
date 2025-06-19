const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Simulasi dummy balasan bot (placeholder)
  // setTimeout(() => {
    // appendMessage('bot', '');
  // }, 1000);

  // Send message to backend using fetch
  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    appendMessage('bot', data.reply); // Assuming your backend sends back { reply: "..." }
  })
  .catch(error => {
    console.error('Error sending message:', error);
    appendMessage('bot', 'Error: Could not get a response.'); // Display an error message
  });
    

  // Simulasi dummy balasan bot (placeholder)
  // setTimeout(() => {
  //   appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
  // }, 1000);
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

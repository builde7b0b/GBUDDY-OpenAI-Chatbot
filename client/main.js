/*
 * 
 *
   ____ ____  _   _ ____  ______   __
  / ___| __ )| | | |  _ \|  _ \ \ / /
 | |  _|  _ \| | | | | | | | | \ V /
 | |_| | |_) | |_| | |_| | |_| || |
  \____|____/ \___/|____/|____/ |_|


 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */






import bot from './assets/bog.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const cahtContainer = document.querySelector('#chat_container');

let loadInterval;

//FIRST FUNCTION
function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '...') {
      element.textContent = '';
    }
  }, 300);
}

// function to
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// generate unique id
function generateUniqueId() {
  // use current time and date since always unique
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// FUNCTION FOR CHAT STRIPE
function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div className="profile">
          <img 
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  // users chat stripe
  chatContainer.innerHTML += chatStripe(false, ' ', data.get('prompt'));

  form.reset();

  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, ' ', data.get('prompt'));

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
};

// CONNECTING CLIENT AND SERVER
//Fetch Data from server
const response = await fetch('http://localhost:5000', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: data.get('prompt'),
  }),
});

clearInterval(loadInterval);
messageDiv.innerHTML = ' ';

if (response.ok) {
  const data = await response.json();
  const parsedData = data.bot.trim();

  typeText(messageDiv, parsedData);
} else {
  const err = await response.text();
  messageDiv.innerHTML = 'something went wrong';
  alert(err);
}
//------------------------------

form.AddEventListener('submit', handleSubmit);

form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});

const socket = io();

let username;

do {
    username = prompt("Enter your name: ");
} while(!username);

socket.emit('new-user-joined', username);

socket.on('new-user-joined', (user) => {
    const newUser = document.createElement('div');
    newUser.classList.add('mt-3', 'mb-3');
    newUser.innerHTML = `${user} joined the party!`;
    messagearea.appendChild(newUser);
})
const typearea = document.querySelector('#typearea');
const messagearea = document.querySelector('#messagearea');

typearea.addEventListener("keyup", (e)=> {
    if(e.key=='Enter' && e.target.value.length>=2) {
        console.log(e.target.value.length);
        const newMessage = document.createElement('div');
        newMessage.classList.add('d-flex', 'justify-content-end', 'm-2');
        newMessage.innerHTML = `
        <div class="card bg-dark text-white" style="width: 30rem;">
            <div class="card-body">
              <h5 class="card-title text-start mb-2">${username}: </h5>
              <p class="card-text text-start">${e.target.value}</p>
            </div>
        </div>
        `
        messagearea.appendChild(newMessage);
        scrollToBottom();
        socket.emit('message', {body: e.target.value, username: username});
        e.target.value = '';
    }
})

socket.on('message', (msg) => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('d-flex', 'justify-content-start', 'm-2');
    newMessage.innerHTML = `
    <div class="card" style="width: 30rem;">
        <div class="card-body">
            <h5 class="card-title text-start">${msg.username}:</h5>
            <p class="card-text text-start">${msg.body}</p>
        </div>
    </div>
    `
    messagearea.appendChild(newMessage);
    scrollToBottom();
})



function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight;
}
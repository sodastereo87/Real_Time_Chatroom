// dom query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');


// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

// update username 
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset form
    newNameForm.reset();
    // show and hide update username message
    updateMssg.innerText = `username updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 2000);
});

// update chat room
rooms.addEventListener('click', e => {
if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));

}
});

// check local storage for username 
const username = localStorage.username ? localStorage.username : 'user';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// grt chats and render
chatroom.getChats(data => chatUI.render(data));


// log out button js

document.getElementById('logout-button').addEventListener('click', (event) => {
    event.preventDefault()
  
    const signoutWindow = window.open(
      'https://organization.url/login/signout',
      'okta-signout',
    )
  
    signoutWindow.close()
    window.location = document.getElementById('logout-button').href
  
  })
  
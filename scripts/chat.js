class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message) {
        // format chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save chats document
        const response = await this.chats.add(chat);
        return response;
    }
    // setting up a real time listener to get new chats
    getChats(callback) {
        this.chats
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added'){
                        // update the ui
                        callback(change.doc.data());
                    }
                });
            });
    }
}

const chatroom = new Chatroom('gaming', 'shaun');
chatroom.getChats((data) => {
    console.log(data);

})
// chatroom.addChat('hello')
// .then(() => console.log('chat added'))
// // console log any error
// .catch(err => console.log(err));



console.log();

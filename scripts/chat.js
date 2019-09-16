class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
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
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update the ui
                        callback(change.doc.data());
                    }
                });
            });
    }
    // update username
    updateName(username) {
        this.username = username;
    }
    // update room
    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsub) {
            this.unsub();
        }
    }
}

const chatroom = new Chatroom('general', 'shaun');
chatroom.getChats((data) => {
    console.log(data);
});

setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('yoshi');
    chatroom.getChats((data) => {
        console.log(data);
    });
    chatroom.addChat('hello');
}, 3000);

// chatroom.addChat('hello')
// .then(() => console.log('chat added'))
// // console log any error
// .catch(err => console.log(err));



console.log();

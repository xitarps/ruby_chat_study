import consumer from "./consumer"

const chatChannel = consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    alert("Conectado! chat room!");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    let p = document.createElement('p')
    p.innerHTML = `${data.message}`
    document.querySelector('#messages').appendChild(p);
  },

  speak: function(message) {
    return this.perform('speak', { message });
  }
});

document.addEventListener('turbolinks:load',()=>{
  document.querySelector('#message_form').addEventListener('submit',(e)=>{
    e.preventDefault();
    let message = document.querySelector('#message_to_sent').value;
    if(message.length > 0){
      chatChannel.speak(message);
      document.querySelector('#message_to_sent').value = '';
    }
  });
});

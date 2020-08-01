import consumer from './consumer'

$(function () {
  const chatChannel = consumer.subscriptions.create({ channel: 'RoomChannel', room: $('#messages').data('room_id') }, {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received: function (data) {
      return $('#messages').append(data['message']);
    },

    speak: function (message) {
      return this.perform('speak', {
        message: message
      });
    }
  });

  $(document).on('keypress', '[data-behavior~=room_speaker]', function (event) {
    if (event.keyCode === 13) {
      const message = event.target.value;
      const roomId = $('input:hidden[name="room"]').val()

      chatChannel.speak({ message: message, room_id: roomId});
      event.target.value = '';
      return event.preventDefault();
    }
  });
});

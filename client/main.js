import { Template } from 'meteor/templating';
import { Streamy } from 'meteor/yuukan:streamy';
import { Router } from 'meteor/iron:router';

Template.home.events({
  'click #update-nick-name': (event) => {
    event.preventDefault();
    const nickname = $('input').val();
    Streamy.emit('nick_set', { nickname });
    Session.set('myName', nickname);
  },
  'click #create-room': (event) => {
    event.preventDefault();
    const roomName = Random.id();
    Streamy.join(roomName);
    Router.go(`/room/${roomName}`);
  },
  'click .join-room': (event) => {
    event.preventDefault();
    const roomName = $(event.currentTarget).data().value;
    Streamy.join(roomName);
    Router.go(`/room/${roomName}`);
  }
});

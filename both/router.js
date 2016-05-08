import { Rooms } from './collections.js';
import { Streamy } from 'meteor/yuukan:streamy';

Router.route('/', {
  waitOn() {
    return Meteor.subscribe('rooms');
  },
  data() {
    return {
      rooms: Rooms.find()
    };
  },
  action() {
    this.render('home');
  }
});

Router.route('/room/:roomId', {
  waitOn() {
    return Meteor.subscribe('room', Streamy.id());
  },
  data() {
    return {
      rooms: Rooms.find()
    };
  },
  action() {
    this.render('room');
  }
});

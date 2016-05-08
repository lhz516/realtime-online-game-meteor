import { Streamy } from 'meteor/yuukan:streamy';
import { Clients } from '../both/collections.js';

/**
 * Called upon a client connection, insert the user
 */
Streamy.onConnect((socket) => {
  Clients.insert({
    sid: Streamy.id(socket)
  });
});

/**
 * Upon disconnect, clear the client database
 */

Streamy.onDisconnect((socket) => {
  Clients.remove({
    sid: Streamy.id(socket)
  });

  // Inform the lobby
  Streamy.broadcast('__leave__', {
    sid: Streamy.id(socket),
    room: 'lobby'
  });
});

/**
 * When the nick is set by the client, update the collection accordingly
 */
Streamy.on('nick_set', (data, from) => {
  console.log(data);
  if (!data) {
    throw new Meteor.Error('Empty nick');
  }
  Clients.update({
    sid: Streamy.id(from)
  }, {
    $set: { data }
  });

  // Ack so the user can proceed to the rooms page
  Streamy.emit('nick_ack', { data }, from);

  // Inform the lobby
  Streamy.broadcast('__join__', {
    sid: Streamy.id(from),
    room: 'lobby'
  });
});

/**
 * Only publish clients with not empty nick
 */
Meteor.publish('clients', () => {
  return Clients.find({
    nick: { $ne: null }
  });
});

/**
 * Publish rooms where the user appears
 * @param  {String} sid) Client id
 */


Meteor.publish('room', (sid) => {
  if (!sid) {
    return this.error(new Meteor.Error('sid null'));
  }
  return Streamy.Rooms.allForSession(sid);
});

Meteor.publish('rooms', () => {
  return Streamy.rooms();
});
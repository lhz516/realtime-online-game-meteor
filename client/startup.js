import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Streamy } from 'meteor/yuukan:streamy';

Meteor.startup(() => {
  Session.set('myName', undefined);
});

Streamy.onConnect(() => {
  Meteor.subscribe('clients');
  Meteor.subscribe('rooms');
});

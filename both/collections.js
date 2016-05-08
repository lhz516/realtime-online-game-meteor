import { Mongo } from 'meteor/mongo';
import { Streamy } from 'meteor/yuukan:streamy';

export const Clients = new Mongo.Collection('clients');
export const Rooms = Streamy.Rooms.model;

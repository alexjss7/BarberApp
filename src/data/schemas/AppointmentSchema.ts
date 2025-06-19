import Realm from 'realm';
import { Client } from './ClientSchema';
import { Service } from './ServiceSchema';

export class Appointment extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  client!: Client; 
  service!: Service; 
  date!: Date;
  barberName!: string; 
  status!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Appointment',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      client: 'Client',
      service: 'Service',
      date: 'date',
      barberName: 'string',
      status: 'string',
    },
  };
}
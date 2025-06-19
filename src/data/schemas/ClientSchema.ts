import Realm from 'realm';

export class Client extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  phone?: string;
  email?: string;

  static schema: Realm.ObjectSchema = {
    name: 'Client',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      phone: 'string?',
      email: 'string?',
    },
  };
}
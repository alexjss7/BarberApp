import Realm from 'realm';

export class Service extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  price!: number;
  duration!: number;

  static schema: Realm.ObjectSchema = {
    name: 'Service',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      price: 'double',
      duration: 'int',
    },
  };
}
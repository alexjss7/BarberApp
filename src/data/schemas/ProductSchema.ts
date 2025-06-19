import Realm from 'realm';

export class Product extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  type!: string; 
  quantity!: number;
  price!: number;

  static schema: Realm.ObjectSchema = {
    name: 'Product',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      type: 'string',
      quantity: 'int',
      price: 'double',
    },
  };
}
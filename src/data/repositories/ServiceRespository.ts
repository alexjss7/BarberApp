import { Service } from '../schemas/ServiceSchema';
import { getRealm } from '../RealmConfig';
import Realm from 'realm';

class ServiceRepository {
  async getAllServices(): Promise<Service[]> {
    const realm = await getRealm();
    return realm.objects<Service>('Service').sorted('name').toJSON();
  }

  async saveService(serviceData: { _id?: Realm.BSON.ObjectId, name: string, price: number, duration: number }): Promise<Service> {
    const realm = await getRealm();
    let service: Service;
    realm.write(() => {
      service = realm.create<Service>('Service', {
        _id: serviceData._id || new Realm.BSON.ObjectId(),
        name: serviceData.name,
        price: serviceData.price,
        duration: serviceData.duration,
      }, Realm.UpdateMode.Modified);
    });
    return service!;
  }

  async deleteService(id: Realm.BSON.ObjectId): Promise<void> {
    const realm = await getRealm();
    realm.write(() => {
      const service = realm.objectForPrimaryKey<Service>('Service', id);
      if (service) {
        realm.delete(service);
      }
    });
  }
}

export default new ServiceRepository();
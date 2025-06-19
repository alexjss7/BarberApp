import { Client } from '../schemas/ClientSchema';
import { getRealm } from '../RealmConfig';
import Realm from 'realm'; // Import Realm here

class ClientRepository {
  async getAllClients(): Promise<Client[]> {
    const realm = await getRealm();
    return realm.objects<Client>('Client').sorted('name').toJSON();
  }

  async saveClient(clientData: { _id?: Realm.BSON.ObjectId, name: string, phone?: string, email?: string }): Promise<Client> {
    const realm = await getRealm();
    let client: Client;
    realm.write(() => {
      client = realm.create<Client>('Client', {
        _id: clientData._id || new Realm.BSON.ObjectId(),
        name: clientData.name,
        phone: clientData.phone,
        email: clientData.email,
      }, Realm.UpdateMode.Modified);
    });
    return client!;
  }

  async deleteClient(id: Realm.BSON.ObjectId): Promise<void> {
    const realm = await getRealm();
    realm.write(() => {
      const client = realm.objectForPrimaryKey<Client>('Client', id);
      if (client) {
        realm.delete(client);
      }
    });
  }
}

export default new ClientRepository();
import Realm from 'realm';
import { Client } from './schemas/ClientSchema';
import { Service } from './schemas/ServiceSchema';
import { Appointment } from './schemas/AppointmentSchema';
import { Product} from './schemas/ProductSchema';

export const getRealm = async () => {
  return await Realm.open({
    path: 'barbearianegobala.realm',
    schema: [Client, Service, Appointment, Product],
    schemaVersion: 1,
  });
};
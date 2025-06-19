import { Appointment } from '../schemas/AppointmentSchema';
import { Client } from '../schemas/ClientSchema';
import { Service } from '../schemas/ServiceSchema';
import { getRealm } from '../RealmConfig';
import Realm from 'realm';

class AppointmentRepository {
  async getAllAppointments(): Promise<Appointment[]> {
    const realm = await getRealm();
.
    return realm.objects<Appointment>('Appointment').sorted('date').toJSON();
  }

  async saveAppointment(appointmentData: {
    _id?: Realm.BSON.ObjectId;
    clientId: Realm.BSON.ObjectId; 
    serviceId: Realm.BSON.ObjectId; 
    barberName: string;
    status: string;
  }): Promise<Appointment> {
    const realm = await getRealm();
    let appointment: Appointment;
    realm.write(() => {
      const client = realm.objectForPrimaryKey<Client>('Client', appointmentData.clientId);
      const service = realm.objectForPrimaryKey<Service>('Service', appointmentData.serviceId);

      if (!client || !service) {
        throw new Error('Cliente ou Serviço não encontrado para o agendamento.');
      }

      appointment = realm.create<Appointment>('Appointment', {
        _id: appointmentData._id || new Realm.BSON.ObjectId(),
        client: client,
        service: service,
        date: appointmentData.date,
        barberName: appointmentData.barberName,
        status: appointmentData.status,
      }, Realm.UpdateMode.Modified);
    });
    return appointment!;
  }

  async deleteAppointment(id: Realm.BSON.ObjectId): Promise<void> {
    const realm = await getRealm();
    realm.write(() => {
      const appointment = realm.objectForPrimaryKey<Appointment>('Appointment', id);
      if (appointment) {
        realm.delete(appointment);
      }
    });
  }
}

export default new AppointmentRepository();
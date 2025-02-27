// Rental Model
import {Vehicle} from './vehicle.model';
import {Client} from './client.model';

export interface Rental {
  id: number;
  startDate: string;
  endDate: string;
  totalDurationMinutes: number;
  totalPrice: number;
  vehicle: Vehicle;
  client: Client;
  pickUpLocation: Location;
  dropOffLocation: Location;
}

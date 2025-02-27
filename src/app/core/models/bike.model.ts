// Bike Model (extends Vehicle)
import {Vehicle} from './vehicle.model';

export interface Bike extends Vehicle {
  id: number;
  rangeKm: number;
}

// Scooter Model (extends Vehicle)
import {Vehicle} from './vehicle.model';

export interface Scooter extends Vehicle {
  id: number;
  maxSpeedKmh: number;
}

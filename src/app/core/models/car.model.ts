// Car Model (extends Vehicle)
import {Vehicle} from './vehicle.model';

export interface Car extends Vehicle {
  id: number;
  description: string;
}

// Rental Model
import {Vehicle} from './vehicle.model';
import {Client} from './client.model';

export interface Rental {
  id: number;
  startDate: string;
  endDate: string;
  totalDurationMinutes: number;
  totalPrice: number;
  vehicle: {
    id: number;
    acquisitionDate: string;
    purchasePrice: number;
    isBroken: boolean;
    imageUrl: string;
    model: string;
    manufacturer: {
      id: number;
      name: string;
      country: string;
      address: string;
      phoneNumber: string;
      fax: string;
      email: string;
    };
    hourlyRate: number;
  };
  client: {
    id: number;
    username: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
    cardNumber: string;
    isBlocked: boolean;
  };
  pickUpLocation: {
    id: number;
    latitude: number;
    longitude: number;
  };
  dropOffLocation: {
    id: number;
    latitude: number;
    longitude: number;
  };
}

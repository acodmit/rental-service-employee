// Vehicle Model
import {Manufacturer} from './manufacturer.model';
import {Fault} from './fault.model';

export interface Vehicle {
    id: number;
    acquisitionDate: string;
    purchasePrice: number;
    isBroken: boolean;
    imageUrl: string;
    model: string;
    manufacturer: Manufacturer;
    faults: Fault[];
    hourlyRate: number;
}

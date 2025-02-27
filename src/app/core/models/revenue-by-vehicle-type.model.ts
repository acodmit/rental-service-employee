// RevenueByVehicleType Model
import {RevenueByDay} from './revenue-by-day.model';

export interface RevenueByVehicleType {
  vehicleType: string;
  totalRevenue: number;
  revenueByDay: RevenueByDay[];
}

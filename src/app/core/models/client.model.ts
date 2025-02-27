// Client Model (extends User)
import {User} from './user.model';

export interface Client extends User {
  id: number;
  avatarUrl: string;
  cardNumber: string;
  isBlocked: boolean;
}

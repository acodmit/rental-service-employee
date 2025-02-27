// Employee Model (extends User)
import {User} from './user.model';
import {Promotion} from './promotion.model';

export interface Employee extends User {
  role: String;
  promotions: Promotion[];
}

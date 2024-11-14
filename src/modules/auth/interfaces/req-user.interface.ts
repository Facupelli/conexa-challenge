import { Role } from 'src/modules/users/enums/role.enum';

export interface ReqUser {
  id: string;
  email: string;
  roles: Role[];
}

import { Role } from 'prisma/role.enum';

export interface ReqUser {
  id: string;
  email: string;
  roles: Role[];
}

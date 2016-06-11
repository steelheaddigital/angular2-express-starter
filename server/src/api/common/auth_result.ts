import { User } from '../user/user_model';

export interface AuthResult{
  user: User,
  data: Object,
  authenticated: boolean
}
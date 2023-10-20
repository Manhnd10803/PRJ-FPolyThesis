import { IUser } from '@/models/user';

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
  refresh_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

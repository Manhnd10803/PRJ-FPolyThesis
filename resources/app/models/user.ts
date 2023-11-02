export interface IUser {
  id: number;
  username: string;
  first_name: null;
  last_name: null;
  group_id: number;
  email: string;
  birthday: null;
  avatar: null;
  phone: null;
  address: null;
  biography: null;
  gender: null;
  status: number;
  major_id: null;
  permissions: null;
  verification_code: string;
  created_at: null;
  updated_at: Date;
}

export interface IUsersAdmin {
  id: number;
  username: string;
  email: string;
  birthday: string;
  phone: string;
  gender: string;
  major_id: string;
  status: string;
}

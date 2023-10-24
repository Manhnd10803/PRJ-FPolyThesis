export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IUsersAdmin {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  birthday: string;
  biography: string;
  phone: string;
  gender: string;
  address: string;
  major_id: string;
  major: {
    majors_name: string;
  };
  status: string;
}

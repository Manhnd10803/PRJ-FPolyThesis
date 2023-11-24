export interface IUser {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  cover_photo?: string;
  group_id: number;
  email: string;
  birthday: null;
  avatar?: string;
  phone: null;
  address: null;
  biography: null;
  gender: null;
  status: number;
  major_id: null;
  majors_name?: string;
  permissions: null;
  verification_code: string;
  created_at: null;
  updated_at: Date;
}

export interface IProfileUser {
  user: IUser;
  total_blog: number;
  total_post: number;
  total_friend: number;
}

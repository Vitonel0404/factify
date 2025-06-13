export interface UserFromToken {
  id_user: number;
  user_name: string;
  db_name: string;
  email?: string;
  [key: string]: any;
}
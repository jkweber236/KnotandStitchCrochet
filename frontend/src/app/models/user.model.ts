export interface User {
  _id: string; // MongoDB's ObjectId
  username: string;
  password: string;
  email: string;
  address?: string;
}

import { Image } from './image';
import { User } from './user';

export interface Chat {
  _id: string;
  name: string;
  users: User[];
  avatar?: Image;
}

export interface Message {
  _id: string;
  user: User;
  attachedFiles: Image[];
  textContent: string;
  date: Date;
}
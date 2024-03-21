export type CardType = {
  id: string;
  boardId: string;
  title: string;
  description: string;
  author: User;
  status: Status;
  date: string;
}

export type Board = {
  id: string;
  title: string;
  author: User;
}

export enum Status {
  ToDo = 'TO-DO',
  InProgress = 'IN-PROGRESS',
  Done = 'DONE',
}

export type User = {
  fullname: string;
  email: string;
  password: string;
}

export type Comment = {
  id: string;
  cardId: string;
  text: string;
  author: User;
  date: string;
}

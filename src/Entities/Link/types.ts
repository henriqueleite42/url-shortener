export interface ICreate {
  name: string;
  code: string;
  redirectTo: string;
  createdAt: number;
  userID: string;
}

export interface IEdit {
  id: string;
  name?: string;
  code?: string;
  redirectTo?: string;
}

export interface IGetList {
  userID: string;
}

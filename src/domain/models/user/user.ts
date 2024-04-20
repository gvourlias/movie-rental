export interface IUser {
  email: number;
  username: string;
  lastName: string;
  wallet: number;
}

export class User implements IUser {
  email!: number;
  username!: string;
  lastName!: string;
  wallet!: number;

  constructor(data?: any) {
    if (data !== undefined) {
      this.email = data.email;
      this.username = data.first_name;
      this.lastName = data.last_name;
      this.wallet = data.wallet;
    }
  }
}

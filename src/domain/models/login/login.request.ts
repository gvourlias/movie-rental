export interface ILoginRequest {
  username: string;
  password: string;
}

export class LoginRequest implements ILoginRequest {
  username!: string;
  password!: string;

  public setUsername(value: string): LoginRequest {
    this.username = value;
    return this;
  }

  public setPasssword(value: string): LoginRequest {
    this.password = value;
    return this;
  }
}

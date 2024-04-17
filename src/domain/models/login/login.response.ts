export interface ILoginResponse {
  success: boolean;
  message: string;
}

export class LoginResponse implements ILoginResponse {
  public success!: boolean;
  public message!: string;
}

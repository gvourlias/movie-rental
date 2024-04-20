export interface IDepositResponse {
  deposit: number;
  success: boolean;
  message: string;
}

export class DepositResponse implements IDepositResponse {
  deposit = 0;
  success = false;
  message = '';

  constructor(data?: any) {
    this.deposit = data?.deposit ?? 0;
  }
}

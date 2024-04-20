export interface IDepositRequest {
  deposit: number;
}

export class DepositRequest implements IDepositRequest {
  deposit = 0;
}

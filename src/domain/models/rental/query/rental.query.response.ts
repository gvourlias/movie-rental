import { IRental, Rental } from '../rental.model';

export interface IRentalQueryResponse {
  count: number;
  next: string;
  previous: string;
  results: IRental[];
}

export class RentalQueryResponse implements IRentalQueryResponse {
  count!: number;
  next!: string;
  previous!: string;
  results!: IRental[];

  constructor(data?: any) {
    this.count = data?.count ?? 0;
    this.next = data?.next ?? '';
    this.previous = data?.previous ?? '';
    this.results = data?.results?.map((x: any) => new Rental(x)) ?? [];
  }
}

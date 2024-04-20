export interface IRentalQueryRequest {
  page: number;
  page_size: number;
}

export class RentalQueryRequest implements IRentalQueryRequest {
  page = 0;
  page_size = 20;
}

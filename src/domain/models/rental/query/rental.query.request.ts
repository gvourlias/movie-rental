export interface IRentalQueryRequest {
  page: number;
  page_size: number;
  only_active: boolean;
}

export class RentalQueryRequest implements IRentalQueryRequest {
  page = 0;
  page_size = 20;
  only_active = false;
}

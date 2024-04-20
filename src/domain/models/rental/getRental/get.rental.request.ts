export interface IGetRentalRequest {
  rental_uuid: string;
}

export class GetRentalRequest implements IGetRentalRequest {
  rental_uuid!: string;

  constructor(rental_uuid?: string) {
    this.rental_uuid = rental_uuid ?? '';
  }
}

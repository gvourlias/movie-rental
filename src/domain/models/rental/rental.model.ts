export interface IRental {
  uuid: string;
  rentalDate: string;
  returnDate: string;
  isPaid: boolean;
  user: number | undefined;
  movie: string;
  charge: number;
}

export class Rental implements IRental {
  uuid!: string;
  rentalDate!: string;
  returnDate!: string;
  isPaid!: boolean;
  user!: number | undefined;
  movie!: string;
  charge = 0;

  constructor(data?: any) {
    this.uuid = data?.uuid ?? '';
    this.rentalDate = data?.rental_date ?? '';
    this.returnDate = data?.return_date ?? '';
    this.isPaid = data?.is_paid ?? false;
    this.user = data?.user ?? undefined;
    this.movie = data?.movie ?? '';
    this.charge = data?.charge ?? 0;
  }
}

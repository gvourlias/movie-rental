export interface IRental {
  uuid: string;
  rentalDate: string;
  returnDate: string;
  isPaid: boolean;
  user: number | undefined;
  movieId: string;
}

export class Rental implements IRental {
  uuid!: string;
  rentalDate!: string;
  returnDate!: string;
  isPaid!: boolean;
  user!: number | undefined;
  movieId!: string;

  constructor(data?: any) {
    this.uuid = data?.uuid ?? '';
    this.rentalDate = data?.rental_date ?? '';
    this.returnDate = data?.return_date ?? '';
    this.isPaid = data?.is_paid ?? false;
    this.user = data?.user ?? undefined;
    this.movieId = data?.movie ?? '';
  }
}

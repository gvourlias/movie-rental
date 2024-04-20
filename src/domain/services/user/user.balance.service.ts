import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserBalanceService {
  private balanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public balance$: Observable<number> = this.balanceSubject.asObservable();

  constructor() {}

  updateBalance(change: number) {
    const currentBalance = this.balanceSubject.getValue();
    const newBalance = currentBalance + change;
    this.balanceSubject.next(newBalance);
  }
}

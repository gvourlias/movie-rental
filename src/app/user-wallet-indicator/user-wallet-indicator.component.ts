import { Component, OnInit } from '@angular/core';
import { User } from '@models';
import { UserService } from 'src/domain/services/user';
import { UserBalanceService } from 'src/domain/services/user/user.balance.service';

@Component({
  selector: 'app-user-wallet-indicator',
  templateUrl: './user-wallet-indicator.component.html',
  styleUrls: ['./user-wallet-indicator.component.scss'],
})
export class UserWalletIndicatorComponent implements OnInit {
  balance = 0;

  constructor(
    private userBalanceService: UserBalanceService
  ) {}

  ngOnInit(): void {
    this.userBalanceService.balance$.subscribe((balance) => {
      this.balance = balance;
    });
  }
}

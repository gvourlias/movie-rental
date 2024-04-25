import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/domain/services/user';
import { UserBalanceService } from 'src/domain/services/user/user.balance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public username!: string;

  constructor(
    private userService: UserService,
    private userBalanceService: UserBalanceService
  ) {}

  ngOnInit(): void {
    this.userService.fetchUserProfile().subscribe((user) => {
      this.username = user.username;
      this.userBalanceService.updateBalance(user.wallet);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@facade';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  
  constructor(private router: Router, private authFacade: AuthFacade) {
    this.authFacade.logout();
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  public countdown: number = 10;
  startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
    }, 1000);
  }
}

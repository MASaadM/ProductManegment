import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`

.btn-default {
  font-family: Raleway-SemiBold;
  font-size: 13px;
  color: rgba(108, 88, 179, 0.75);
  letter-spacing: 1px;
  line-height: 15px;
  border: 2px solid rgba(108, 89, 179, 0.75);
  border-radius: 40px;
  background: transparent;
  transition: all 0.3s ease 0s;
}
`]
})
export class HomeComponent {
  constructor(private router: Router) { }
  route(destination: string) {
    this.router.navigate([destination]);
  }
}

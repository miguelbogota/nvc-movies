import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showBackButton = false;

  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((u: NavigationStart) => {
        this.showBackButton = u.url.includes('/show/') ? true : false;
      });
  }

  ngOnInit(): void {
  }

}

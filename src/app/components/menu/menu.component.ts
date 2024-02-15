import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  route: boolean =  false;

  constructor(private router: Router){}

  ngOnInit(){
    if (this.router.url === '/') {
      this.route = true;
    }
  }
}

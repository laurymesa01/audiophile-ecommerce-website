import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  modal: boolean = false;
  route: boolean =  false;

  constructor(private router: Router,
              private modalsService: ModalsService){}

  ngOnInit(){
    if (this.router.url === '/') {
      this.route = true;
    }
    this.modalsService.currentModal$.subscribe(modal => this.modal = modal);
  }
}

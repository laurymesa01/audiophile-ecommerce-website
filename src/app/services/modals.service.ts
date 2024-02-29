import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private modal = new BehaviorSubject<boolean>(false);
  public currentModal$ = this.modal.asObservable();
  private category = new BehaviorSubject<string>('');
  public currentCategory$ = this.category.asObservable();

  constructor() { }

  toggleModal(modal: boolean){
    this.modal.next(modal);
  }

  goToCategory(category: string){
    this.category.next(category);
  }

  // changeStyle(){

  // }
}

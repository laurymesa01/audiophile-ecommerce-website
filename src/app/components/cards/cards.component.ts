import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  categories: any[] = [
    {
      category: 'Headphones',
      imgCategory: '../../../assets/shared/desktop/image-category-thumbnail-headphones.png',
    },
    {
      category: 'Speakers',
      imgCategory: '../../../assets/shared/desktop/image-category-thumbnail-speakers.png'
    },
    {
      category: 'Earphones',
      imgCategory: '../../../assets/shared/desktop/image-category-thumbnail-earphones.png'
    },
  ];


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute,private router: Router){}

  ngOnInit(){
    const route = this.router.url;
    console.log(route);


  }

}

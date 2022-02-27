import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  active = "discover";

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(this.router.url === "/"){
      this.active = "discover"
    }else if(this.router.url.includes("browse")){
      this.active = "browse";
    }
  }
}

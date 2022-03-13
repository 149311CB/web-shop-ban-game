import {Component, Input, OnInit} from '@angular/core';
import {GameDetail} from "../ProductDetailUtils";

@Component({
  selector: 'app-brief-info',
  templateUrl: './brief-info.component.html',
  styleUrls: ['./brief-info.component.scss']
})
export class BriefInfoComponent extends GameDetail implements OnInit {

  @Input() product: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}

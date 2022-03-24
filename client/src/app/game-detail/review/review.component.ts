import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() reviews$: Observable<any> | undefined;

  @Input() classifications: any[] | undefined;

  constructor() {}

  ngOnInit(): void {}
}

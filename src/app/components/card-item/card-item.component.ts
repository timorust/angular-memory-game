import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardInterface} from "../../card.interface";

@Component({
  selector: 'ag-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() cards: CardInterface;
  @Output() checkCard$ = new EventEmitter(null);

  constructor() { }

  ngOnInit(): void {
  }


  checkCard() {
    this.checkCard$.emit(this.cards);
  }

}

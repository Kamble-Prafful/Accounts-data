import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() dataSource!: any;
  @Input() displayedColumns!: any;
  objectKeys = Object.keys;

  @Output() editItem: EventEmitter<number> = new EventEmitter();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();
  @Output() depositItem: EventEmitter<number> = new EventEmitter();
  @Output() withdrawItem: EventEmitter<number> = new EventEmitter();

  onEdit(id: number) {
    this.editItem.emit(id);
  }

  onDelete(id: number) {
    this.deleteItem.emit(id);
    console.log(id);
  }

  onAdd(id: number) {
    this.depositItem.emit(id);
  }
  onWithdraw(id: number) {
    this.withdrawItem.emit(id);
  }
}

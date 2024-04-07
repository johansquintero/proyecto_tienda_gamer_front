import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchValueEvent = new EventEmitter<String>();
  public onSearch(value:string){
    this.searchValueEvent.emit(value);
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'search',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() searchValueEvent = new EventEmitter<String>();

  public onSearch(value: string) {
    this.searchValueEvent.emit(value);
  }

  public onKeyDownSearch(value: string, event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchValueEvent.emit(value);
    }
  }
}

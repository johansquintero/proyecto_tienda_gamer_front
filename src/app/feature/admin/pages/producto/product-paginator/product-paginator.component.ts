import { Router } from '@angular/router';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'product-paginator',
  templateUrl: './product-paginator.component.html',
  styleUrls: ['./product-paginator.component.css']
})
export class ProductPaginatorComponent {
  @Input() paginator: any;
  paginas!: number[];
  desde!: number;
  hasta!: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initPaginator();
  }
  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginator'];
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }
  public initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginator.number - 2), this.paginator.totalPages - 7);
    this.hasta = Math.min(this.paginator.totalPages, this.desde + 7);
    if (this.paginator.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }
  public goPage(page: number): void {
    if (isNaN(page)) {
      page = 0
    }
    this.router.navigate(['admin'], { queryParams: { page: page } });
  }
}

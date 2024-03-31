import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PaginatorComponent {
  @Input() paginator: any;
  paginas!: number[];
  desde!: number;
  hasta!: number;
  actualPath:string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initPaginator();
  }
  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginator'];
    this.actualPath = this.router.routerState.snapshot.url.split('?')[0];
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
    //console.log(this.actualPath);
    this.router.navigate([this.actualPath], { queryParams: { page: page } });
  }
}

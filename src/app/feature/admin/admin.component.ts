import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

interface MenuNode {
	name: string;
	path: string; //atributo de la ruta para poder navegar a travez de los nodos generados
	children?: MenuNode[];
}

const TREE_DATA: MenuNode[] = [
	{
		name: 'Productos',
		path: '/',
		children: [
			{ name: 'Ver productos', path: '/' },
			{ name: 'Registrar producto', path: '/producto-form' }
		]
	},
	{
		name: 'Marcas',
		path: '/marca',
		children: [
			{ name: 'Ver Marcas', path: '/marca' },
			{ name: 'Registrar marca', path: '/marca-form' }
		]
	},
	{
		name: 'Tipos',
		path: '/tipo',
		children: [
			{ name: 'Ver tipos', path: '/tipo' },
			{ name: 'Registrar tipo', path: '/tipo-form' }
		]
	}
];
@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	treeControl = new NestedTreeControl<MenuNode>((node) => node.children);
	dataSource = new MatTreeNestedDataSource<MenuNode>();

	//elementos para el side nav
	public collapse: boolean = false;
	@ViewChild('side') sideDrawer!: MatDrawer;

	constructor(private router: Router, private mediaMatcher: MediaMatcher) {
		this.dataSource.data = TREE_DATA;
	}

	ngOnInit(): void {
		if (this.sideDrawer) {
			this.activeCollapse();
		}
	}

	hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

	public navigate(path: string): void {
		let completedPath = `/admin${path}`;
		this.router.navigate([completedPath]);
	}

	/**
	 * Se escuchar cambios en el tamaño de la ventana mediante el evento resize del objeto window.
	 * Esto puede ayudar a evitar la ralentización relacionada con el uso de matchMedia.
	 * @param event
	 */
	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.activeCollapse();
	}
	activeCollapse() {
		this.collapse = window.innerWidth <= 1200;
		if (this.collapse) {
			this.sideDrawer.close();
		} else {
			this.sideDrawer.open();
		}
	}
}

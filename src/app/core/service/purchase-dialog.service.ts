import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompraRequestDto } from '../dto/compra/compraRequestDto';
import { PurchaseDialogComponent } from 'src/app/feature/home/pages/purchase-dialog/purchase-dialog.component';
import { CartResponseDto } from '../dto/cart/cartResponseDto';
import { ProductoCartDto } from '../dto/produto/poductoCartDto';

@Injectable({
	providedIn: 'root'
})
export class PurchaseDialogService {
	constructor(private matDialog: MatDialog) {}

	public openDialog(compra: CompraRequestDto,cart:CartResponseDto, cartList:ProductoCartDto[]) {
		this.matDialog.open(PurchaseDialogComponent, {
			data:{
        compra:compra,
        cart:cart,
		cartList:cartList
      }
		});
	}
  public closeDialog(){
    this.matDialog.closeAll();
  }
}

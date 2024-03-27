import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CartResponseDto } from '../dto/cart/cartResponseDto';
import { CartRequestDto } from '../dto/cart/cartRequestDto';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) {}
  
  public getByUserId(customerId:number):Observable<CartResponseDto>{
    return this.http.get<CartResponseDto>(`${apiUrl}carrito/customer-id/${customerId}`);
  }

  public update(cart:CartRequestDto):Observable<CartResponseDto>{
    return this.http.put<CartResponseDto>(`${apiUrl}carrito`,cart);
  }
  

}

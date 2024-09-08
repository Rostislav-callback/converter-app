import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyData } from '../interfaces/currency-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private mainUrl = `https://v6.exchangerate-api.com/v6/872a6c8c03e61c585df12312/latest/`;

  constructor(private http: HttpClient) {}

  getCurrencyData(country: string): Observable<CurrencyData> {
    let url = `${this.mainUrl}${country}`;

    return this.http.get<CurrencyData>(url);
  }

  getUsdToUah(): Observable<CurrencyData> {
    let url = `${this.mainUrl}USD`;

    return this.http.get<CurrencyData>(url);
  }

  getEurToUah(): Observable<CurrencyData> {
    let url = `${this.mainUrl}EUR`;

    return this.http.get<CurrencyData>(url);
  }
}
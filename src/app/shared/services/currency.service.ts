import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CurrencyData } from '../interfaces/currency-data.interface';
import { curencyCodeUSD, currencyCodeEUR, currencyCodeUAH } from '../constants/currencies';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private mainUrl = 'https://api.monobank.ua/bank/currency';
  private currencyDataSunject$: BehaviorSubject<CurrencyData[]> = new BehaviorSubject<CurrencyData[]>([]);

  constructor(private http: HttpClient) {}

  getCurrencyData(): Observable<CurrencyData[]> {
    return this.http.get<CurrencyData[]>(this.mainUrl)
      .pipe(
        map(data => {
          const currencies = data.filter(curr => {
            return curr.currencyCodeA === curencyCodeUSD || curr.currencyCodeA === currencyCodeEUR
              || curr.currencyCodeB === curencyCodeUSD || curr.currencyCodeB === currencyCodeEUR;
          })

          console.log(currencies)

          return currencies;
        }),
        tap(data => this.addCurrencyData(data)),
      );
  }

  getCurrencyDataState(): Observable<CurrencyData[]> {
    return this.currencyDataSunject$.asObservable();
  }

  private addCurrencyData(currencies: CurrencyData[]): void {
    this.currencyDataSunject$.next(currencies);
  }
}
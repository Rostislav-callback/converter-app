import { Component, OnInit } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { CurrencyData } from 'src/app/shared/interfaces/currency-data.interface';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { curencyCodeUSD, currencyCodeEUR, currencyCodeUAH } from 'src/app/shared/constants/currencies';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  usdToUAH = 0;
  eurToUAH = 0;

  currencyData$!: Observable<CurrencyData[]>;

  constructor(private currencyService: CurrencyService) {
    this.currencyData$ = this.getCurrancyData();
  }

  getCurrancyData(): Observable<CurrencyData[]> {
    return this.currencyService.getCurrencyData().pipe(
      tap(value => this.initHeaderCurrencies(value))
    );
  }

  private initHeaderCurrencies(currencyData: CurrencyData[]): void {
    currencyData.forEach(curr => {
      if (curr.currencyCodeB === currencyCodeUAH) {
        if (curr.currencyCodeA === curencyCodeUSD) {
          this.usdToUAH = curr.rateBuy;
        }

        if (curr.currencyCodeA === currencyCodeEUR) {
          this.eurToUAH = curr.rateBuy;
        }
      }
    })
  }
}
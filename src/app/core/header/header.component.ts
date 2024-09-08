import { Component, OnInit } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { currencyUAH } from 'src/app/shared/constants/currencies';
import { CurrencyData } from 'src/app/shared/interfaces/currency-data.interface';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  usdToUAH = 0;
  eurToUAH = 0;

  constructor(private currencyService: CurrencyService) {}

  getUsdToUAH(): Observable<CurrencyData> {
    return this.currencyService.getUsdToUah().pipe(
      tap(data => {
        this.usdToUAH = data.conversion_rates[currencyUAH];
      })
    )
  }

  getEurToUAH(): Observable<CurrencyData> {
    return this.currencyService.getEurToUah().pipe(
      tap(data => {
        this.eurToUAH = data.conversion_rates[currencyUAH];
      })
    )
  }
}
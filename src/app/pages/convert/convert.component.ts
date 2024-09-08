import { Component, OnInit } from '@angular/core';


import { Observable, tap } from 'rxjs';
import { CurrencyData } from 'src/app/shared/interfaces/currency-data.interface';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})

export class ConvertComponent implements OnInit {
  currencyData$!: Observable<CurrencyData>;

  constructor(private currencyService: CurrencyService) {
    this.currencyData$ = this.getCurrancyData();
  }

  ngOnInit(): void {
    
  }

  getCurrancyData(): Observable<CurrencyData> {
    return this.currencyService.getCurrencyData('EUR').pipe(
      tap(value => console.log(value))
    );
  }
}
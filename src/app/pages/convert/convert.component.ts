import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { filter, Observable, Subscription, tap } from 'rxjs';

import { CurrencyData } from 'src/app/shared/interfaces/currency-data.interface';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})

export class ConvertComponent implements OnInit, OnDestroy {
  defoultCurrencyTo!: number;
  currencyData!: CurrencyData[];
  currencyDataSubject$!: Observable<CurrencyData[]>;
  convertFromFormChangesSubscription$!: Subscription;
  convertToFormChangesSubscription$!: Subscription;
  convertFromForm: FormGroup = new FormGroup({
    currencyFromCount: new FormControl('1'),
    currencyFromName: new FormControl('840')
  });
  convertToForm: FormGroup = new FormGroup({
    currencyToCount: new FormControl('40.9'),
    currencyToName: new FormControl('980')
  });

  constructor(private currencyService: CurrencyService) {
    this.currencyDataSubject$ = this.getCurrencyState();
  }

  ngOnInit(): void {
    this.convertFromFormChangesSubscribe();
    this.convertToFormChangesSubscribe();
  }

  ngOnDestroy(): void {
    this.convertFromFormChangesSubscription$.unsubscribe();
    this.convertToFormChangesSubscription$.unsubscribe();
  }

  changeCurrencyNameFrom(event: any): void {
    const countFrom = +this.convertFromForm.get('currencyFromCount')?.value;
    const countToCode = +this.convertToForm.get('currencyToName')?.value;
    const countFromCode = +event.value;
    const result = this.convertCurrency(countFrom, countFromCode, countToCode);

    this.convertToForm.get('currencyToCount')?.setValue(result);
  }

  changeCurrencyNameTo(event: any): void {
    const countTo = +this.convertToForm.get('currencyToCount')?.value;
    const countFromCode = +this.convertFromForm.get('currencyFromName')?.value;
    const countToCode = +event.value;
    const result = this.convertFromCurrency(countTo, countFromCode, countToCode);

    this.convertFromForm.get('currencyFromCount')?.setValue(result);
  }

  private convertCurrency(currencyValue: number, currencyFromCode: number, currencyToCode: number): number {
    if (currencyFromCode === currencyToCode) {
      return currencyValue * 1;
    } else {
      const currencyValues = [...this.currencyData];
      const currentCurrancy = currencyValues
        .filter(curr => curr.currencyCodeA === currencyFromCode && curr.currencyCodeB === currencyToCode);

      if (!!currentCurrancy.length) {
        return +(currencyValue * currentCurrancy[0].rateBuy).toFixed(2);
      } else {
        const reverseCurrancy = currencyValues
        .filter(curr => curr.currencyCodeA === currencyToCode && curr.currencyCodeB === currencyFromCode);

        return +(currencyValue / reverseCurrancy[0].rateBuy).toFixed(2);
      }
    }
  }

  private convertFromCurrency(currencyValue: number, currencyFromCode: number, currencyToCode: number): number {
    if (currencyFromCode === currencyToCode) {
      return currencyValue * 1;
    } else {
      const currencyValues = [...this.currencyData];
      const currentCurrancy = currencyValues
        .filter(curr => curr.currencyCodeA === currencyFromCode && curr.currencyCodeB === currencyToCode);

      if (!!currentCurrancy.length) {
        return +(currencyValue / currentCurrancy[0].rateBuy).toFixed(2);
      } else {
        const reverseCurrancy = currencyValues
        .filter(curr => curr.currencyCodeA === currencyToCode && curr.currencyCodeB === currencyFromCode);

        return +(currencyValue * reverseCurrancy[0].rateBuy).toFixed(2);
      }
    } 
  }

  private convertFromFormChangesSubscribe(): void {
    this.convertFromFormChangesSubscription$ = this.convertFromForm.valueChanges
      .subscribe(value => {
        if (!this.convertFromForm.get('currencyFromCount')?.pristine) {
          const convertToCurrencyCode = this.convertToForm.get('currencyToName')?.value;
          const result = this.convertCurrency(+value.currencyFromCount, +value.currencyFromName, +convertToCurrencyCode);

          this.convertToForm.get('currencyToCount')?.setValue(result);
          this.convertFromForm.get('currencyFromCount')?.markAsPristine();
        }
      });
  }

  private convertToFormChangesSubscribe(): void {
    this.convertToFormChangesSubscription$ = this.convertToForm.valueChanges
      .subscribe(value => {   
        if (!this.convertToForm.get('currencyToCount')?.pristine) {
          const convertFromCurrencyCode = this.convertFromForm.get('currencyFromName')?.value;
          const result = this.convertFromCurrency(+value.currencyToCount, +convertFromCurrencyCode, +value.currencyToName);

          this.convertFromForm.get('currencyFromCount')?.setValue(result);
          this.convertToForm.get('currencyToCount')?.markAsPristine();
        }
      });
  }

  private getCurrencyState(): Observable<CurrencyData[]> {
    return this.currencyService
      .getCurrencyDataState()
      .pipe(
        filter(data => !!data.length),
        tap(data => this.currencyData = data),
      );
  }
}
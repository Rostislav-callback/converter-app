export interface CurrencyData {
    base_code: string;
    conversion_rates: Rate;
    documentation: string;
    result: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utcresult: string;
    time_next_update_unix: number;
    time_next_update_utcresult: string;
}

interface Rate {
    [key:string]: number;
}
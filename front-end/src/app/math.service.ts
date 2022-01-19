import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // WHy is this here?
})
export class MathService {

    constructor() { }

    getYearsAndMonths = (periodInMonths: number): { years: number, months: number } => {
        const years = Math.floor(periodInMonths / 12);
        const months = periodInMonths % 12;
        return {
            years,
            months
        };
    }

    round = (value: number, precision: number): number => {
        const decimals = Math.pow(10, precision);
        return Math.round(value * decimals) / decimals;
    }

    getPercent = (amount: number, total: number): number => {
        if (amount === 0 || total === 0) {
            return 0;
        }
        return this.round(amount / total * 100, 2);
    }    
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryListService {
  countryList = [
    { name: 'India', code: 'in', dialCode: '+91' },
    { name: 'United States', code: 'us', dialCode: '+1' },
    { name: 'United Kingdom', code: 'gb', dialCode: '+44' },
    { name: 'Canada', code: 'ca', dialCode: '+1' },
    { name: 'Australia', code: 'au', dialCode: '+61' }
  ];

  getCountries() {
    return this.countryList;
  }
}
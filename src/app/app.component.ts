import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { CountryListService } from './country-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  phoneForm!: FormGroup;
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryListService
  ) {}

  ngOnInit() {
    this.countries = this.countryService.getCountries();

    this.phoneForm = this.fb.group({
      phones: this.fb.array([this.createPhoneGroup()])
    });
  }

  get phones(): FormArray {
    return this.phoneForm.get('phones') as FormArray;
  }

  createPhoneGroup(): FormGroup {
    return this.fb.group({
      country: [this.countries[0], Validators.required],
      phone: ['', Validators.required]
    });
  }

  addPhone() {
    this.phones.push(this.createPhoneGroup());
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  isValid(index: number): boolean {
    const group = this.phones.at(index) as FormGroup;
    const fullPhone = group.value.country.dialCode + group.value.phone;
    return isValidPhoneNumber(fullPhone);
  }

  getFullPhone(index: number): string {
    const group = this.phones.at(index) as FormGroup;
    return group.value.country.dialCode + group.value.phone;
  }

  onSubmit() {
  if (this.phoneForm.valid) {
    const validPhones: string[] = [];
    this.phones.controls.forEach((group, index) => {
      const fullPhone = this.getFullPhone(index);
      if (isValidPhoneNumber(fullPhone)) {
        validPhones.push(fullPhone);
      }
    });

    if (validPhones.length === this.phones.length) {
      alert(`Valid Phone Numbers:\n${validPhones.join('\n')}`);
    } else {
      alert('Some phone numbers are invalid');
    }
  }
}

}

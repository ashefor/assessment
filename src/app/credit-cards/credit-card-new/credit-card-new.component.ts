import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CreditCard } from '../credit-card';
import * as CreditCardActions from '../../state/card.action';
import { getIsAddingNewCard, getIsDoneAddingCard } from 'src/app/state/card.reducer';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-new',
  templateUrl: './credit-card-new.component.html',
  styleUrls: ['./credit-card-new.component.scss']
})
export class CreditCardNewComponent implements OnInit, OnDestroy {
  resetSubscription: Subscription;
  addPaymentForm: FormGroup;
  isAddingNewCard$: Observable<boolean>;
  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.formInit()
    this.isAddingNewCard$ = this.store.select(getIsAddingNewCard)
    this.resetSubscription = this.store.select(getIsDoneAddingCard).subscribe(() => this.addPaymentForm.reset())
  }

  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
  }
  formInit() {
    this.addPaymentForm = this.fb.group({
      cardHolder: [null, [Validators.required]],
      cardNumber: [null, [Validators.required, Validators.pattern("[0-9\s]{12}")]],
      expiry: [null, this.expiryDateValidator],
      ccv: [null, [Validators.pattern("[0-9\s]{3}")]],
      amount: [null, [Validators.required, Validators.min(1)]],
    })
  }

  get formControls() {
    return this.addPaymentForm.controls;
  }

  saveNewCard(formValue: CreditCard) {
    if (this.addPaymentForm.valid) {
      console.log(formValue)
      this.store.dispatch(CreditCardActions.createCard({ card: formValue }));
    }
  }

  expiryDateValidator = (control: FormControl): { [error: string]: boolean } => {
    const expiryDate = control.value;
    const currentDate = new Date(Date.now()).getTime();
    const formattedDate = new Date(expiryDate).getTime();
    if (!expiryDate) {
      return { error: true, required: true }
    }
    else if (formattedDate - currentDate < 0) {
      return { error: true, hasExpired: true }
    }
    return {}
  }

  cancelCardAddition() {
this.router.navigate(['/'])
  }
}

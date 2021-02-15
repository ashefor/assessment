import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state/app.state';
import { getCards, getIsLoadingCards, getError } from './state/card.reducer';
import * as CreditCardActions from './state/card.action';
import { CreditCard } from './credit-cards/credit-card';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'assessment';
  cards$: Observable<CreditCard[]>;
  errorMessage$: Observable<string>;
  isLoadingCards$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(CreditCardActions.loadCards())
    this.cards$ = this.store.select(getCards);
    this.isLoadingCards$ = this.store.select(getIsLoadingCards)
    this.errorMessage$ = this.store.select(getError);
  }

  navigateToPayments() {
    this.router.navigate(['/new-card'])
  }
}

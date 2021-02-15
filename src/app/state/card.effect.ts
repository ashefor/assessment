import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { CreditCardService } from '../credit-cards/services/credit-card.service';
import * as CreditCardActions from './card.action';
@Injectable({providedIn: 'root'})
export class CardEffects {
    constructor(private actions$: Actions, private cardService: CreditCardService) { }

    loadCards$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CreditCardActions.loadCards),
            mergeMap(() => this.cardService.getCreditCards().pipe(
                map(cards => CreditCardActions.loadCardSuccess({cards})),
                catchError(error => of(CreditCardActions.loadCardFailure({error})))
            ))
        );
    });


    createCard$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CreditCardActions.createCard),
            concatMap(action => this.cardService.createCard(action.card).pipe(
                map(card => CreditCardActions.createCardSuccess({card})),
                catchError(error => of(CreditCardActions.createCardFailure({error})))
            ))
        );
    });
}

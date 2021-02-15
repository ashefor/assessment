import { createAction, props } from '@ngrx/store';
import { CreditCard } from '../credit-cards/credit-card';

export const loadCards = createAction(
    '[Card API] Load Cards',
);

export const loadCardSuccess = createAction(
    '[Card API] Load Cards Success',
    props<{cards: CreditCard[]}>()
);

export const loadCardFailure = createAction(
    '[Card API] Load Cards Failure',
    props<{error: string}>()
);

export const createCard = createAction(
    '[Card API] Create Card',
    props<{card: CreditCard}>()
);

export const createCardSuccess = createAction(
    '[Card API] Create Card Success',
    props<{card: CreditCard}>()
);

export const createCardFailure = createAction(
    '[Card API] Create Card Failure',
    props<{error: string}>()
);

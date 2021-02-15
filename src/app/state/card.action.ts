import { createAction, props } from "@ngrx/store";
import { CreditCard } from "../credit-cards/credit-card";

export const loadCards = createAction(
    '[Card API] Load Cards',
)

export const loadCardSuccess = createAction(
    '[Card API] Load Cards Success',
    props<{cards: CreditCard[]}>()
)

export const loadCardFailure = createAction(
    '[Card API] Load Cards Failure',
    props<{error: string}>()
)

export const createCard = createAction(
    '[Card API] Create Card',
    props<{card: CreditCard}>()
)

export const createCardSuccess = createAction(
    '[Card API] Create Card Success',
    props<{card: CreditCard}>()
)

export const createCardFailure = createAction(
    '[Card API] Create Card Failure',
    props<{error: string}>()
)

export const updateCard = createAction(
    '[Card API] Update Card',
    props<{card: CreditCard}>()
)

export const updateCardSuccess = createAction(
    '[Card API] Update Card Success',
    props<{card: CreditCard}>()
)

export const updateCardFailure = createAction(
    '[Card API] Update Card Failure',
    props<{error: string}>()
)

export const deleteCard = createAction(
    '[Card API] Delete Card',
    props<{cardId : number}>()
)

export const deleteCardSuccess = createAction(
    '[Card API] Delete Card Success',
    props<{cardId : number}>()
)

export const deleteCardFailure = createAction(
    '[Card API] Delete Card Failure',
    props<{error: string}>()
)
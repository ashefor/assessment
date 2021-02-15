import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { CreditCard } from "../credit-cards/credit-card";
import * as CreditCardActions from './card.action';
export interface CardState {
    currentCardId: number | null;
    isAddingCard: boolean,
    isLoadingCards: boolean,
    isDoneAddingCard: boolean,
    cards: CreditCard[],
    error: string,
}

const initialState: CardState = {
    isAddingCard: false,
    isLoadingCards: false,
    isDoneAddingCard: false,
    currentCardId: null,
    cards: [],
    error: ''
}

const getCardFeatureState = createFeatureSelector<CardState>('cards')

export const getIsLoadingCards = createSelector(
    getCardFeatureState,
    state => state.isLoadingCards
)

export const getCards = createSelector(
    getCardFeatureState,
    state => state.cards,
)

export const getError = createSelector(
    getCardFeatureState,
    state => state.error
)

export const getCurrentCardId = createSelector(
    getCardFeatureState,
    state => state.currentCardId
)

export const getIsAddingNewCard = createSelector(
    getCardFeatureState,
    state => state.isAddingCard
)

export const getIsDoneAddingCard = createSelector(
    getCardFeatureState,
    state => state.isDoneAddingCard
)

export const cardReducer = createReducer<CardState>(
    initialState,
    on(CreditCardActions.loadCards, (state, action): CardState => {
        return {
            ...state,
            isLoadingCards: true,
        }
    }),
    on(CreditCardActions.loadCardSuccess, (state, action): CardState => {
        return {
            ...state,
            cards: action.cards,
            isLoadingCards: false,
            error: ''
        }
    }),
    on(CreditCardActions.loadCardFailure, (state, action): CardState => {
        return {
            ...state,
            cards: [],
            error: action.error,
            isLoadingCards: false,
        }
    }),
    on(CreditCardActions.createCard, (state, action): CardState => {
        return {
            ...state,
            isAddingCard: true,
            isDoneAddingCard: false,
        }
    }),
    on(CreditCardActions.createCardSuccess, (state, action): CardState => {
        return {
            ...state,
            cards: [...state.cards, action.card],
            currentCardId: action.card.id,
            isAddingCard: false,
            isDoneAddingCard: true,
            error: ''
        }
    }),
    on(CreditCardActions.createCardFailure, (state, action): CardState => {
        return {
            ...state,
            error: action.error,
            isAddingCard: false,
            isDoneAddingCard: false,
        }
    }),
    on(CreditCardActions.updateCardSuccess, (state, action): CardState => {
        const updatedCards = state.cards.map(item => action.card.id === item.id ? action.card : item)
        return {
            ...state,
            cards: updatedCards,
            currentCardId: action.card.id,
            error: ''
        }
    }),
    on(CreditCardActions.updateCardFailure, (state, action): CardState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(CreditCardActions.deleteCardSuccess, (state, action): CardState => {
        return {
            ...state,
            cards: [...state.cards.filter(item => item.id != action.cardId)],
            currentCardId: null,
            error: ''
        }
    }),
    on(CreditCardActions.deleteCardFailure, (state, action): CardState => {
        return {
            ...state,
            error: action.error
        }
    }),
)
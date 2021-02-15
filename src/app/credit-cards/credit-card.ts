export interface CreditCard {
    id: number | null;
    cardHolder: string;
    cardNumber: string;
    expiry: string;
    ccv?: string;
    amount: number;
}

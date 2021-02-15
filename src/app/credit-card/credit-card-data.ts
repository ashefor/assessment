import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CreditCard } from './credit-card';


export class CreditCardData implements InMemoryDbService {

    createDb() {
        const cards: CreditCard[] = [
            {
                id: 1,
                cardHolder: 'Leaf Rake',
                cardNumber: '45001234567',
                expiry: '2021-02',
                ccv: null,
                amount: 450000
            },
            {
                id: 2,
                cardHolder: 'Jane Doe',
                cardNumber: '67891234567',
                expiry: '2021-08',
                ccv: null,
                amount: 570000
            },
        ];
        return { cards };
    }
}

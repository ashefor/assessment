import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from '../credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private creditCardUrl = 'api/cards';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getCreditCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.creditCardUrl).pipe(
      catchError(this.handleError)
    )
  }


  createCard(card: CreditCard): Observable<CreditCard> {
    const newCard = { ...card, id: null };
    return this.http.post<CreditCard>(this.creditCardUrl, newCard)
      .pipe(
        tap(data => this.toastr.success('Added successfully')),
        catchError(this.handleError)
      );
  }


  updateCard(card: CreditCard): Observable<CreditCard> {
    const url = `${this.creditCardUrl}/${card.id}`;
    return this.http.put<CreditCard>(url, card)
      .pipe(
        map(() => card),
        catchError(this.handleError)
      );
  }


  deleteCard(id: number): Observable<{}> {
    const url = `${this.creditCardUrl}/${id}`;
    return this.http.delete<CreditCard>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Database returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}


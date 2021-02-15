import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CreditCardData } from './credit-cards/credit-card-data';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { cardReducer } from './state/card.reducer';
import { CardEffects } from './state/card.effect';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(CreditCardData),
    StoreModule.forRoot({cards: cardReducer}),
    EffectsModule.forRoot([CardEffects]),
    StoreDevtoolsModule.instrument({name: 'Assessment', maxAge: 25, logOnly: environment.production }),
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

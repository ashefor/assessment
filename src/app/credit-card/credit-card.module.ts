import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardNewComponent } from './credit-card-new/credit-card-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const creditCardRoutes: Routes = [
  { path: '', component: CreditCardNewComponent}
];

@NgModule({
  declarations: [CreditCardNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(creditCardRoutes)
  ]
})
export class CreditCardModule { }

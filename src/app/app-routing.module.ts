import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'cards',
  //   pathMatch: 'full'
  // },
  {
    path: 'new-card',
    loadChildren: () => import('./credit-cards/credit-cards.module').then(m => m.CreditCardsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CustomerComponent} from "./components/customer/customer.component";
import {TransactionComponent} from "./components/transaction/transaction.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'Transactions', component: TransactionComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

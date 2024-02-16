import { Routes } from '@angular/router';
import {LoginPageComponent} from "../components/login-page/login-page.component";
import {PasswordComponent} from "../components/password/password.component";
import {ExpensesFlowComponent} from "../components/expenses-flow/expenses-flow.component";
import {ExpenseParentComponent} from "../components/expense-parent/expense-parent.component";
import {ExpenseDetailComponent} from "../components/expense-detail/expense-detail.component";
import {CreateExpenseComponent} from "../components/create-expense/create-expense.component";
import {ApiTesterComponent} from "../components/api-tester/api-tester.component";
import {ExpenseLineDetailComponent} from "../components/expense-line-detail/expense-line-detail.component";

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path : 'password', component: PasswordComponent},
  { path : 'expenses', component: ExpenseParentComponent,
  children: [
    { path : '', component: ExpensesFlowComponent},
    { path : 'detail', component: ExpenseDetailComponent },
    { path : 'detail/linedetail', component: ExpenseLineDetailComponent}
  ]},
  { path: 'create', component : CreateExpenseComponent},
  { path : 'testAPI', component : ApiTesterComponent }
];

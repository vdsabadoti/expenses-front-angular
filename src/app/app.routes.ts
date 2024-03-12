import { Routes } from '@angular/router';
import {LoginPageComponent} from "../components/login-page/login-page.component";
import {PasswordComponent} from "../components/password/password.component";
import {GroupsFlowComponent} from "../components/groups-flow/groups-flow.component";
import {ExpenseParentComponent} from "../components/expense-parent/expense-parent.component";
import {ExpenseComponent} from "../components/expense/expense.component";
import {CreateGroupComponent} from "../components/create-group/create-group.component";
import {ApiTesterComponent} from "../components/api-tester/api-tester.component";
import {ExpenseDetailComponent} from "../components/expense-detail/expense-detail.component";

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path : 'password', component: PasswordComponent},
  { path : 'expenses', component: ExpenseParentComponent,
  children: [
    { path : '', component: GroupsFlowComponent},
    { path : 'detail', component: ExpenseComponent },
    { path : 'detail/linedetail', component: ExpenseDetailComponent}
  ]},
  { path: 'create', component : CreateGroupComponent},
  { path : 'testAPI', component : ApiTesterComponent }
];

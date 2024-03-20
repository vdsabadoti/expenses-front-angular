import { Routes } from '@angular/router';
import {LoginPageComponent} from "../components/login-page/login-page.component";
import {PasswordComponent} from "../components/password/password.component";
import {GroupsFlowComponent} from "../components/groups-flow/groups-flow.component";
import {GroupParentComponent} from "../components/group-parent/group-parent.component";
import {GroupComponent} from "../components/group/group.component";
import {CreateGroupComponent} from "../components/create-group/create-group.component";
import {ApiTesterComponent} from "../components/api-tester/api-tester.component";
import {DetailComponent} from "../components/details/detail.component";
import {CreateExpenseComponent} from "../components/create-expense/create-expense.component";
import {ModifyExpenseComponent} from "../components/modify-expense/modify-expense.component";
import {authGuard} from "./auths/auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path : 'password', component: PasswordComponent },
  { path : 'expenses', component: GroupParentComponent, canActivate: [authGuard],
  children: [
    { path : '', component: GroupsFlowComponent},
    { path : 'detail', component: GroupComponent },
    { path : 'detail/linedetail', component: DetailComponent},
    { path : 'detail/newexpense', component: CreateExpenseComponent},
    { path : 'detail/linedetail/modifyexpense', component: ModifyExpenseComponent}
  ]},
  { path: 'create', component : CreateGroupComponent, canActivate: [authGuard]},
  { path : 'testAPI', component : ApiTesterComponent }
];

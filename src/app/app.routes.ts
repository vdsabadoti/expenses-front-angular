import { Routes } from '@angular/router';
import {LoginPageComponent} from "../components/login-page/login-page.component";
import {PasswordComponent} from "../components/password/password.component";
import {GroupsFlowComponent} from "../components/groups-flow/groups-flow.component";
import {GroupParentComponent} from "../components/group-parent/group-parent.component";
import {GroupComponent} from "../components/group/group.component";
import {CreateGroupComponent} from "../components/create-group/create-group.component";
import {DetailComponent} from "../components/details/detail.component";
import {CreateExpenseComponent} from "../components/create-expense/create-expense.component";
import {ModifyExpenseComponent} from "../components/modify-expense/modify-expense.component";
import {authGuard} from "./auths/auth.guard";
import {NewUserComponent} from "../components/new-user/new-user.component";
import {MoneyTransferComponent} from "../components/money-transfer/money-transfer.component";
import {ModifyGroupComponent} from "../components/modify-group/modify-group.component";

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'newuser', component: NewUserComponent },
  { path : 'password', component: PasswordComponent },
  { path : 'expenses', component: GroupParentComponent, canActivate: [authGuard],
  children: [
    { path : '', component: GroupsFlowComponent},
    { path : 'detail/modify', component : ModifyGroupComponent },
    { path : 'detail', component: GroupComponent},
    { path : 'detail/linedetail', component: DetailComponent},
    { path : 'detail/newexpense', component: CreateExpenseComponent},
    { path : 'detail/moneytransf', component: MoneyTransferComponent},
    { path : 'detail/linedetail/modifyexpense', component: ModifyExpenseComponent}
  ]},
  { path: 'create', component : CreateGroupComponent, canActivate: [authGuard]}
];

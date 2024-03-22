import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-user',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  private router:Router = inject(Router);

  public text:string | undefined;

  createNewUser() {
    alert('User subscription under validation. You may come back in 48h.');
    this.router.navigate(['/login'])
  }

  cancelCreation() {
    this.router.navigate(['/login'])
  }
}

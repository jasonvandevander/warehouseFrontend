import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Registration } from './registration';
import { SharedService } from '../shared.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

// export class RegistrationComponent implements OnInit {

//   registrations!: Registration[];
//   updateUser?:Registration;

//   constructor(private sharedServices: SharedService){}

//   ngOnInit(): void {
      
//   }

//   onGetUser(): void{
//     this.sharedServices.getUser().subscribe({
//       next: (response: Registration[]) => {this.registrations = response;},
//       error: (error: HttpErrorResponse) => {alert(error.message)},
//       complete: () => console.log('Get transaction complete')
//     })
//   }

//   onAddUser(addForm:NgForm):void{
    
//   }


export class RegistrationComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password1: ['', [Validators.required, Validators.minLength(8)]]
  });
  constructor( private fb: FormBuilder) { }
  ngOnInit(): void {}
  
  get firstName(): any {
    return this.registerForm.get('firstName');
  }
  get lastName(): any {
    return this.registerForm.get('lastName');
  }

  get userName(): any {
    return this.registerForm.get('userName');
  }

  get email(): any {
    return this.registerForm.get('email');
  }

  get password(): any {
    return this.registerForm.get('password');
  }
  get password1(): any {
    return this.registerForm.get('password1');
  }
  registerFormSubmit(): void {
    const formData = this.registerForm.value;
    delete formData.password1;
    console.log(formData);
    // Api Request Here
  }
}
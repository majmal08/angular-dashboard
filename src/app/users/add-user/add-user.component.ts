import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private userService: UserService, private _snakBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
      dob: new FormControl('')
    });
  }

  addUser() {
    this.userService.addUser(this.addUserForm.value).subscribe((res:any) =>{
      this._snakBar.open(res.message);
      this.router.navigate(['users/list']);
    }, error => {
      this._snakBar.open(error.error.message);
    })
  }

}

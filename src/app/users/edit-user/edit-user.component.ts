import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  userDetails: any;
  constructor(
    private acticatedRouter: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snakBar: MatSnackBar
  ) {}

  updateUserForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.acticatedRouter.params.subscribe((data: any) => {
      this.userId = data.id;
    });

    if (this.userId) {
      //getting user details 
      this.userService
        .viewUser(this.userId)
        .toPromise()
        .then((data: any) => {
          this.userDetails = data.data;

          //assigning the user details in to Edit form
          this.updateUserForm = this.formBuilder.group({
            id: this.userId,
            name: new FormControl(this.userDetails.name),
            email: new FormControl(this.userDetails.email),
            phone: new FormControl(this.userDetails.phone),
            gender: new FormControl(this.userDetails.gender),
            address: new FormControl(this.userDetails.address),
            dob: new FormControl(this.userDetails.dob),

          });
        }).catch(error => {
          console.log(error.message)
        })
    }
  }

  updateUser() {
    this.userService.updateUser(this.updateUserForm.value).subscribe((data:any)=>{
      this._snakBar.open(data.message);
      this.router.navigate(['users/list']);
    }, error => {
      this._snakBar.open(error.error.message);

    })
  }
}

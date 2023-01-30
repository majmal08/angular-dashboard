import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{

  userId: string = '';
  constructor(private activatedRout: ActivatedRoute, private userService: UserService, private _snakBar: MatSnackBar,
    private router: Router){}

  ngOnInit(): void {
    
    this.activatedRout.params.subscribe((data:any) => {
      this.userId = data.id;
    });

    if(this.userId){
      this.userService.deleteUser(this.userId).subscribe((data:any) => {   
        this._snakBar.open(data.message);
        this.router.navigate(['users/list']);
      }, err => {
        this._snakBar.open(err.error);
      })
    }

  }
}

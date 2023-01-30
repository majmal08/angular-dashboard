import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'action'];
  dataSource = ELEMENT_DATA;

  listUsers: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.listUsers().subscribe((res: any) => {
      this.listUsers = Array.from(Object.values(res.data.data));
    });
  }
}

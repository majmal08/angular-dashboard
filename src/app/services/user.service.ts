import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users/list-user/list-user.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) {}
    
  listUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'users');
    }

    viewUser(id: string){
      return this.http.get(this.baseUrl+'users/edit/' + id);
      }

    addUser(data: any){
      return this.http.post(this.baseUrl+'users/store', data);
    }

    deleteUser(id: string){
      return this.http.delete(this.baseUrl+'users/delete/' + id);
    }

    updateUser(data:any){
      
      return this.http.post(this.baseUrl+'users/update/', data);

    }
}

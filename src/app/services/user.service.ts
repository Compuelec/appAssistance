import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInterface, AddUserInterface } from '../interfaces/user.interface';


const API_URL =  environment.apiUrl;
const TOKEN_KEY = environment.TOKEN_KEY;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Método para crear usuario 
  postUser(body: AddUserInterface): Observable<UserInterface> {
    const url = `${API_URL}/user/create`;
    const headers = this.getHeaders();

    return this.http.post(url, body, { headers }).pipe(
      map((response) => response as UserInterface)
    );
  }

  // Método para consultar todos los usuarios
  getUsers(): Observable<UserInterface[]> {
    const headers = this.getHeaders();
    return this.http.get<UserInterface[]>(`${API_URL}/user`, { headers });
  }

  // Método para consultar usuario por email
  getUserByEmail(email: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${API_URL}/user/email/${email}`, { headers });
  }

  // Método para consultar usuario por _id
  getUserById(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${API_URL}/user/${userId}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = TOKEN_KEY;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}


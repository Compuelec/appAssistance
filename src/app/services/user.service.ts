import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const API_URL =  environment.apiUrl;
const TOKEN_KEY = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

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


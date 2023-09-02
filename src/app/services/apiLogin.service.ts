import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginData } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  loginStudents(credentials: LoginData) {
    const url = `${this.baseUrl}/login/students`;
    return this.http.post(url, credentials);
  }

  loginTeachers(credentials: LoginData) {
    const url = `${this.baseUrl}/login/teachers`;
    return this.http.post(url, credentials);
  }

}

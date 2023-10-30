import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const API_URL =  environment.apiUrl;
const TOKEN_KEY = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class ClassEntryService {
  constructor(private http: HttpClient) {}


  // Método para ingresar en una clase
  postClassEntry(body: any): Observable<any> {
    const url = `${API_URL}/class-entry/`;
    const headers = this.getHeaders();
    return this.http.post(url, body, { headers });
  }

  // Método para obtener los datos de una clase
  getClassData(idClass: string): Observable<any> {
    const url = `${API_URL}/class-entry/${idClass}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  // Método para obtener los alumnos que asisten a una clase
  getStudents(idClass: string): Observable<any> {
    const url = `${API_URL}/class-entry/class/${idClass}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = TOKEN_KEY;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}
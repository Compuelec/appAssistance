import { Injectable } from '@angular/core';
import { Worker, Administrator } from './login-interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  trabajadores: Worker[] = [
    {
      id: 1,
      rut: "11111111-1",
      email: "losbar@gmail.com",
      name: "Juan",
      password: '123456789',
      last_name: "Pérez",
      user_type: "trabajador",
      user_enabled: true,
      phone: "+123456789",
      address: "Calle 123"
    },
    {
      id: 2,
      rut: "22222222-2",
      email: "trabajador2@confiteria.cl",
      name: "María",
      password: '123456789',
      last_name: "González",
      user_type: "trabajador",
      user_enabled: true,
      phone: "+987654321",
      address: "Avenida 456"
    },
    {
      id: 3,
      rut: "33333333-3",
      email: "trabajador3@confiteria.cl",
      name: "Carlos",
      password: '123456789',
      last_name: "López",
      user_type: "trabajador",
      user_enabled: true,
      phone: "+567890123",
      address: "Plaza Principal"
    },
    {
      id: 4,
      rut: "44444444-4",
      email: "trabajador4@confiteria.cl",
      name: "Ana",
      password: '123456789',
      last_name: "Martínez",
      user_type: "trabajador",
      user_enabled: true,
      phone: "+234567890",
      address: "Callejón Secreto"
    },
    {
      id: 5,
      rut: "55555555-5",
      email: "trabajador5@confiteria.cl",
      name: "Pedro",
      password: '123456789',
      last_name: "Ramírez",
      user_type: "trabajador",
      user_enabled: true,
      phone: "+678901234",
      address: "Plaza del Mercado"
    }
  ]

  administradores: Administrator[] = [
    {
      id: 6,
      rut: "66666666-6",
      email: "admin1@admin.confiteria.cl",
      name: "Admin",
      last_name: "Uno",
      user_type: "administrador",
      user_enabled: true,
      phone: "+111111111",
      address: "Oficina Principal"
    },
    {
      id: 7,
      rut: "77777777-7",
      email: "admin2@admin.confiteria.cl",
      name: "Admin",
      last_name: "Dos",
      user_type: "administrador",
      user_enabled: true,
      phone: "+222222222",
      address: "Oficina Secundaria"
    }
  ]

  constructor() {}

  // Método para iniciar sesión
  login(email: string, password: string): Worker | null {
    const worker = this.trabajadores.find (
      worker => worker.email === email && worker.password === password
    );
     return worker ? worker : null;
  }
}
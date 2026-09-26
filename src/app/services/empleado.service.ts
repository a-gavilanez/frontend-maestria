import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Empleado } from '../models/empleado';

@Injectable({ providedIn: 'root' })
export class EmpleadoService { 

  URL_API = 'https://angel-gavilanez.duckdns.org/api/v1/empleados';

  empleados: Empleado[] = []; 
  selectedEmpleado: Empleado = { _id: '', nombre: '', cargo: '', departamento: '', sueldo: 0 };

  constructor(private http: HttpClient) { 
    console.log("El servicio está funcionando...");
  } 

  getEmpleados() { 
    return this.http.get(this.URL_API); 
  }

  createEmpleado(empleado: Empleado) { 
    return this.http.post(this.URL_API, empleado); 
  } 

  putEmpleado(empleado: Empleado) {
    return this.http.put(`\({this.URL_API}/\){empleado._id}`, empleado);
  }

  deleteEmpleado(_id: string) {
    return this.http.delete(`\({this.URL_API}/\){_id}`);
  }
}
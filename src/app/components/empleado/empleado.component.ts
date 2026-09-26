import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit { 

  constructor(public empleadoService: EmpleadoService) {} 

  ngOnInit(): void { 
    this.getEmpleados(); 
  } 
  
  getEmpleados() { 
    this.empleadoService.getEmpleados().subscribe(
      (res: any) => { 
        // Reemplaza los datos locales únicamente por lo que devuelva la base de datos
        this.empleadoService.empleados = res.data ? res.data : res; 
      }, 
      err => console.error(err)
    ); 
  }
      
  addEmpleado(form: NgForm) { 
    if (form.value._id) {
      // Si existe _id, se actualiza el registro existente
      this.empleadoService.putEmpleado(form.value).subscribe(
        res => {
          this.getEmpleados();
          this.resetForm(form);
        },
        err => console.error(err)
      );
    } else {
      // Si no hay _id, se crea uno nuevo
      this.empleadoService.createEmpleado(form.value).subscribe( 
        res => { 
          this.getEmpleados(); 
          this.resetForm(form); 
        }, 
        err => console.error(err) 
      ); 
    }
  } 

  editEmpleado(empleado: Empleado) {
    this.empleadoService.selectedEmpleado = { ...empleado };
  }

  deleteEmpleado(_id: string | undefined, form: NgForm) {
    if (_id && confirm('¿Está seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(_id).subscribe(
        res => {
          this.getEmpleados();
          this.resetForm(form);
        },
        err => console.error(err)
      );
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.empleadoService.selectedEmpleado = { _id: '', nombre: '', cargo: '', departamento: '', sueldo: 0 };
    }
  }
}
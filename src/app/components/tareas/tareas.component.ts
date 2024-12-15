import { Itarea } from './../../interfaces/itarea';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {

  constructor() {
    this.cargarDesdeLocalStorage(); // Cargar tareas al iniciar la aplicación
    this.contar(); // Calcular tareas pendientes
  }


  tareas: Itarea[] = [
    // Completadas
    { titulo: 'Escribir documentación', completada: true, prioridad: 'Media' },

    // Alta prioridad
    { titulo: 'Revisar Pull Requests', completada: false, prioridad: 'Urgente' },

    // Media prioridad
    { titulo: 'Practicar TypeScript', completada: false, prioridad: 'Media' },
    { titulo: 'Diseñar interfaz UI', completada: false, prioridad: 'Media' },


    // Baja prioridad
    { titulo: 'Planificar la próxima reunión', completada: false, prioridad: 'Baja' },
  ];

  nuevaTarea: Itarea = {
    titulo: '',
    completada: false,
    prioridad: 'Baja'
  };

  contador:number = this.tareas.filter(t=> t.completada !== true).length;

  contar():void{
    this.contador = this.tareas.filter(t=> t.completada !== true).length;
  }

  anadirTarea():void {
    if (this.nuevaTarea.titulo.trim() === '') {
      this.nuevaTarea = {
        titulo: '',
        completada: false,
        prioridad: 'Baja'
      };
      return;
    }
    this.tareas.push(this.nuevaTarea);
    this.contar();
    this.guardarEnLocalStorage();
    this.nuevaTarea = {
      titulo: '',
      completada: false,
      prioridad: 'Baja'
    };
    
  }

  actualizarTarea(tarea: Itarea):void {
    if (tarea.titulo == null || tarea.titulo.trim() === '') {
      this.tareas = this.tareas.filter(t => t !== tarea);
    }
    this.contar();
    this.guardarEnLocalStorage();
  }

  completarToggle(tarea: Itarea): void {
    tarea.completada = !tarea.completada;
    this.contar();
    this.guardarEnLocalStorage();
  }

  borrarTarea(tarea: Itarea):void {
    this.tareas = this.tareas.filter(t => t !== tarea);
    this.contar();
    this.guardarEnLocalStorage();
  }

  ordenarTareas():void {
    const pesoPrioridad: { [key in Itarea['prioridad']]: number } = {
      Urgente: 2,
      Media: 1,
      Baja: 0
    };
    this.tareas.sort((a, b) => {
      return pesoPrioridad[b.prioridad] - pesoPrioridad[a.prioridad];
    });
  }

  subirPrioridad(tarea:Itarea) {
    if (tarea.prioridad == 'Media') {
      tarea.prioridad = 'Urgente'
      this.guardarEnLocalStorage();
    } else if (tarea.prioridad == 'Baja') {
      tarea.prioridad = 'Media'
      this.guardarEnLocalStorage();
    } else {
      return
    }
  }

  bajarPrioridad(tarea:Itarea) {
    if (tarea.prioridad == 'Media') {
      tarea.prioridad = 'Baja'
      this.guardarEnLocalStorage();
    } else if (tarea.prioridad == 'Urgente') {
      tarea.prioridad = 'Media'
      this.guardarEnLocalStorage();
    } else {
      return
    }
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  cargarDesdeLocalStorage(): void {
    const data = localStorage.getItem('tareas');
    if (data) {
      this.tareas = JSON.parse(data);
    }
  }
}

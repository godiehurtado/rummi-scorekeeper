import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-participants',
  templateUrl: './add-participants.component.html',
  styleUrls: ['./add-participants.component.css']
})
export class AddParticipantsComponent {
  participantName: string = '';
  participants: string[] = [];

  constructor(private router: Router) {
    // Cargar los participantes del almacenamiento local al inicializar el componente
    const storedParticipants = localStorage.getItem('participants');
    if (storedParticipants) {
      this.participants = JSON.parse(storedParticipants);
    }
  }

  addParticipant() {
    if (this.participantName.trim()) {
      this.participants.push(this.participantName.trim());
      this.participantName = ''; // Limpiar el campo de entrada
      this.saveParticipants(); // Guardar la lista de participantes
    }
  }

  saveParticipants() {
    // Guardar la lista de participantes en localStorage
    localStorage.setItem('participants', JSON.stringify(this.participants));
  }

  goBack() {
    // Redirigir a la página principal
    this.router.navigate(['/']);
  }

  removeParticipant(index: number) {
    // Eliminar participante
    this.participants.splice(index, 1);
    this.saveParticipants(); // Actualizar almacenamiento
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent {
  cards = [
    { name: 'Dos Tríos', image: 'assets/dos_trios.png', selected: false },
    { name: 'Un Trío y Una Escalera', image: 'assets/un_trio_una_escalera.png', selected: false },
    { name: 'Dos Escaleras', image: 'assets/dos_escaleras.png', selected: false },
    { name: 'Tres Tríos', image: 'assets/tres_trios.png', selected: false },
    { name: 'Dos Tríos y Una Escalera', image: 'assets/dos_trios_una_escalera.png', selected: false },
    { name: 'Dos Escaleras y Un Trío', image: 'assets/dos_escaleras_un_trio.png', selected: false },
    { name: 'Tres Escaleras', image: 'assets/tres_escaleras.png', selected: false },
    { name: 'Cuatro Tríos', image: 'assets/cuatro_trios.png', selected: false },
    { name: 'Tres Tríos y Una Escalera', image: 'assets/tres_trios_una_escalera.png', selected: false },
    { name: 'Dos Tríos y Dos Escaleras', image: 'assets/dos_trios_dos_escaleras.png', selected: false },
    { name: 'Tres Escaleras y Un Trío', image: 'assets/tres_escaleras_un_trio.png', selected: false },
    { name: 'Cuatro Escaleras', image: 'assets/cuatro_escaleras.png', selected: false }
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
    // Cargar las tarjetas seleccionadas desde localStorage al iniciar
    this.loadSelectedCards();
  }

  // Guardar las tarjetas seleccionadas en localStorage
  saveSelectedCards() {
    const selectedCards = this.cards.filter(card => card.selected);
    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
  }

  // Cargar las tarjetas seleccionadas desde localStorage
  loadSelectedCards() {
    const storedCards = localStorage.getItem('selectedCards');
    if (storedCards) {
      const selectedCards = JSON.parse(storedCards);
      this.cards.forEach(card => {
        // Si la tarjeta está en localStorage, marcarla como seleccionada
        card.selected = selectedCards.some((selectedCard: any) => selectedCard.name === card.name);
      });
    }
  }

  goBack() {
    // Redirigir a la página principal
    this.router.navigate(['/']);
  }
}

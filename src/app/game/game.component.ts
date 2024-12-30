import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  selectedCards: { name: string; image: string }[] = [];
  participants: string[] = [];
  scores: { card: any; participantsScores: { name: string; score: number }[] }[] = [];
  currentCardIndex: number = 0;
  gameFinished: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const cards = localStorage.getItem('selectedCards');
    const participants = localStorage.getItem('participants');

    if (cards && participants) {
      this.selectedCards = JSON.parse(cards);
      this.participants = JSON.parse(participants);

      this.scores = this.selectedCards.map((card) => ({
        card,
        participantsScores: this.participants.map((participant) => ({
          name: participant,
          score: 0,
        })),
      }));
    }
  }

  goToNextCard(): void {
    if (this.currentCardIndex < this.selectedCards.length - 1) {
      this.currentCardIndex++;
    }
  }

  goToPreviousCard(): void {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }

  finishGame(): void {
    this.gameFinished = true;
  }

  getScoreForParticipant(participant: string, card: any): number {
    const cardScore = this.scores.find((score) => score.card === card);
    return cardScore
      ? cardScore.participantsScores.find((ps) => ps.name === participant)?.score || 0
      : 0;
  }

  getTotalScore(participant: string): number {
    return this.scores.reduce((total, cardScore) => {
      const score = cardScore.participantsScores.find((ps) => ps.name === participant)?.score || 0;
      return total + score;
    }, 0);
  }

  getOrderedParticipants(): { name: string; total: number }[] {
    return this.participants
      .map((participant) => ({
        name: participant,
        total: this.getTotalScore(participant),
      }))
      .sort((a, b) => a.total - b.total); // Ordenar por puntaje total (menor a mayor)
  }

  downloadCSV(): void {
    let csvContent = 'data:text/csv;charset=utf-8,';
    const headers = ['Participante', ...this.selectedCards.map((card) => card.name), 'Total'];
    csvContent += headers.join(',') + '\n';

    this.participants.forEach((participant) => {
      const scores = this.selectedCards.map((card) => this.getScoreForParticipant(participant, card));
      const total = this.getTotalScore(participant);
      csvContent += [participant, ...scores, total].join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'puntajes_finales.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  get sortedParticipants() {
    return this.participants
      .map((participant) => ({
        name: participant,
        totalScore: this.getTotalScore(participant),
      }))
      .sort((a, b) => a.totalScore - b.totalScore);
  }
  
}

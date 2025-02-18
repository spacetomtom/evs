import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService, CreateExamDTO } from '../exam.service';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #examForm="ngForm">
      <div class="form-group">
        <label for="firstName">Prénom de l'étudiant</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          [(ngModel)]="examData.student.first_name"
          required
        >
      </div>

      <div class="form-group">
        <label for="lastName">Nom de l'étudiant</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          [(ngModel)]="examData.student.last_name"
          required
        >
      </div>

      <div class="form-group">
        <label for="meetingPoint">Lieu de rendez-vous</label>
        <input
          type="text"
          id="meetingPoint"
          name="meetingPoint"
          [(ngModel)]="examData.meeting_point"
        >
      </div>

      <div class="form-group">
        <label for="date">Date et heure</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          [(ngModel)]="examData.date"
        >
      </div>

      <div class="form-group">
        <label for="status">Statut</label>
        <select
          id="status"
          name="status"
          [(ngModel)]="examData.status"
          class="select-input"
        >
          <option value="A organiser">À organiser</option>
          <option value="Recherche de place">Recherche de place</option>
          <option value="Confirmé">Confirmé</option>
          <option value="Annulé">Annulé</option>
        </select>
      </div>

      <button type="submit" [disabled]="!examForm.form.valid">
        Créer l'examen
      </button>

    </form>
  `,
  styles: [`
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, .select-input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: white;
    }
    .select-input {
      appearance: revert;
      cursor: pointer;
    }
    button {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .message {
      margin-top: 10px;
      padding: 10px;
      border-radius: 4px;
    }
  `]
})
export class ExamFormComponent {
  @Output() examCreated = new EventEmitter<void>();

  examData: CreateExamDTO = {
    student: {
      first_name: '',
      last_name: ''
    },
    status: 'A organiser'
  };


  constructor(private examService: ExamService) {}

  onSubmit() {
    this.examService.createExam(this.examData).subscribe({
      next: () => {
        // Reset form
        this.examData = {
          student: { first_name: '', last_name: '' },
          status: 'A organiser'
        };
        // Emit event to refresh the list
        this.examCreated.emit();
      },
      error: (error) => {
        console.error('Erreur:', error);
      }
    });
  }
}
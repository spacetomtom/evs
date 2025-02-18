import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService, Exam, ExamStatus } from '../exam.service';
import { ExamFormComponent } from '../exam-form/exam-form.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, ExamFormComponent, ModalComponent],
  template: `
    <div class="exam-list">
      <div class="header">
      <div>
        <h2>Mes examens</h2>
        <span>{{ exams.length }} examens à venir</span>
      </div>
        <button class="create-button" (click)="showModal()">Organiser un examen</button>
      </div>

      <app-modal [isOpen]="isModalOpen" title="Créer un nouvel examen" (closeModal)="hideModal()">
        <app-exam-form (examCreated)="onExamCreated()"></app-exam-form>
      </app-modal>
      
      <div *ngIf="loading">Chargement...</div>
      <div *ngIf="error">{{ error }}</div>
      <ul *ngIf="exams.length">
        <li *ngFor="let exam of exams">
          <div class="exam-details">
            <span class="student-name">👤 {{ exam.student.first_name }} {{ exam.student.last_name }}</span>
            <span class="location">📍 {{ exam.meeting_point || 'En attente' }}</span>
            <span class="date">🗓️ {{ (exam.date | date:'dd/MM') || 'En attente' }}</span>
            <span class="date">🕒 {{ (exam.date | date:'HH:mm') || 'En attente' }}</span>
            <span>
              <span class="status" [ngClass]="getStatusClass(exam.status)">
              {{ exam.status || 'A organiser' }}
              </span>
            </span>
            </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .exam-list {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .create-button {
      background-color:rgb(255, 81, 0);
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .create-button:hover {
      background-color:rgb(255, 115, 7);
    }

    .student-info {
      margin-bottom: 8px;
    }
    .exam-details {
      display: flex;
      gap: 15px;
      font-size: 0.9em;
      color: #666;
    }
    .status {
      padding: 3px 8px;
      border-radius: 4px;
      background-color: #e0e0e0;
    }
    .status-confirmed {
      background-color: #4caf50;
      color: white;
    }
    .status-cancelled {
      background-color: #f44336;
      color: white;
    }
    .status-searching {
      background-color: #ff9800;
      color: white;
    }
    .status-organizing {
      background-color: #2196f3;
      color: white;
    }
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    li {
      background: #fff;
      border-radius: 10px;
      padding: 15px;
      border: 1px solid #e0e0e0;
    }

    li:hover {
      background-color: #f0f0f0;
    }

    .exam-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      width: 100%;
    }

    .exam-details span {
      flex: 1;
      text-align: left;
    }
    .student-name {
      font-weight: bold;
      color: #333;
    }

    .location,
    .date {
      color: #666;
    }

    /* 📱 Responsive (mobile) */
    @media (max-width: 600px) {
      .exam-details {
        flex-direction: column;
        gap: 5px;
      }

      .exam-details span {
        text-align: left;
        width: 100%;
      }

      li {
        padding: 10px;
      }
    } 
  `]
})
export class ExamListComponent implements OnInit {
  exams: Exam[] = [];
  loading = false;
  error = '';
  isModalOpen = false;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.loadExams();
  }

  showModal() {
    this.isModalOpen = true;
  }

  hideModal() {
    this.isModalOpen = false;
  }

  onExamCreated() {
    this.loadExams();
    this.hideModal();
  }

  loadExams() {
    this.loading = true;
    this.examService.getExams().subscribe({
      next: (data) => {
        this.exams = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des examens';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  getStatusClass(status?: ExamStatus): string {
    switch (status) {
      case 'Confirmé':
        return 'status-confirmed';
      case 'Annulé':
        return 'status-cancelled';
      case 'Recherche de place':
        return 'status-searching';
      case 'A organiser':
      default:
        return 'status-organizing';
    }
  }
}
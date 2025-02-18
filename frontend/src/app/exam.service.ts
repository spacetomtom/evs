import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  first_name: string;
  last_name: string;
}

export type ExamStatus = 'A organiser' | 'Annulé' | 'Recherche de place' | 'Confirmé';

export interface Exam {
  student: Student;
  meeting_point?: string;
  date?: string;
  status?: ExamStatus;
}

export type CreateExamDTO = Exam;

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:3000/api/exams';

  constructor(private http: HttpClient) { }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.apiUrl);
  }

  createExam(exam: CreateExamDTO): Observable<Exam> {
    return this.http.post<Exam>(this.apiUrl, exam);
  }
}
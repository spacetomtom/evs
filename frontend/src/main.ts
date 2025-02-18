import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ExamListComponent } from './app/exam-list/exam-list.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>Application d'examens</h1>
    <app-exam-list></app-exam-list>
  `,
  standalone: true,
  imports: [ExamListComponent]
})
export class App {
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});
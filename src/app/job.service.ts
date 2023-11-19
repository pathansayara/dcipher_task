import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { job } from 'datatypes';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl =
    'https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1710/data.json';
  constructor(private http: HttpClient) {}

  getJobs(): Observable<job[]> {
    return this.http
      .get<job[]>(this.apiUrl)
      .pipe(map((response: any) => response.data));
  }
}

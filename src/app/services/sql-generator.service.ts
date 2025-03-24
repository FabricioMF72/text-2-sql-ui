import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SqlGeneratorService {
  private apiUrl = 'https://text-2-sql.fly.dev/generate-sql';

  constructor(private http: HttpClient) {}

  generateSql(payload: { query: string; schema: Record<string, string[]> }): Observable<any> {
    return this.http.post(this.apiUrl, payload).pipe(
      catchError((error) => {
        if (error.status === 429) {
          return throwError(() => new Error('Rate limit exceeded. Please try again later.'));
        }
        return throwError(() => error);
      })
    );
  }
}

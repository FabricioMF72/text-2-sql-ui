import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqlGeneratorService {
  private apiUrl = 'https://text-2-sql.fly.dev/generate-sql';

  constructor(private http: HttpClient) {}

  generateSql(payload: { query: string; schema: Record<string, string[]> }): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}

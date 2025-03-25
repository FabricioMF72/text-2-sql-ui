import { Component } from '@angular/core';
import { SqlGeneratorService } from '../../services/sql-generator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  query: string = '';
  schema: { name: string; columns: string[] }[] = [
    { name: '', columns: [] }
  ];
  loading: boolean = false;
  showModal: boolean = false;
  generatedSql: string = '';

  constructor(private sqlGeneratorService: SqlGeneratorService, private router: Router) {}

  addTable() {
    this.schema.push({ name: '', columns: [] });
  }

  removeTable(index: number) {
    this.schema.splice(index, 1);
  }

  addColumn(tableIndex: number) { 
    this.schema[tableIndex].columns.push('');
    console.log(this.schema[tableIndex].columns);
  }

  removeColumn(tableIndex: number, columnIndex: number) {
    this.schema[tableIndex].columns.splice(columnIndex, 1);
  }

  updateColumn(tableIndex: number, columnIndex: number, event: Event) {
    let value = (event.target as HTMLInputElement).value;
    console.log(value);
    if (value !== null) {
      this.schema[tableIndex].columns[columnIndex] = value;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    const payload = {
      query: this.query,
      schema: this.schema.reduce((acc, table) => {
        acc[table.name] = table.columns;
        return acc;
      }, {} as Record<string, string[]>)
    };
    this.sqlGeneratorService.generateSql(payload).subscribe(
      response => {
        this.generatedSql = response.sql || 'No SQL generated.';
        this.showModal = true;
        this.loading = false;
      },
      error => {
        if (error.message === 'Rate limit exceeded. Please try again later.') {
          alert('You have exceeded the rate limit (4xDay). You will be redirected to the login page.');
          this.router.navigate(['/login']);
        } else {
          console.error('Error generating SQL:', error);
        }
        this.loading = false;
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedSql).then(() => {
      alert('SQL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy SQL:', err);
    });
  }

}

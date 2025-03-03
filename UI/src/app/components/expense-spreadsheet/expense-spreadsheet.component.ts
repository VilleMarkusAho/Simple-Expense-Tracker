import { FinanceService } from '../../services/Finance.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-spreadsheet',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './expense-spreadsheet.component.html',
  styleUrl: './expense-spreadsheet.component.scss',
  standalone: true
})
export class ExpenseSpreadsheetComponent {

  constructor(public finance: FinanceService) { }

  editingRowIndex: number = -1;
  editingColumnIndex: number = -1;

  @HostListener('document:click', ['$event'])
  setEditToFalse(event: Event): void {
    if (!['TD', "INPUT"].includes((event.target as HTMLElement).tagName)) {
      this.editingRowIndex = -1;
      this.editingColumnIndex = -1;
    }
  }

  addRow(): void {
    this.finance.addExpense({
      category: "No category",
      description: "No description",
      amount: 0
    })
  }

  removeRow(index: number): void {
    this.finance.removeExpense(index);
  }

  toggleEdit(rowIndex: number, columnIndex: number): void {
    this.editingRowIndex = rowIndex;
    this.editingColumnIndex = columnIndex;
  }
}

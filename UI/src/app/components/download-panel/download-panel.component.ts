import { ChartService } from './../../services/ChartService.service';
import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { FinanceService } from '../../services/Finance.service';
import { capitilizeFirstLetters } from '../../utils/helper-functions';

@Component({
  selector: 'app-download-panel',
  imports: [MatExpansionModule],
  templateUrl: './download-panel.component.html',
  styleUrl: './download-panel.component.scss',
  standalone: true
})
export class DownloadPanelComponent {
  constructor(private chartService: ChartService, private finance: FinanceService) { }

  readonly panelOpenState = signal(false);

  downloadPdf(): void {
    if (this.chartService.chartCanvas) {
      const canvas = this.chartService.chartCanvas;

      const scaleFactor = 0.55;
      const width = canvas.width * scaleFactor;
      const height = canvas.height * scaleFactor;

      // Create a PDF with dimensions matching the canvas
      const pdf = new jsPDF('l', 'px', [width + 27, height + 20]);

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, width, height);
      pdf.save('chart.pdf');
    }
    else {
      console.error('Chart canvas is not found');
    }
  }

  downloadExcel(): void {
    const expenses = this.finance.expenses || [];
    const filename = 'expenses.xlsx';
    const currency = this.finance.currency;

    if (expenses.length === 0) {
      console.error('No expenses to download');
      return;
    };

    const sheetData: any = [['Category', 'Description', 'Amount']];

    expenses.forEach(expense => {
      const row = [expense.category, expense.description, `${expense.amount?.toString() || '0'} ${currency}`];
      sheetData.push(row);
    });

    const totalExpensesRow = ['', 'Total Expenses', `${this.finance.totalExpenses?.toString() || '0'} ${currency}`];
    const revenueRow = ['', 'Revenue', `${this.finance.revenue?.toString() || '0'} ${currency}`];
    const profitRow = ['', 'Profit', `${this.finance.balance?.toString() || '0'} ${currency}`];

    sheetData.push(['', '', ''], totalExpensesRow, revenueRow, profitRow);

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, filename);
  }
}

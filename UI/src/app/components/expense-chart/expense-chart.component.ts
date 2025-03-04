import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { IExpense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-chart',
  imports: [],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseChartComponent implements OnChanges {

  @Input() expenses: IExpense[] = [];
  @Input() revenue: number = 0;

  chart: any;
  expenseMap: Map<string, number[]> = new Map();


  createChart() {
    this.chart = new Chart("Expenses", {
      type: 'bar',
      data: {
        labels: ["Expenses by category"],
        datasets: this.getChartDatasets(),
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        scales: {
          y: {
            //stacked: true,
          }
        }
      }
    });
  }

  ngOnChanges(): void {
    this.createChart();
  }

  private getChartDatasets(): any[] {
    let datasets1 = [];
    const datasets2 = [];
    let totalExpenses = 0;

    for (const expense of this.expenses) {
      datasets1.push({
        label: expense.category.toString(),
        data: [expense.amount],
        stack: expense.category,
      });

      datasets2.push({
        label: expense.category.toString(),
        data: [expense.amount],
        stack: 'stack1',
      })

      totalExpenses += expense.amount;
    }

    datasets1 = [...datasets1, ...datasets2];

    datasets1.push({
      label: "Revenue",
      data: [this.revenue],
      stack: "stack2",
    })

    datasets1.push({
      label: "Profit",
      data: [this.revenue - totalExpenses],
      stack: "stack2",
    })

    return datasets1;
  }

  private getLabels(): string[] {
    return [
      ...this.expenses.map((expense) => expense.category),
      "Total expenses",
      "Revenue",
      "Profit",
    ];
  }
}



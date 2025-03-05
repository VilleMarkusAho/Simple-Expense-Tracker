import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { IExpense } from '../../models/expense.model';
import { shuffleArray } from '../../utils/helper-functions';

const COLORS: string[] = [
  "#006BFF", "limegreen", "#FF3131", "#AD49E1", "orange",
  "grey", "orange", "#4477CE", "#00FF9C", "#FF70AB",
  "#FF5B22", "#493628", "#B2A5FF", "#0D92F4", "#3A7D44",
  "#F3C623", "#AE431E", "#B3E5BE", "#FE0000", "#77CDFF"
];

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
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          }
        }
      },
    });
  }

  ngOnChanges(): void {
    this.createChart();
  }

  private getChartDatasets(): any[] {
    let datasets1 = [];
    let datasets2 = [];
    let totalExpenses = 0;
    let colors = shuffleArray(COLORS);
    let colorIndex = 0;
    let maxColorIndex = colors.length;

    for (const expense of this.expenses) {
      datasets1.push({
        label: expense.category.toString(),
        data: [expense.amount],
        stack: expense.category,
        backgroundColor: colors[colorIndex],
      });

      datasets2.push({
        label: expense.category.toString(),
        data: [expense.amount],
        stack: 'stack1',
        backgroundColor: colors[colorIndex++],
      })

      totalExpenses += expense.amount;

      if (colorIndex >= maxColorIndex) {
        colorIndex = 0;
      }
    }

    datasets1 = [...datasets1, ...datasets2];

    datasets1.push({
      label: "Revenue",
      data: [this.revenue],
      stack: "stack2",
      backgroundColor: colors[0],
    })

    datasets1.push({
      label: "Profit",
      data: [this.revenue - totalExpenses],
      stack: "stack3",
      backgroundColor: colors[0],
    })

    return datasets1;
  }
}



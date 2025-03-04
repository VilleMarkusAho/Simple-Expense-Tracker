import { Pipe, PipeTransform } from '@angular/core';
import { IExpense } from '../models/expense.model';

@Pipe({
  name: 'totalExpenses',
  pure: false
})
export class TotalExpensesPipe implements PipeTransform {

  transform(expenses: IExpense[]): number {
    if (expenses) {
      return expenses.reduce((acc, curr) => acc + (curr?.amount ?? 0), 0);
    }
    return 0;
  }
}

export enum ExpenseCategory {
  Groceries = "Groceries",
  Transportation = "Transportation",
  Housing = "Housing",
  Utilities = "Utilities",
  Healthcare = "Healthcare",
  Insurance = "Insurance",
  Education = "Education",
  Entertainment = "Entertainment",
  Clothing = "Clothing",
  Dining = "Dining",
  Uncategorized = "Uncategorized",
}

export interface IExpense {
  category: ExpenseCategory;
  description: string;
  amount: number;
}

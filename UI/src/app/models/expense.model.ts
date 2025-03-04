export interface IExpense {
  category: "Groceries" | "Transportation" | "Housing" | "Utilities" | "Healthcare" | "Insurance" | "Education" | "Entertainment" | "Clothing" | "Dining" | "Uncategorized";
  description: string;
  amount: number;
}

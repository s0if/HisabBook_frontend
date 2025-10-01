export interface Transaction {
  id?: string;
  type: TransactionType | null;
  amount: number;
  nameCategory: string;
  notes: string;
  date?: string;
}

export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense'
}

// Helper function to display transaction type in Arabic
export const getTransactionTypeLabel = (type: TransactionType | null): string => {
  if (!type) return '';
  return type === TransactionType.Income ? 'دخل' : 'مصروف';
};

export interface TransactionResponse {
  transactionMoney: Transaction[];
  totalSalary: number;
}

export interface CreateTransactionRequest {
  amount: number;
  nameCategory: string;
  type: TransactionType | null;
  notes: string;
}

export interface UpdateTransactionRequest {
  amount?: number;
  nameCategory?: string;
  type?: TransactionType | null;
  notes?: string;
}
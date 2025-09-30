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
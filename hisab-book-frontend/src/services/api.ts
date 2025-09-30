import axios from 'axios';
import {
  Transaction,
  TransactionResponse,
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from '../types/Transaction';

const API_BASE_URL = 'https://localhost:7019';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const transactionAPI = {
  // Get all transactions
  getAllTransactions: async (): Promise<TransactionResponse> => {
    const response = await api.get('/TransactionMoney/All');
    return response.data;
  },

  // Get transaction by ID
  getTransactionById: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/TransactionMoney/${id}`);
    return response.data;
  },

  // Get transactions by month and year
  getTransactionsByMonthYear: async (month: number, year: number): Promise<TransactionResponse> => {
    const response = await api.get(`/TransactionMoney/${month}/${year}`);
    return response.data;
  },

  // Create new transaction
  createTransaction: async (transaction: CreateTransactionRequest): Promise<Transaction> => {
    const response = await api.post('/TransactionMoney', transaction);
    return response.data;
  },

  // Update transaction
  updateTransaction: async (id: string, transaction: UpdateTransactionRequest): Promise<Transaction> => {
    const response = await api.put(`/TransactionMoney/${id}`, transaction);
    return response.data;
  },

  // Delete transaction
  deleteTransaction: async (id: string): Promise<void> => {
    await api.delete(`/TransactionMoney/${id}`);
  },
};

export default api;
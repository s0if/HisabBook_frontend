import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import TransactionFilter from './components/TransactionFilter';
import { Transaction, TransactionType, CreateTransactionRequest } from './types/Transaction';
import { transactionAPI } from './services/api';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<{ month: number | null; year: number | null }>({ month: null, year: null });

  // Load transactions on component mount
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await transactionAPI.getAllTransactions();
      setTransactions(data.transactionMoney);
      setTotalBalance(data.totalSalary);
      setError('');
    } catch (err) {
      setError('Failed to load transactions. Please check if the API is running.');
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transactionData: CreateTransactionRequest) => {
    try {
      await transactionAPI.createTransaction(transactionData);
      setShowForm(false);
      loadTransactions(); // Reload to get updated data
    } catch (err) {
      setError('Failed to create transaction');
      console.error('Error creating transaction:', err);
    }
  };

  const handleEditTransaction = async (transactionData: CreateTransactionRequest) => {
    if (!editingTransaction?.id) return;

    try {
      await transactionAPI.updateTransaction(editingTransaction.id, transactionData);
      setEditingTransaction(undefined);
      setShowForm(false);
      loadTransactions(); // Reload to get updated data
    } catch (err) {
      setError('Failed to update transaction');
      console.error('Error updating transaction:', err);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionAPI.deleteTransaction(id);
        loadTransactions(); // Reload to get updated data
      } catch (err) {
        setError('Failed to delete transaction');
        console.error('Error deleting transaction:', err);
      }
    }
  };

  const startEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingTransaction(undefined);
  };

  const handleFilter = async (month: number, year: number) => {
    try {
      setLoading(true);
      const data = await transactionAPI.getTransactionsByMonthYear(month, year);
      // API returns TransactionResponse with transactionMoney array and totalSalary
      setTransactions(data.transactionMoney);
      setTotalBalance(data.totalSalary);
      setIsFiltered(true);
      setCurrentFilter({ month, year });
      setError('');
    } catch (err) {
      setError('Failed to filter transactions');
      console.error('Error filtering transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setIsFiltered(false);
    setCurrentFilter({ month: null, year: null });
    loadTransactions();
  };

  // Calculate statistics
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.Income)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === TransactionType.Expense)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="App">
      <header className="app-header">
        <h1>📊 HisabBook - Personal Finance Tracker</h1>
        <p>Track your income and expenses in Shekels (₪)</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        <Dashboard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          transactionCount={transactions.length}
        />

        <div className="transactions-section">
          <div className="section-header">
            <h2>{isFiltered ? `Transactions for ${currentFilter.month}/${currentFilter.year}` : 'Recent Transactions'}</h2>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
              disabled={loading}
            >
              + Add Transaction
            </button>
          </div>

          <TransactionFilter
            onFilter={handleFilter}
            onClearFilter={handleClearFilter}
            isFiltered={isFiltered}
          />

          {loading ? (
            <div className="loading">Loading transactions...</div>
          ) : (
            <TransactionList
              transactions={transactions}
              onEdit={startEdit}
              onDelete={handleDeleteTransaction}
            />
          )}
        </div>

        {showForm && (
          <TransactionForm
            transaction={editingTransaction}
            onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
            onCancel={cancelForm}
            isEditing={!!editingTransaction}
          />
        )}
      </main>
    </div>
  );
}

export default App;

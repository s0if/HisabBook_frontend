import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, CreateTransactionRequest } from '../types/Transaction';

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: CreateTransactionRequest) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateTransactionRequest>({
    amount: 0,
    nameCategory: '',
    type: null,
    notes: '',
  });
  const [amountDisplay, setAmountDisplay] = useState<string>('');

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount || 0,
        nameCategory: transaction.nameCategory || '',
        type: transaction.type || null,
        notes: transaction.notes || '',
      });
      setAmountDisplay(transaction.amount ? transaction.amount.toString() : '');
    } else {
      setAmountDisplay('');
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount > 0 && formData.nameCategory.trim() && formData.type) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      setAmountDisplay(value);
      setFormData(prev => ({
        ...prev,
        amount: parseFloat(value) || 0,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="transaction-form-overlay">
      <div className="transaction-form">
        <h2>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={formData.type || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value={TransactionType.Income}>Income</option>
              <option value={TransactionType.Expense}>Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount (₪):</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amountDisplay}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nameCategory">Category:</label>
            <input
              type="text"
              id="nameCategory"
              name="nameCategory"
              value={formData.nameCategory || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update' : 'Add'} Transaction
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
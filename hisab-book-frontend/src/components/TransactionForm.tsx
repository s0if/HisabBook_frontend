import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, CreateTransactionRequest, getTransactionTypeLabel } from '../types/Transaction';

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
        <h2>{isEditing ? 'تعديل المعاملة' : 'إضافة معاملة جديدة'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">النوع:</label>
            <select
              id="type"
              name="type"
              value={formData.type || ''}
              onChange={handleChange}
              required
            >
              <option value="">اختر النوع</option>
              <option value={TransactionType.Income}>{getTransactionTypeLabel(TransactionType.Income)}</option>
              <option value={TransactionType.Expense}>{getTransactionTypeLabel(TransactionType.Expense)}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">المبلغ (₪):</label>
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
            <label htmlFor="nameCategory">الفئة:</label>
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
            <label htmlFor="notes">ملاحظات:</label>
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
              {isEditing ? 'تحديث' : 'إضافة'} المعاملة
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
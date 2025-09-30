import React from 'react';
import { Transaction } from '../types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  if (transactions.length === 0) {
    return (
      <div className="no-transactions">
        <p>No transactions found. Start by adding your first transaction!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <div className="transaction-table">
        <div className="table-header">
          <div className="col">Date</div>
          <div className="col">Type</div>
          <div className="col">Category</div>
          <div className="col">Amount</div>
          <div className="col">Notes</div>
          <div className="col">Actions</div>
        </div>

        {transactions.map((transaction, index) => (
          <div key={transaction.id || `transaction-${index}`} className="table-row">
            <div className="col">{formatDate(transaction.date)}</div>
            <div className="col">
              <span className={`transaction-type ${transaction.type?.toLowerCase()}`}>
                {transaction.type}
              </span>
            </div>
            <div className="col">{transaction.nameCategory}</div>
            <div className="col">
              <span className={`amount ${transaction.type?.toLowerCase()}`}>
                {formatAmount(transaction.amount)}
              </span>
            </div>
            <div className="col">{transaction.notes || '-'}</div>
            <div className="col">
              <button
                onClick={() => onEdit(transaction)}
                className="btn btn-sm btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => transaction.id && onDelete(transaction.id)}
                className="btn btn-sm btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
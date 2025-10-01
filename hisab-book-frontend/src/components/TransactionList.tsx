import React from 'react';
import { Transaction, getTransactionTypeLabel } from '../types/Transaction';

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
        <p>لا توجد معاملات. ابدأ بإضافة معاملتك الأولى!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <div className="transaction-table">
        <div className="table-header">
          <div className="col">التاريخ</div>
          <div className="col">النوع</div>
          <div className="col">الفئة</div>
          <div className="col">المبلغ</div>
          <div className="col">ملاحظات</div>
          <div className="col">الإجراءات</div>
        </div>

        {transactions.map((transaction, index) => (
          <div key={transaction.id || `transaction-${index}`} className="table-row">
            <div className="col">{formatDate(transaction.date)}</div>
            <div className="col">
              <span className={`transaction-type ${transaction.type?.toLowerCase()}`}>
                {getTransactionTypeLabel(transaction.type)}
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
                تعديل
              </button>
              <button
                onClick={() => transaction.id && onDelete(transaction.id)}
                className="btn btn-sm btn-delete"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
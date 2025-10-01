import React from 'react';

interface DashboardProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  totalBalance,
  totalIncome,
  totalExpenses,
  transactionCount,
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="dashboard-card balance">
          <h3>الرصيد الكلي</h3>
          <p className={`amount ${totalBalance >= 0 ? 'positive' : 'negative'}`}>
            {formatAmount(totalBalance)}
          </p>
        </div>

        <div className="dashboard-card income">
          <h3>إجمالي الدخل</h3>
          <p className="amount positive">{formatAmount(totalIncome)}</p>
        </div>

        <div className="dashboard-card expenses">
          <h3>إجمالي المصروفات</h3>
          <p className="amount negative">{formatAmount(totalExpenses)}</p>
        </div>

        <div className="dashboard-card count">
          <h3>المعاملات</h3>
          <p className="count">{transactionCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
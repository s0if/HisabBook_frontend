import React, { useState } from 'react';

interface TransactionFilterProps {
  onFilter: (month: number, year: number) => void;
  onClearFilter: () => void;
  isFiltered: boolean;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({
  onFilter,
  onClearFilter,
  isFiltered,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const handleFilter = () => {
    const month = selectedMonth ? parseInt(selectedMonth) : 0;
    const year = selectedYear ? parseInt(selectedYear) : 0;

    if (month > 0 && year > 0) {
      onFilter(month, year);
    }
  };

  const handleClear = () => {
    setSelectedMonth('');
    setSelectedYear('');
    onClearFilter();
  };

  return (
    <div className="transaction-filter">
      <div className="filter-inputs">
        <div className="filter-group">
          <label htmlFor="month">Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button
            onClick={handleFilter}
            className="btn btn-primary btn-sm"
            disabled={!selectedMonth || !selectedYear}
          >
            Filter
          </button>
          {isFiltered && (
            <button onClick={handleClear} className="btn btn-secondary btn-sm">
              Show All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFilter;
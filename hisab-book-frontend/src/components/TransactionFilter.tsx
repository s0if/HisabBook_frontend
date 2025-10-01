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
    { value: 1, label: 'يناير' },
    { value: 2, label: 'فبراير' },
    { value: 3, label: 'مارس' },
    { value: 4, label: 'أبريل' },
    { value: 5, label: 'مايو' },
    { value: 6, label: 'يونيو' },
    { value: 7, label: 'يوليو' },
    { value: 8, label: 'أغسطس' },
    { value: 9, label: 'سبتمبر' },
    { value: 10, label: 'أكتوبر' },
    { value: 11, label: 'نوفمبر' },
    { value: 12, label: 'ديسمبر' },
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
          <label htmlFor="month">الشهر:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">جميع الأشهر</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">السنة:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">جميع السنوات</option>
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
            تصفية
          </button>
          {isFiltered && (
            <button onClick={handleClear} className="btn btn-secondary btn-sm">
              عرض الكل
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFilter;
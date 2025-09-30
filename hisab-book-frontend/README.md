# HisabBook Frontend

A React TypeScript frontend for the HisabBook personal finance tracking system. This application allows users to track their income and expenses in Israeli Shekels (₪).

## Features

- 📊 **Dashboard**: View total balance, income, expenses, and transaction count
- 💰 **Transaction Management**: Add, edit, and delete transactions
- 📅 **Filtering**: Filter transactions by month and year
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- HisabBook API running on `https://localhost:7019`

## Installation

1. Navigate to the project directory:
   ```bash
   cd hisab-book-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Configuration

The application is configured to connect to the HisabBook API at `https://localhost:7019`.

**Important**: Make sure your API is running and accessible before using the frontend.

If you need to change the API URL, update the `API_BASE_URL` in `src/services/api.ts`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Dashboard with summary cards
│   ├── TransactionForm.tsx   # Form for adding/editing transactions
│   ├── TransactionList.tsx   # List of transactions
│   └── TransactionFilter.tsx # Month/year filter component
├── services/           # API services
│   └── api.ts         # Axios API client
├── types/             # TypeScript type definitions
│   └── Transaction.ts # Transaction-related types
├── App.tsx           # Main application component
├── App.css          # Global styles
└── index.tsx        # Application entry point
```

## Usage

1. **View Dashboard**: See your financial overview including total balance, income, and expenses
2. **Add Transaction**: Click "Add Transaction" to create a new income or expense entry
3. **Edit Transaction**: Click "Edit" on any transaction to modify it
4. **Delete Transaction**: Click "Delete" to remove a transaction (with confirmation)
5. **Filter Transactions**: Use the month/year filter to view transactions for specific periods

## Currency

The application displays amounts in Israeli Shekels (₪) using the Hebrew locale formatting.

## Browser Support

This application supports modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

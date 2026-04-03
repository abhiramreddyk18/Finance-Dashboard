# Finance Dashboard

A clean and interactive finance dashboard built with React and Vite. This project helps users track and understand their financial activity through summary cards, visualizations, and insights.

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Charts (Line chart, Pie chart)
- **React Router** - Page navigation
- **React Icons** - Icon components
- **Vanilla CSS** - Styling

## Features

### Dashboard Overview
- Summary cards showing Total Balance, Total Income, and Total Expenses
- **Balance Trend** - Line chart showing how account balance changes day by day
- **Spending Breakdown** - Pie chart showing category-wise expense distribution

### Transactions
- Table displaying all transactions with Date, Category, Type, and Amount
- **Search** by category name
- **Filter** by type (All / Income / Expense)
- **Sort** by date or amount
- Empty state handling when no results found

### Insights
- **Highest Spending Category** - Which category you spent most on
- **Monthly Comparison** - Income vs Expense bar comparison with savings rate
- **Largest Single Expense** - The biggest one-time expense
- **Average Daily Spending** - Total expense divided by active spending days
- **Transaction Count** - Total transactions split by income and expense

### Role Based UI (RBAC)
Simulated on the frontend using a dropdown toggle in the header:
- **Viewer** - Can only view dashboard, transactions, and insights
- **Admin** - Can add new transactions and delete existing ones

Switch roles using the dropdown in the top-right corner of the navigation bar.

### State Management
- Used **React Context API** (AppContext) to manage:
  - Transactions data (add, delete, edit)
  - Current user role (viewer / admin)
  - All components consume from a single shared context

## Project Structure

```
src/
  context/
    AppContext.jsx          # Central state management
  components/
    Header.jsx              # Navigation bar with role toggle
    Header.css
  pages/
    Dashboard.jsx           # Summary cards + charts
    Transaction.jsx         # Transaction list with CRUD
    Insights.jsx            # Financial insights cards
  styles/
    index.css               # Global reset styles
    Dashboard.css
    Transaction.css
    Insights.css
  data/
    transactions.js         # Mock/static transaction data
  App.jsx                   # Routes and provider setup
  main.jsx                  # Entry point
```

## Setup Instructions

1. Clone the repository
```
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Open in browser - visit http://localhost:5173

## Design Approach

- Kept the UI clean and minimal with simple CSS (no utility frameworks)
- Used basic JavaScript logic (for loops, if-else) for all data processing
- Separated concerns: pages for views, context for state, styles in one folder
- All data flows through React Context so components stay in sync
- Responsive layout using CSS Grid and media queries

## Responsive Design

- Dashboard cards stack vertically on small screens
- Charts and insight cards adapt to single-column layout on mobile
- Navigation remains accessible on all screen sizes

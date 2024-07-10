import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ExpenseEntryItemList from './components/ExpenseEntryItemList';
import ExpenseEntryItemForm from './components/ExpenseEntryItemForm';

class App extends React.Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">List Expenses</Link>
            </li>
            <li>
              <Link to="/add">Add Expense</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ExpenseEntryItemList />} />
          <Route path="/add" element={<ExpenseEntryItemForm />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

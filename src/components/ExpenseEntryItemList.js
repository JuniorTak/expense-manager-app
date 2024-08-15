import React from "react";
import { connect } from "react-redux";
import { getExpenseList, deleteExpense } from "../actions/expenseActions";

class ExpenseEntryItemList extends React.Component {
  componentDidMount() {
    this.props.getExpenseList();
  }

  handleDelete = (id, e) => {
    e.preventDefault();
    this.props.deleteExpense(id);
  };

  getTotal() {
    let total = 0;
    if (this.props.expenses != null) {
      for (var i = 0; i < this.props.expenses.length; i++) {
        total += this.props.expenses[i].amount;
      }
    }
    return total;
  }

  render() {
    let lists = [];
    if (this.props.expenses != null) {
      lists = this.props.expenses.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.amount}</td>
          <td>{new Date(item.spendDate).toDateString()}</td>
          <td>{item.category}</td>
          <td>
            <a href="/" onClick={(e) => this.handleDelete(item.id, e)}>
              Remove
            </a>
          </td>
        </tr>
      ));
    }
    return (
      <>
        <h1>List of expenses</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {lists}
              <tr>
                <td colSpan="1" style={{ textAlign: "right" }}>
                  Total Amount
                </td>
                <td colSpan="4" style={{ textAlign: "left" }}>
                  {this.getTotal()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.data,
  };
};

const mapDispatchToProps = {
  getExpenseList,
  deleteExpense,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseEntryItemList);

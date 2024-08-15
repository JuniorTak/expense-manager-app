import {
  getExpenseListStarted,
  getExpenseListSuccess,
  getExpenseListFailure,
  addExpenseStarted,
  addExpenseSuccess,
  addExpenseFailure,
  deleteExpenseStarted,
  deleteExpenseSuccess,
  deleteExpenseFailure,
} from "./index";

// Fetch all expenses and dispatch state change.
export const getExpenseList = () => async (dispatch) => {
  dispatch(getExpenseListStarted());
  try {
    const res = await fetch("http://localhost:8000/api/expenses");
    const data = await res.json();
    var items = [];
    data.forEach((item) => {
      let newItem = {
        id: item._id,
        name: item.name,
        amount: item.amount,
        spendDate: item.spend_date,
        category: item.category,
      };
      items.push(newItem);
    });
    dispatch(getExpenseListSuccess(items));
  } catch (err) {
    dispatch(getExpenseListFailure(err.message));
  }
};

// Add a new expense and dispatch state change.
export const addExpense = (data) => async (dispatch) => {
  dispatch(addExpenseStarted());
  let newItem = {
    name: data.name,
    amount: data.amount,
    spend_date: data.spendDate,
    category: data.category,
  };
  console.log(newItem);

  try {
    const res = await fetch("http://localhost:8000/api/expense", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    newItem.id = data._id;
    dispatch(addExpenseSuccess(newItem));
  } catch (err) {
    console.log(err);
    dispatch(addExpenseFailure(err.message));
  }
};

// Delete an expense and dispatch state change.
export const deleteExpense = (id) => async (dispatch) => {
  dispatch(deleteExpenseStarted());
  try {
    const res = await fetch("http://localhost:8000/api/expense/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("Expense with id", id, data.message);
    dispatch(deleteExpenseSuccess(id));
  } catch (err) {
    dispatch(deleteExpenseFailure(err.message));
  }
};

// Select elements
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

// Load expenses from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadExpensesFromLocalStorage);

// Add event listener to the "Add Expense" button
addExpenseBtn.addEventListener('click', function() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter valid expense details!');
        return;
    }

    addExpense(name, amount);
    saveExpenseToLocalStorage(name, amount);

    // Clear the input fields
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
});

// Add expense to the list and update the total
function addExpense(name, amount) {
    const li = document.createElement('li');
    li.innerHTML = `${name} - $${amount.toFixed(2)} <button class="remove-btn">Remove</button>`;
    
    // Add event listener to remove the expense
    li.querySelector('.remove-btn').addEventListener('click', function() {
        removeExpense(li, name, amount);
    });

    expenseList.appendChild(li);
    updateTotalAmount(amount);
}

// Update total amount
function updateTotalAmount(amount) {
    const currentTotal = parseFloat(totalAmountDisplay.textContent.replace('$', ''));
    totalAmountDisplay.textContent = `$${(currentTotal + amount).toFixed(2)}`;
}

// Remove expense and update the total
function removeExpense(li, name, amount) {
    li.remove();
    updateTotalAmount(-amount);
    removeExpenseFromLocalStorage(name, amount);
}

// Save expense to local storage
function saveExpenseToLocalStorage(name, amount) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses from local storage
function loadExpensesFromLocalStorage() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        addExpense(expense.name, expense.amount);
    });
}

// Remove expense from local storage
function removeExpenseFromLocalStorage(name, amount) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => !(expense.name === name && expense.amount === amount));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  updateLocalStorage();
  render();

  text.value = "";
  amount.value = "";
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  render();
}

function render() {
  list.innerHTML = "";

  let total = 0;
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
      ${t.text} <span>${t.amount} FCFA</span>
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">x</button>
    `;

    list.appendChild(li);

    total += t.amount;
    if (t.amount > 0) {
      incomeTotal += t.amount;
    } else {
      expenseTotal += t.amount;
    }
  });

  balance.textContent = `${total} FCFA`;
  income.textContent = `+${incomeTotal}`;
  expense.textContent = `${expenseTotal}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);

render();
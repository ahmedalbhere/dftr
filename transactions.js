const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateBalance() {
  let total = 0;
  transactions.forEach(trx => {
    if (trx.type === 'دخل') total += parseFloat(trx.amount);
    else total -= parseFloat(trx.amount);
  });
  balanceEl.textContent = total.toFixed(2);
}

function renderTransactions() {
  list.innerHTML = '';
  transactions.forEach((trx, index) => {
    const item = document.createElement('div');
    item.className = 'debt-item';
    item.innerHTML = `
      <span>${trx.type} - ${trx.amount} جنيه - ${trx.note || 'بدون ملاحظة'} - ${trx.date}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">حذف</button>
    `;
    list.appendChild(item);
  });
  updateBalance();
}

function deleteTransaction(index) {
  if (confirm('هل تريد حذف هذه العملية؟')) {
    transactions.splice(index, 1);
    saveTransactions();
    renderTransactions();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const type = document.getElementById('type').value;
  const amount = document.getElementById('amount').value;
  const note = document.getElementById('note').value;
  const date = new Date().toLocaleDateString();

  if (type && amount) {
    transactions.push({ type, amount, note, date });
    saveTransactions();
    renderTransactions();
    form.reset();
  }
});

renderTransactions();

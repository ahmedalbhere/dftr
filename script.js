const form = document.getElementById('debt-form');
const debtList = document.getElementById('debt-list');

let debts = JSON.parse(localStorage.getItem('debts')) || [];

function saveDebts() {
  localStorage.setItem('debts', JSON.stringify(debts));
}

function renderDebts() {
  debtList.innerHTML = '';
  debts.forEach((debt, index) => {
    const item = document.createElement('div');
    item.className = 'debt-item';
    item.innerHTML = `
      <span>${debt.name} - ${debt.amount} جنيه</span>
      <button class="delete-btn" onclick="deleteDebt(${index})">حذف</button>
    `;
    debtList.appendChild(item);
  });
}

function deleteDebt(index) {
  if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
    debts.splice(index, 1);
    saveDebts();
    renderDebts();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const amount = document.getElementById('amount').value.trim();

  if (name && amount) {
    debts.push({ name, amount });
    saveDebts();
    renderDebts();
    form.reset();
  }
});

renderDebts();

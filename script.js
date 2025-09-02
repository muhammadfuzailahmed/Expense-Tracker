document.addEventListener('DOMContentLoaded', () => {
    let inputName = document.querySelector(".name");
let inputAmount = document.querySelector(".amount");
let ul = document.querySelector(".item-list");
let total = document.querySelector(".total-amount");

let expenses = JSON.parse(localStorage.getItem("ExpenseItems")) || [];

expenses.forEach(function(e) {
    addTask(e)
});
calculateTotal()
updateTotal()

let form = document.querySelector(".form")
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let name = inputName.value.trim();
    let amount = inputAmount.value.trim();
    if(name !== "" && !isNaN(amount) && amount > 0) {
        console.log(name);
        console.log(amount);
        let expense = {
            ID: Date.now(),
            name,
            amount,
        }
        expenses.push(expense);
        calculateTotal(expense);
        inputName.value = "";
        inputAmount.value = "";
        addTask(expense);
        updateTotal();
        saveToLocal(expenses);
    } 
})

function addTask(data) {
    const li = document.createElement('li');
    li.style.color = "#fff";
    li.style.marginBottom = "8px";
    li.style.listStyle = "none";
    li.style.borderBottom = "2px solid gray"
    li.style.padding = "5px 0px"
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    let p = document.createElement('p');
    p.textContent = `${data.name} - ${data.amount}`;
    let btn = document.createElement('button');
    btn.textContent ='Delete';
    btn.style.padding = "8px 14px";
    btn.style.backgroundColor = "Transparent";
    btn.style.borderRadius = "8px";
    btn.style.color = "#fff";
    btn.style.cursor = "pointer"
    btn.style.backgroundColor = '#000'
    btn.style.border = "none"
    btn.style.transition = "backgroundColor 0.5s ease";
    li.appendChild(p);
    li.appendChild(btn);
    btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = "transparent";
        btn.style.fontWeight = "bold"
        btn.style.transform = "scale(1.05)";
    })
    btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = "#000";
        btn.style.fontWeight = "normal"
        btn.style.transform = "scale(1)";
    })
    btn.addEventListener('click', () => {
        expenses = expenses.filter((item) => item.ID !== data.ID);
        saveToLocal(expenses)
        li.remove();
        updateTotal();
    })
    ul.appendChild(li);
}

function calculateTotal() {
    let sum = 0;
    for(let i = 0; i < expenses.length; i++) {
        sum += Number(expenses[i].amount);
    }
    return sum;
}

function updateTotal() {
    total.style.color = "#fff";
    total.style.marginTop = "20px";
    total.style.textAlign = "center"
    total.innerHTML = `Total: ${calculateTotal()}`;
}

function saveToLocal(data) {
    localStorage.setItem("ExpenseItems", JSON.stringify(data));
}
})
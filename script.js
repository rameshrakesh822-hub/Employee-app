
let employees = JSON.parse(localStorage.getItem("employees")) || [];

const modal = document.getElementById("employeeModal");
const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");

function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function displayEmployees(list = employees) {
    table.innerHTML = "";

    list.forEach(emp => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td class="${emp.status === 'Active' ? 'status' : 'inactive'}">
                ${emp.status}
            </td>
            <td>
                <button class="action-btn"
                    onclick="editEmployee('${emp.id}')">Edit</button>
                <button class="action-btn delete-btn"
                    onclick="deleteEmployee('${emp.id}')">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });

    document.getElementById("totalEmployees").textContent =
        employees.length;

    document.getElementById("activeEmployees").textContent =
        employees.filter(e => e.status === "Active").length;

    document.getElementById("departments").textContent =
        new Set(employees.map(e => e.department)).size;
}

document.getElementById("addBtn").onclick = () => {
    form.reset();
    document.getElementById("employeeId").value = "";
    document.getElementById("modalTitle").textContent = "Add Employee";
    modal.style.display = "flex";
};

document.getElementById("cancelBtn").onclick = () => {
    modal.style.display = "none";
};

form.onsubmit = function(e) {
    e.preventDefault();

    const id = document.getElementById("employeeId").value;

    const employee = {
        id: id || Date.now().toString(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        position: document.getElementById("position").value,
        status: document.getElementById("status").value
    };

    if (id) {
        employees = employees.map(emp =>
            emp.id === id ? employee : emp
        );
    } else {
        employees.push(employee);
    }

    saveData();
    displayEmployees();
    modal.style.display = "none";
    form.reset();
};

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);

    document.getElementById("employeeId").value = emp.id;
    document.getElementById("name").value = emp.name;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("position").value = emp.position;
    document.getElementById("status").value = emp.status;

    document.getElementById("modalTitle").textContent = "Edit Employee";
    modal.style.display = "flex";
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(emp => emp.id !== id);
        saveData();
        displayEmployees();
    }
}

document.getElementById("searchInput").addEventListener("input", function() {
    const value = this.value.toLowerCase();

    const filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(value) ||
        emp.email.toLowerCase().includes(value) ||
        emp.department.toLowerCase().includes(value)
    );

    displayEmployees(filtered);
});

displayEmployees();

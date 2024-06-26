async function getUsers() {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const resp = await fetch(url, { origin: "cors", method: "GET" });
    const respData = await resp.json();

    return respData;
}

let employees = [];

getUsers().then(data => {
    employees = data.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
    }));

    renderEmployees();
});

function renderEmployees() {
    const employeesList = document.getElementById('employees');
    employeesList.innerHTML = '';

    employees.forEach((employee, index) => {
        const li = document.createElement('li');
        li.textContent = `${employee.firstName} ${employee.lastName}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteEmployee(index));
        li.appendChild(deleteButton);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => showUpdateForm(index));
        li.appendChild(updateButton);

        employeesList.appendChild(li);
    });
}

const form = document.getElementById('employee-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    employees.push({ firstName, lastName });

    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';

    renderEmployees();
});

function deleteEmployee(index) {
    employees.splice(index, 1);
    renderEmployees();
}

function updateEmployee(index, updatedFirstName, updatedLastName) {
    employees[index].firstName = updatedFirstName;
    employees[index].lastName = updatedLastName;

    renderEmployees();
}

function showUpdateForm(index) {
    const employeeToUpdate = employees[index];
    const updatedFirstName = prompt('Enter updated first name:', employeeToUpdate.firstName);
    const updatedLastName = prompt('Enter updated last name:', employeeToUpdate.lastName);

    if (updatedFirstName !== null && updatedLastName !== null) {
        updateEmployee(index, updatedFirstName, updatedLastName);
    }
}

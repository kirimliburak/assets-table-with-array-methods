async function apiRequest() {
    let baseURL = "https://randomuser.me/api/";
    let response = await fetch(baseURL, {
        method: 'GET',
    });

    let result = await response.json();
    let fullName = `${result.results[0].name.first} ${result.results[0].name.last}`;
    console.log(`First name: ${result.results[0].name.first} and Last name: ${result.results[0].name.last}`);
    return fullName;
}

let people = [];
let counter = 1;
let total = 0;

function addTable(item, index) {
    var tableElement = document.createElement('tr');
    tableElement.innerHTML = `<td>${counter}</td><td>${people[index].fullName}</td><td>${people[index].money}</td>`;
    var table = document.getElementById("person-table");
    table.appendChild(tableElement);
    counter++;
}

function createTable() {
    people.forEach(addTable);
    counter = 1;
}

async function addPerson() {
    let personInfo = await apiRequest();
    console.log("Full name is : " + personInfo);

    let person = {
        fullName: personInfo,
        money: Math.floor(Math.random() * 10000000) + 1,
    };
    people.push(person);

    var tableElement = document.createElement('tr');
    tableElement.innerHTML = `<td>${people.length}</td><td>${person.fullName}</td><td>${person.money}</td>`;
    var table = document.getElementById("person-table");
    table.appendChild(tableElement);
}

function emptyTable(value) {
    var table = document.getElementById("person-table");
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;
    for (var x = rowCount - 1; x >= 0; x--) {
        table.removeChild(tableRows[x]);
    }

    if (parseInt(value) == 1) {
        people = [];
        total = 0;
        document.getElementById("total-assets").style.display = "none";
    }
}

function reverseTable() {
    emptyTable(2);
    people.reverse();
    createTable();
}

function calculateTotal() {
    for (let index = 0; index < people.length; index++) {
        total = total + people[index].money;
    }
    document.getElementById("total-assets").style.display = "block";
    document.getElementById("total-assets").innerText = `Total: ${total}`;
    total = 0;
}

function doubleAssets() {
    for (let index = 0; index < people.length; index++) {
        people[index].money *= 2;
        emptyTable(2);
        createTable();
    }
    calculateTotal();
}
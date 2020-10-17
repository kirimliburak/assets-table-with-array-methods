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

async function addPerson(){
    let personInfo = await apiRequest();
    console.log("Full name is : " + personInfo);

    let person = {
        fullName: personInfo,
        money: Math.floor(Math.random() * 10000000) + 1,
    };
    people.push(person);
}